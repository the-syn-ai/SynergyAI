import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import {
  rateLimiter,
  apiLimiter,
  securityHeaders,
  requestLogger,
  errorLogger,
  validateRequestBody
} from "./middleware/security";

// Validate required environment variables
function validateEnvironment() {
  const requiredVars = ['OPENAI_API_KEY']; // Only OpenAI API key is required
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }

  // These variables are now optional since we don't need user authentication
  const optionalVars = ['DATABASE_URL', 'SESSION_SECRET', 'SUPABASE_URL', 'SUPABASE_KEY'];
  const missingOptionalVars = optionalVars.filter(varName => !process.env[varName]);

  if (missingOptionalVars.length > 0) {
    log(`Note: Missing optional environment variables: ${missingOptionalVars.join(', ')}`);
    log('User authentication and vector database functionality will be limited');
  }
}

const app = express();

// Trust proxy - required for Replit's environment
app.set('trust proxy', 1);

// Security middleware
app.use(securityHeaders);
app.use(rateLimiter);
app.use('/api', apiLimiter);
app.use(requestLogger);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', validateRequestBody);

// Serve static files from public directory
app.use(express.static('public'));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  try {
    // Validate environment before starting the server
    validateEnvironment();

    const server = await registerRoutes(app);

    // Error handling middleware
    app.use(errorLogger);
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      // Log the full error in development
      if (app.get("env") === "development") {
        console.error(err);
      }

      res.status(status).json({ message });
    });

    if (app.get("env") === "development") {
      log('Setting up Vite middleware...');
      await setupVite(app, server);
      log('Vite middleware setup complete');
    } else {
      log('Setting up static file serving...');
      serveStatic(app);
      log('Static file serving setup complete');
    }

    const PORT = process.env.PORT || 5000;
    server.listen(PORT, () => {
      log(`Server running in ${app.get("env")} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
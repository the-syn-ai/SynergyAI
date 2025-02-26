import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import "./index.css";
import { LoadingProvider } from "./hooks/use-loading";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

// Add error logging for development
if (process.env.NODE_ENV === 'development') {
  console.log('Initializing React application...');
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Failed to find root element");
}

try {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <LoadingProvider>
          <App />
          <Toaster />
        </LoadingProvider>
      </QueryClientProvider>
    </StrictMode>
  );

  if (process.env.NODE_ENV === 'development') {
    console.log('React application mounted successfully');
  }
} catch (error) {
  console.error('Failed to render application:', error);
  document.body.innerHTML = '<div style="color: red; padding: 20px;">Failed to load application. Please check console for errors.</div>';
}
#!/bin/bash

# 🚀 SynergyAI - Automated Hostinger VPS Deployment Script
# Run this script on your fresh Ubuntu VPS

echo "🚀 Starting SynergyAI deployment on Hostinger VPS..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if running as root
if [[ $EUID -ne 0 ]]; then
   print_error "This script must be run as root (use sudo)"
   exit 1
fi

# Get domain name from user
read -p "Enter your domain name (e.g., yourdomain.com): " DOMAIN_NAME
read -p "Enter your email for SSL certificate: " EMAIL

print_status "Setting up SynergyAI for domain: $DOMAIN_NAME"

# Update system
print_status "Updating system packages..."
apt update && apt upgrade -y

# Install Node.js (Latest LTS)
print_status "Installing Node.js..."
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
apt-get install -y nodejs

# Install PM2
print_status "Installing PM2 process manager..."
npm install -g pm2

# Install Nginx
print_status "Installing Nginx..."
apt install nginx -y
systemctl start nginx
systemctl enable nginx

# Install Git if not present
print_status "Installing Git..."
apt install git -y

# Clone SynergyAI repository
print_status "Cloning SynergyAI repository..."
cd /var/www
if [ -d "SynergyAI" ]; then
    print_warning "SynergyAI directory already exists, pulling latest changes..."
    cd SynergyAI
    git pull
else
    git clone https://github.com/the-syn-ai/SynergyAI.git
    cd SynergyAI
fi

# Install dependencies
print_status "Installing Node.js dependencies..."
npm install

# Build the project
print_status "Building the project..."
npm run build

# Create environment file
print_status "Creating environment configuration..."
cat > .env << EOF
NODE_ENV=production
PORT=3000
GOOGLE_PAGESPEED_API_KEY=your_api_key_here
EOF

print_warning "Don't forget to add your Google PageSpeed API key to /var/www/SynergyAI/.env"

# Start application with PM2
print_status "Starting application with PM2..."
pm2 start npm --name "synergyai" -- start
pm2 save
pm2 startup

# Configure Nginx
print_status "Configuring Nginx..."
cat > /etc/nginx/sites-available/synergyai << EOF
server {
    listen 80;
    server_name $DOMAIN_NAME www.$DOMAIN_NAME;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeouts
        proxy_connect_timeout       60s;
        proxy_send_timeout          60s;
        proxy_read_timeout          60s;
    }

    # Static assets caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:3000;
        proxy_set_header Host \$host;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Enable the site
ln -s /etc/nginx/sites-available/synergyai /etc/nginx/sites-enabled/
nginx -t

if [ $? -eq 0 ]; then
    systemctl reload nginx
    print_status "Nginx configuration successful"
else
    print_error "Nginx configuration failed"
    exit 1
fi

# Install Certbot for SSL
print_status "Installing Certbot for SSL certificates..."
apt install certbot python3-certbot-nginx -y

# Get SSL certificate
print_status "Obtaining SSL certificate..."
certbot --nginx -d $DOMAIN_NAME -d www.$DOMAIN_NAME --email $EMAIL --agree-tos --non-interactive

# Configure firewall
print_status "Configuring firewall..."
ufw allow OpenSSH
ufw allow 'Nginx Full'
echo "y" | ufw enable

# Create update script
print_status "Creating update script..."
cat > /var/www/SynergyAI/update.sh << 'EOF'
#!/bin/bash
echo "🔄 Updating SynergyAI..."
cd /var/www/SynergyAI
git pull
npm install
npm run build
pm2 restart synergyai
echo "✅ Update complete!"
EOF

chmod +x /var/www/SynergyAI/update.sh

# Set up automatic updates (optional)
print_status "Setting up automatic updates..."
(crontab -l 2>/dev/null; echo "0 2 * * * /var/www/SynergyAI/update.sh >> /var/log/synergyai-update.log 2>&1") | crontab -

# Final status check
print_status "Checking application status..."
sleep 5
pm2 status

print_status "🎉 SynergyAI deployment complete!"
echo ""
echo -e "${GREEN}✅ Your website is now live at: https://$DOMAIN_NAME${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Add your Google PageSpeed API key to /var/www/SynergyAI/.env"
echo "2. Test your website functionality"
echo "3. Configure email services for contact forms"
echo "4. Set up monitoring and backups"
echo ""
echo -e "${BLUE}🔧 Useful Commands:${NC}"
echo "- Check status: pm2 status"
echo "- View logs: pm2 logs synergyai"
echo "- Update website: /var/www/SynergyAI/update.sh"
echo "- Restart app: pm2 restart synergyai"
echo ""
echo -e "${GREEN}🚀 Your cool AI website is ready to impress clients!${NC}" 
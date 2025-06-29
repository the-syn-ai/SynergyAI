# 🚀 SynergyAI - Hostinger VPS Deployment Guide

## 🎯 Why VPS for Your Cool AI Website?
- **Real Node.js Backend** for dynamic AI features
- **Custom Server Configuration** for optimal performance  
- **Full Control** over your hosting environment
- **Scalable** as your business grows

## 📋 Pre-Requirements
- Hostinger VPS plan (Ubuntu 20.04+ recommended)
- Domain name pointed to your VPS IP
- SSH access to your VPS

## 🔧 Step 1: Initial VPS Setup

### Connect via SSH:
```bash
ssh root@your-vps-ip
```

### Update system:
```bash
apt update && apt upgrade -y
```

### Install Node.js (Latest LTS):
```bash
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
apt-get install -y nodejs
```

### Install PM2 (Process Manager):
```bash
npm install -g pm2
```

### Install Nginx (Reverse Proxy):
```bash
apt install nginx -y
systemctl start nginx
systemctl enable nginx
```

## 📁 Step 2: Deploy Your SynergyAI Website

### Clone your repository:
```bash
cd /var/www
git clone https://github.com/the-syn-ai/SynergyAI.git
cd SynergyAI
```

### Install dependencies:
```bash
npm install
```

### Build the project:
```bash
npm run build
```

### Set up environment variables:
```bash
nano .env
```

Add these variables:
```env
NODE_ENV=production
PORT=3000
GOOGLE_PAGESPEED_API_KEY=your_api_key_here
# Add other environment variables as needed
```

### Start with PM2:
```bash
pm2 start npm --name "synergyai" -- start
pm2 save
pm2 startup
```

## 🌐 Step 3: Configure Nginx

### Create Nginx configuration:
```bash
nano /etc/nginx/sites-available/synergyai
```

Add this configuration:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable the site:
```bash
ln -s /etc/nginx/sites-available/synergyai /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx
```

## 🔒 Step 4: Setup SSL Certificate

### Install Certbot:
```bash
apt install certbot python3-certbot-nginx -y
```

### Get SSL certificate:
```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 🎯 Step 5: Configure Firewall

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

## 🚀 Step 6: Final Optimizations

### Enable Gzip compression in Nginx:
```bash
nano /etc/nginx/nginx.conf
```

Uncomment and configure:
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;
```

### Set up automatic updates:
```bash
# Add to crontab
crontab -e

# Add this line for daily updates at 2 AM
0 2 * * * cd /var/www/SynergyAI && git pull && npm install && pm2 restart synergyai
```

## 📊 Step 7: Monitoring & Maintenance

### Check PM2 status:
```bash
pm2 status
pm2 logs synergyai
```

### Monitor Nginx:
```bash
systemctl status nginx
tail -f /var/log/nginx/access.log
```

### Update your website:
```bash
cd /var/www/SynergyAI
git pull
npm install
npm run build
pm2 restart synergyai
```

## 🎉 Your Cool AI Website is Live!

### Features Now Working:
✅ **Real AI Website Analysis** - Google PageSpeed integration
✅ **Dynamic Animations** - Framer Motion & GSAP
✅ **Interactive Forms** - Real form processing
✅ **API Endpoints** - Custom backend functionality
✅ **SEO Optimization** - Server-side rendering
✅ **Security Headers** - Production-ready security
✅ **Performance** - Optimized for speed

### Next Steps:
1. **Add Google PageSpeed API key** for real website analysis
2. **Configure email services** for contact forms
3. **Set up analytics** (Google Analytics, etc.)
4. **Add more AI features** as your business grows

## 🆘 Troubleshooting

### If site is not loading:
```bash
pm2 logs synergyai
systemctl status nginx
```

### If SSL issues:
```bash
certbot renew --dry-run
```

### Performance monitoring:
```bash
pm2 monit
htop
```

## 💡 Pro Tips:
- **Backup regularly**: Set up automated backups
- **Monitor resources**: Use PM2 monitoring
- **Scale up**: Upgrade VPS as traffic grows
- **CDN**: Add Cloudflare for global performance

Your SynergyAI website will be blazing fast and super cool with all the Node.js features! 🚀✨ 
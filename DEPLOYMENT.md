# Deployment Guide

This guide covers deploying the minimalist personal site to AWS EC2 with Nginx reverse proxy and HTTPS via Let's Encrypt.

## Prerequisites

- AWS EC2 instance running Ubuntu 22.04 LTS
- Domain name pointing to your EC2 instance's public IP
- SSH access to the instance
- Security group allowing ports 22 (SSH), 80 (HTTP), 443 (HTTPS)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Open http://localhost:3000

# Build for production
npm run build

# Test production build locally
npm start
```

## EC2 Setup

### 1. Connect to EC2

```bash
ssh -i your-key.pem ubuntu@your-ec2-ip
```

### 2. Install Node.js (LTS)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version
npm --version
```

### 3. Install PM2

```bash
sudo npm install -g pm2
```

### 4. Clone and Build

```bash
# Clone your repository
cd ~
git clone https://github.com/yourusername/your-repo.git site
cd site

# Install dependencies
npm ci

# Build for production
npm run build
```

### 5. Start with PM2

```bash
# Start the application
pm2 start npm --name "site" -- start

# Save PM2 process list
pm2 save

# Setup PM2 to start on boot
pm2 startup
# Follow the instructions printed by this command
```

### 6. Install Nginx

```bash
sudo apt install -y nginx
```

### 7. Configure Nginx

Create a new Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/site
```

Add the following configuration (replace `yourdomain.com` with your actual domain):

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

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/site /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default  # Remove default site
sudo nginx -t  # Test configuration
sudo systemctl restart nginx
```

### 8. Setup HTTPS with Certbot

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain certificate (replace with your domain)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Follow the prompts to complete setup
```

Certbot will automatically:
- Obtain SSL certificates from Let's Encrypt
- Configure Nginx to use HTTPS
- Set up automatic certificate renewal

### 9. Verify Auto-Renewal

```bash
# Test renewal process
sudo certbot renew --dry-run
```

## Updating the Site

```bash
cd ~/site
git pull
npm ci
npm run build
pm2 restart site
```

## Useful PM2 Commands

```bash
pm2 status          # Check status
pm2 logs site       # View logs
pm2 restart site    # Restart application
pm2 stop site       # Stop application
pm2 delete site     # Remove from PM2
```

## Troubleshooting

### Check Nginx logs
```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Check PM2 logs
```bash
pm2 logs site --lines 100
```

### Check if port 3000 is in use
```bash
sudo lsof -i :3000
```

### Restart services
```bash
sudo systemctl restart nginx
pm2 restart site
```

## Security Recommendations

1. **Firewall**: Configure UFW to only allow necessary ports
   ```bash
   sudo ufw allow ssh
   sudo ufw allow http
   sudo ufw allow https
   sudo ufw enable
   ```

2. **Keep Updated**: Regularly update the system
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

3. **SSH Security**: Disable password authentication, use key-based auth only

4. **Fail2ban**: Install to protect against brute force attacks
   ```bash
   sudo apt install -y fail2ban
   ```

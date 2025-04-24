# Self-Hosted Deployment Guide

This guide provides instructions for self-hosting CauldronOS on your own infrastructure.

## Prerequisites

- Node.js 16+ and npm/yarn
- PostgreSQL 13+
- Docker (optional, for containerized deployment)
- Nginx or another web server for reverse proxy
- SSL certificate

## Environment Variables

Create a `.env` file with the following variables:

```
# Clerk Authentication
CLERK_PUBLISHABLE_KEY=pk_test_your-publishable-key
CLERK_SECRET_KEY=sk_test_your-secret-key

# Database
DATABASE_URL=postgresql://username:password@localhost:5432/cauldronos

# API
REACT_APP_API_URL=https://api.yourdomain.com

# Storage
STORAGE_PATH=/path/to/storage
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/cauldronos.git
cd cauldronos
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up the Database

```bash
# Create the database
createdb cauldronos

# Run migrations
npm run migrate
```

### 4. Build the Application

```bash
npm run build
```

### 5. Start the Server

```bash
npm run start
```

## Docker Deployment

### 1. Build the Docker Image

```bash
docker build -t cauldronos .
```

### 2. Run the Container

```bash
docker run -p 3000:3000 --env-file .env cauldronos
```

## Nginx Configuration

Create an Nginx configuration file:

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## SSL Configuration

Use Let's Encrypt to set up SSL:

```bash
sudo certbot --nginx -d yourdomain.com
```

## Backup and Maintenance

### Database Backup

```bash
pg_dump -U username cauldronos > backup.sql
```

### Application Updates

```bash
git pull
npm install
npm run build
npm run migrate
npm run start
```

## Monitoring and Logging

- Set up Prometheus and Grafana for monitoring
- Configure log rotation with logrotate
- Use PM2 for process management

## Security Considerations

- Keep all software updated
- Use a firewall to restrict access
- Implement rate limiting
- Set up intrusion detection
- Regularly audit access logs

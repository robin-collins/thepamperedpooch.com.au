# Deployment Guide: Mailcow Integration

This guide explains how to deploy **The Pampered Pooch** as an additional service within an existing [mailcow-dockerized](https://github.com/mailcow/mailcow-dockerized) stack.

## 1. Build the Application Image

On your build machine (or VPS), run the following command in the project root:

```bash
docker build -t thepamperedpooch:latest .
```

## 2. Configure Mailcow Docker Compose

Navigate to your `mailcow-dockerized` root directory. Create or edit `docker-compose.override.yml` and add the following service definition:

```yaml
services:
    thepamperedpooch-app:
      image: thepamperedpooch:latest
      restart: always
      env_file: ./data/conf/thepamperedpooch/.env
      volumes:
        - ./data/conf/thepamperedpooch/BUSINESS_INFO.json:/app/BUSINESS_INFO.json
        - ./data/conf/thepamperedpooch/SERVICES.json:/app/SERVICES.json
        - ./data/conf/thepamperedpooch/reviews-cache.json:/app/reviews-cache.json
      networks:
        mailcow-network:
          aliases:
            - thepamperedpooch
```

> [!IMPORTANT]
> Ensure you create the directory `data/conf/thepamperedpooch` and place your `.env`, `BUSINESS_INFO.json`, and `SERVICES.json` files there (or adjust the volume paths accordingly).

## 3. Configure Mailcow Nginx

To route traffic for `thepamperedpooch.com.au` to your container, create a new Nginx configuration file in the mailcow directory:

`data/conf/nginx/thepamperedpooch.conf`

```nginx
server {
  listen 80;
  listen [::]:80;
  server_name thepamperedpooch.com.au www.thepamperedpooch.com.au;

  # ACME challenge - must be served over HTTP (port 80)
  location ^~ /.well-known/acme-challenge/ {
    allow all;
    default_type "text/plain";
    root /web;
  }

  # Redirect all other HTTP to HTTPS
  location / {
    return 301 https://$host$request_uri;
  }
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name thepamperedpooch.com.au www.thepamperedpooch.com.au;

  ssl_certificate /etc/ssl/mail/cert.pem;
  ssl_certificate_key /etc/ssl/mail/key.pem;
  ssl_protocols TLSv1.2 TLSv1.3;
  ssl_prefer_server_ciphers on;
  ssl_ciphers ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305;
  ssl_session_cache shared:SSL:50m;
  ssl_session_timeout 1d;
  ssl_session_tickets off;

  # ACME-challenge for Let's Encrypt (handled by mailcow acme client)
  location ^~ /.well-known/acme-challenge/ {
    allow all;
    default_type "text/plain";
  }

  location / {
    proxy_pass http://thepamperedpooch:80/;
    proxy_set_header Host $http_host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    client_max_body_size 0;
  }
}
```

## 4. Apply Changes

Restart the mailcow stack to pick up the new service and Nginx configuration:

```bash
docker compose up -d
docker compose restart nginx-mailcow
```

## 5. SSL Configuration

To ensure Mailcow's ACME client requests a certificate for your new domain, add `thepamperedpooch.com.au` and `www.thepamperedpooch.com.au` to the `ADDITIONAL_SAN` variable in your `mailcow.conf`.

> [!CAUTION]
> **Do NOT** use `ADDITIONAL_SERVER_NAMES` for this domain. `ADDITIONAL_SERVER_NAMES` tells Mailcow to serve its own login page for those domains. `ADDITIONAL_SAN` merely adds the domains to the certificate, allowing your custom Nginx configuration to handle the actual web traffic.

```bash
# In mailcow.conf
ADDITIONAL_SAN=thepamperedpooch.com.au,www.thepamperedpooch.com.au
```

After updating `mailcow.conf`, apply the changes and restart the ACME container to generate the new certificate:

```bash
docker compose up -d
docker compose restart acme-mailcow
```

You can monitor the progress with `docker compose logs -f acme-mailcow`. Once the certificate is issued, restart Nginx one last time:

```bash
docker compose restart nginx-mailcow
```

---
**Note:** Ensure your DNS A/AAAA records for `thepamperedpooch.com.au` point to the VPS IP address.

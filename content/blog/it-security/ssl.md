---
title: 'SSL HTTPS letsencrypt'
description: 'How to enable SSL (HTTPS) via letsencrypt for nginx webserver'
date: '2020-03-09T11:58:52.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['security']
---

## How to enable SSL via letsencrypt for nginx webserver

Based on [https://gist.github.com/cecilemuller/a26737699a7e70a7093d4dc115915de8]()

All steps are done on the server itself.

Enable *https* with **letsencrypt** on a server:

### Retrieve the first certificate

1. Create a file `/etc/nginx/snippets/letsencrypt.conf` containing:

		location ^~ /.well-known/acme-challenge/ {
		    default_type "text/plain";
		    root /var/www/letsencrypt;
		}

2. Create a file /etc/nginx/snippets/ssl.conf containing:

		ssl_session_timeout 1d;
		ssl_session_cache shared:SSL:50m;
		ssl_session_tickets off;

		ssl_protocols TLSv1.2;
		ssl_ciphers EECDH+AESGCM:EECDH+AES;
		ssl_ecdh_curve secp384r1;
		ssl_prefer_server_ciphers on;

		ssl_stapling on;
		ssl_stapling_verify on;

		add_header X-Frame-Options DENY;
		add_header X-Content-Type-Options nosniff;

3. Create the folder for the letsencrypt challenges:

		sudo mkdir -p /var/www/letsencrypt/.well-known/acme-challenge

4. Load **letsencrypt** snippet into host configuration (File `/etc/nginx/sites-available/dev-graphql.myCompany.io`)

	Add the middle line here:

		...`
		server_name dev-graphql.myCompany.io;

		include /etc/nginx/snippets/letsencrypt.conf;

		location / {
		...

	**Explanation**:

	The domain-checking process is always done via HTTP w/o SSL due to two simple reasons:
	* When obtaining the first certificate the server has no SSL certificate yet and cannot serve anything via HTTPS.
	* When renewing the certificate it is possible that the existing certificate is already expired or broken another way: So again no HTTPS possible.

	Of course this is only valid for the inclusion of the letsencrypt-snippet: That one has to be in the HTTP part. The ssl-snippet may only be included in the HTTPS part.

	`/etc/nginx/snippets/letsencrypt.conf` is defined as:

	```
	location ^~ /.well-known/acme-challenge/ {
    default_type "text/plain";
    root /var/www/letsencrypt;
	}
	```

	This tells nginx to serve all requests to `/.well-known/acme-challenge/` from directory `/var/www/letsencrypt`. That's the directory where letsencrypt places files with a secret key that is checked by a verification server, to verify that the letsencrypt-bot that is calling the verification server is sitting on the domain which it wants to be verified.


5. Reload Nginx:

		sudo systemctl reload nginx


6. Install certbot (was already installed on dev-graphql.myCompany.io):

		sudo apt-get install software-properties-common
		sudo add-apt-repository ppa:certbot/certbot
		sudo apt-get update
		sudo apt-get install certbot


7. Request the certificate

		sudo certbot certonly --webroot --agree-tos --no-eff-email --email hostmaster@myCompany.com -w /var/www/letsencrypt -d dev-graphql.myCompany.io

If that worked out, you should see some text starting with “Congratulations!”

### Adapt nginx configuration to provide SSL and enforce SSL

1. Adapt the host configuration `/etc/nginx/sites-available/dev-graphql.myCompany.io` to look like this in the end:

		server {
		  listen 80;
		  server_name dev-graphql.myCompany.io;

		  include /etc/nginx/snippets/letsencrypt.conf;

		  location / {
		    return 301 https://$host$request_uri;
		  }
		}

		server {
		  listen 443 ssl;
		  server_name dev-graphql.myCompany.io;

		  ssl_certificate /etc/letsencrypt/live/dev-graphql.myCompany.io/fullchain.pem;
		  ssl_certificate_key /etc/letsencrypt/live/dev-graphql.myCompany.io/privkey.pem;
		  ssl_trusted_certificate /etc/letsencrypt/live/dev-graphql.myCompany.io/fullchain.pem;
		  include /etc/nginx/snippets/ssl.conf;

		  location / {
		    proxy_set_header  X-Real-IP  $remote_addr;
		    proxy_set_header  Host       $http_host;
		    proxy_pass        http://127.0.0.1:4000;
		  }
		}

2. Allow incoming SSL traffic on port 443 (Use your local browser, not the server):

	* Go to [https://eu-central-1.console.aws.amazon.com/ec2/v2/home?region=eu-central-1#Instances]()
    * Select the EC2 instance
    * Click the first *security group* in the *Description* pane
    * Select the Inbound pane and click Edit
    * Click *Add rule* and select Type HTTPS. The other fields will be filled automatically.
    * Click Save.

3. Reload *Nginx*:

		sudo systemctl reload nginx

You should now be able to access your server via HTTPS. Calls to HTTP should be redirected to HTTPS now.

### Setup auto-renewal for letsencrypt certificates

* Create script for user **root** that restarts **nginx** at `/root/restart_nginx.sh`

		#!/bin/bash
		systemctl reload nginx

* Don’t forget to allow execution

		sudo chmod +x /root/restart_nginx.sh

* Setup auto renewal by adding a cronjob that runs once a week. Choose some point in time that suites you best:

	**ATTENTION**: Make sure to edit the crontab for the **root** user by using sudo, else it will not work!

		$ sudo crontab -e

* Add the following line. That will e.g. run every Monday at 22:30

		30 22 * * 1 certbot renew --noninteractive --renew-hook /root/restart_nginx.sh


## Links concerning TLS/SSL certificates

* [https://www.sherbers.de/howto/nginx/](https://www.sherbers.de/howto/nginx/)

* [https://cipherli.st/](https://cipherli.st/)

* [https://github.com/ssllabs/research/wiki/SSL-and-TLS-Deployment-Best-Practices](https://github.com/ssllabs/research/wiki/SSL-and-TLS-Deployment-Best-Practices)

* [http://nginx.org/en/docs/http/configuring\_https\_servers.html](http://nginx.org/en/docs/http/configuring_https_servers.html)

* [https://en.wikipedia.org/wiki/Cipher\_suite](https://en.wikipedia.org/wiki/Cipher_suite)
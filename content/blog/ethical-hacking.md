---
title: 'Ethical hacking - where to search for stuff'
description: 'Places where ethical hackers can try to search for things on servers'
date: '2020-03-05T21:22:00.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['hacking']
draft: true
---

Use `wget` to hack into servers and the following might be interesting places to search for stuff:

* `.htaccess` only works on Apache servers
* `.git` file can be downloaded with password hidden in history
* xml files may be downloaded.
* **Swap files** created by editors like *vim*. files like `.wp-config.php.swp` or `config.php` etc. can be downloaded because it doesn't end with `php` anymore.

	* VIM: `.wp-config.php.swp`
	* EMACS: `%23.wp-config.php%23`

* Database stubs: `dump.sql` copied from SQL documentation.
* Private keys: Look at Instruction guides ==> Mostly `[domainname].key` is used, e.g. `example.com.key` ==> Report private key compromise ==> Certificate authority (e.g. Symantec) revokes certificate. ==> Certificate authority should check keys!
* `wget http://ask.com/server-status` --> See what people are searching
* server access restricted to `localhost` --> Tor hidden services run on localhost --> Get real IP addresses.
* nginx server status file is boring
* core dumps --> copy of application memory, default name `core` for php applications. `wget https://example.com/core`
* FTP config files in `SublimeFTP`: `https://example.com/sftp-config.json` contains username and password. --> Direct read/write access to website. Works for other FTP clients, too: `FileZilla.xml` `WS_FTP.ini`
Remainders from former domain users
* Yahoo Web Analytics
* azure had subdomain which was included at many places but not registered so far. He registered. The Saline Courier.
* Old code lying around from shutdown service. But domain of that service bought by hacker who uploads malicious software.
* **HTTP**: Do `OPTIONS` request scan to see available methods. Looks to include random memory..

	* `Heartbleed` BUG

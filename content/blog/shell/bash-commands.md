---
title: 'bash - useful commands'
date: '2016-08-28T17:52:03.284Z'
author: 'André Kovac'
description: 'Useful bash commands'
category: 'shell'
tags: ['bash']
---

[Great general resource for shell scripting](http://linuxsig.org/files/bash_scripting.html)

## Run bash/sh script (alternatives)

```bash
bash my_script.sh
```

or

```bash
source my_script.sh
```

or

```bash
./my_script.sh
```

**Don't forget**: Script has to be executable, e.g. via

```bash
chmod +x my_script.sh`
```

## Navigate

Create directory and cd to it right away

```bash
mkdir foo && cd $_
```

`$`: Contents of a variable ([more information can be found here](http://tldp.org/LDP/abs/html/special-chars.html))
`_`: Last argument of previous command ([more information](https://unix.stackexchange.com/questions/271659/vs-last-argument-of-the-preceding-command-and-output-redirection))

## Write

### Redirect stdout & stderr

Example:

```bash
grep -i 'abc' content 2>/dev/null
// or
npm list -g --depth=0 2>/dev/null
```

Syntax:

* `1> file` redirects **stdout** to file
* `> file` redirects **stdout** to file (shorthand for `1>`)
* `2> file` redirects **stderr** to file
* `&> file` redirects **stdout** and **stderr** to file

`/dev/null` is the null device. It takes any input you want and throws it away. It can be used to suppress any output.

[Some more information on null](https://askubuntu.com/questions/350208/what-does-2-dev-null-mean)

### Redirect stderr to stdout before piping

[Example](https://superuser.com/questions/436586/why-redirect-output-to-21-and-12#436594)

```sh
app 2>&1 | grep hello
```

Points file descriptor 2 to where file descriptor 1 is already pointing.
Here the file descriptor to redirect (i.e. `2`) gets redirected to the already set up file descriptor `1`.


[Run script, but show stderr in stdout](https://github.com/jlongster/blog/blob/master/run):

```bash
#!/bin/sh
exec 2>&1
exec node server/run.js
```

[create-file.sh](https://github.com/derekmahar/docker-compose-wait-for-file/blob/master/ubuntu-create-file/create-file.sh):

```bash
#!/bin/bash

file=/wait/done
>&2 echo "Sleeping for 10 s."
sleep 10
touch $file
>&2 echo "Created file $file."
```

## Search / Find

### Shell

* Find something in directory tree.

	```bash
	find /root/directory/to/search -name 'filename.*'
	```

* Find some process/file which runs for an app

	E.g. for `mysql` there is a `my.cnf` file. To find which one is in use run

	```bash
	sudo fs_usage | grep my.cnf
	```

	`fs_usage` shows running programs live

### VIM

	```vim
	:e **/filename.cpp
	```

## User generation

#### Create new user with sudo rights on server

* [Create new user with sudo rights](https://www.digitalocean.com/community/tutorials/how-to-create-a-sudo-user-on-ubuntu-quickstart)
* [Add user authentication to server](http://thekeesh.com/2011/05/setting-up-user-accounts-password-authentication-and-ssh-keys-on-a-new-ec2-instance/)

1. ssh into server
2. `adduser` + choose name + password
3. `usermod -aG sudo <username>`
4. Switch to new user `su - <username>`
5. Test sudo rights: `sudo ls -la /root`

6. enable password authentication

	```bash
	sudo vim /etc/ssh/sshd_config
	```

	Uncomment

	```
	PasswordAuthentication yes
	```

7. reload that ssh configuration

	```bash
	sudo /etc/init.d/ssh reload
	```

#### Give group ownership of Laravel directory structure to the web group

	```bash
	sudo chown -R :www-data /var/www/laravel
	```

## Commands

#### Find (file or directory names)

* e.g. [set `chmod` for folders and separately for files](http://stackoverflow.com/questions/3740152/how-to-set-chmod-for-a-folder-and-all-of-its-subfolders-and-files-in-linux-ubunt)

	To change all the directories to 755 (-rwxr-xr-x):

	```bash
	find /opt/lampp/htdocs -type d -exec chmod 755 {} \;
	```

	To change all the files to 644 (-rw-r--r--):

	```bash
	find /opt/lampp/htdocs -type f -exec chmod 644 {} \;
	```


#### [Permissions, chmod](http://www.computerhope.com/unix/uchmod.htm)

The following two commands are equivalent

	```bash
	chmod u=rwx,g=rx,o=r myfile

	chmod 754 myfile
	```

* The letters **u**, **g**, and **o** stand for "**user**", "**group**", and "**other**"
* **4** stands for "read",
* **2** stands for "write",
* **1** stands for "execute", and
* **0** stands for "no permission."


## Combinations

Automate [git checkout -- my_file](http://stackoverflow.com/questions/28555062/can-i-use-git-checkout-on-two-files/28555154#28555154)

```bash
git status | grep modified | sed 's/^.*modified:   //' | xargs git checkout
```

--> **UNDER CONSTRUCTION**!

## Move with `rsync`

Alternative to `mv backup/ backupArchives/`

```bash
rsync -a backup/ backupArchives/
rm -rf backup/*
```

## Internet files

Downloads file to current folder from web

```bash
wget http://files.fast.ai/files/setup_p2.sh
```

## Count

Number of files in folder `train/dogs`:

```bash
ls -l train/dogs/ | wc -l
```

## Pipeline continuation / Process expansion

Taken from [this SO answer](https://stackoverflow.com/questions/20307299/linux-why-cant-i-pipe-find-result-to-rm):

>Arguments and are made available to `rm` through a special variable (called argv internally). The standard input, on the other hand, looks to a Unix program like a file named stdin. A program can read data from this "file" just as it would if it opened a regular file on disk and read from that.

Use `xargs` to circumvent this.

```bash
find . -name ".txt" | grep "foo" | xargs rm
```

#### via \`...\` or `$(...)`

e.g. `docker rmi $(docker images | grep "^<none>" | awk '{ print $3 }')`

## `$#`, `$?`, `$@` etc.

`"$@"` stores all the arguments that were entered on the command line, individually quoted (`"$1"` `"$2"` ...).

[See this nice overview](https://superuser.com/questions/247127/what-is-and-in-linux/247131#247131?newreg=19736f38125e4d19a607f8a28fd3aea5)

For example for the following command

```
./command -yes -no /home/username
```

* `$@` would give you the array `{"-yes", "-no", "/home/username"}`
* And `$0` = **./command**, `$1` = **-yes** etc.

## Background jobs

* Append `&` to run command/script as background job

	```sh
	sleep 5 && ls | grep "foo" &
	```

* View all currently running background jobs

	```bash
	jobs
	```

## Screens

```sh
xrandr
```

## Links

* [Essential Linux Commands](http://www.labnol.org/software/linux-commands/19028/)
* See my file `Nice shell-commands to learn from` in this folder.
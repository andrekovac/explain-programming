---
title: 'Secure shell (SSH) and secure copy (SCP)'
description: 'Some important commands when using SSH and SCP'
date: '2014-01-12T12:58:52.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['security', 'communication', 'outdated']
---

## How to access a web server using the Terminal?

```
ssh username@server.address.com
```

**Example**: `ssh root@unixnewbie.org`

- When prompted for the password, enter your web server password.
- To quit the session, type `exit`.

## Login to server via ssh

**Scenario**: You've got a server and want to communicate with it via ssh in the future.

### Alternative 1 with copy/paste

Just copy-paste the public key to your server into the `~/.ssh` folder and keep a copy on your local machine, next to the private key.

### Alternative 2 with file authorized_keys

Have your private key on your local machine in the `~/.ssh` folder and copy the contents of the public key as a new line into the `~/.ssh/authorized_keys` folder on the server.

**Basic instructions**:

1. Create a new public/private key pair or just use an existing one (often `id_rsa.pub` already exists). Store them in the `~/.ssh/` folder (`~` denotes your home folder, e.g. `/Users/myName`)
2. Copy the contents of the public key file (ends with `.pub`) as a new line into the `~/.ssh/authorized_keys` file on server, e.g.

  ```bash
	cat ~/.ssh/id_rsa.pub | ssh jonny@123.45.56.78 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys“
  ```

  This following command does the same as the one above:

  ```bash
  cat ~/.ssh/id_rsa.pub | ssh jonny@123.45.56.78 "cat >> ~/.ssh/authorized_keys"
  ```

### Alternative 3 with ssh-copy-id

`ssh-copy-id` uses your public ssh key to login into remote servers

1. ssh into the server the first time using password or generated private ssh key (using one of the above methods)
2. Create a new user with `username`
3. Run `ssh-copy-id username@IPADDRESS`
4. Now `ssh username@IPADDRESS` will log you in automatically

See [this post](http://nerderati.com/2011/03/17/simplify-your-life-with-an-ssh-config-file/) for more information.

### Alternative 3 with ssh-add

Example for **AWS**:

1. Add a new public/private key pair with `ssh-add ~/.ssh/KEY_PAIR_NAME.pem` (or `ssh-add ~/.ssh/MY_PRIVATE_KEY`)
2. Run `ssh [your instance name]@[amazon].[com]`

**Explanation**:

1. Add the `.pem` file (i.e. private key) to the `~/.ssh` directory (create it if necessary)
2. Use the `ssh-add` command to add the identity to the authentication agent; this means never having to specify the `.pem` file when using ssh

#### Notes

In case you use several ssh keys, make sure to run `ssh-add -D` to delete the cached SSH key(s).

See [this elaborate article](https://coderwall.com/p/7smjkq/multiple-ssh-keys-for-different-accounts-on-github-or-gitlab) and [this SO summary](https://stackoverflow.com/a/61476756/3210677).

- **Example**: Two different bitbucket accounts
  - [This SO article](https://stackoverflow.com/questions/21139926/how-to-maintain-multiple-bitbucket-accounts-with-multiple-ssh-keys-in-the-same-s) discusses different solutions. At the bottom is one with many upvotes!

### Links

- [Nice Digital Ocean Instructions](https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2)
- [AWS Instructions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AccessingInstancesLinux.html)


## Create a new user and give him ssh public key of first user

5. Follow [these instructions](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/managing-users.html) to add user to account and provide him with ssh access.
6. Add details to `~/.ssh/config` on `localhost`
7. Now you can connect with this user with same ssh private key conveniently

## SCP - Secure Copy - File transfer

### **Send** file from local drive TO server via SCP

**Prerequisite**: You generated an ssh connection as described above with the public key `my_key.pub`.
**Goal**: Upload the file `file_name.txt` to your server `remotehost.com` into the folder `/path/to/directory` of the `username` user:

```bash
scp -i my_key.pub /path/to/file_name.txt username@remotehost.com:/path/to/directory
```

**Example** with imaginary values:

```bash
scp -i ~/.ssh/id_rsa.pub database_dump.sql deploy@staging.awesomeCompany.com:
```

**Note**: Don’t forget the semi-colon at the end! With nothing written behind the semi-colon, the file will be stored in the home folder of the `deploy` user.

### **Get** file FROM server to local drive via SCP

#### With ssh connection established (i.e. key exists):

```bash
scp -i certificate.pub username@remotehost.edu:foobar.txt /some/local/directory
```

#### With password prompt

Note the `-r` which requires a password to be entered.
Here we pull the entire folder `/path/to/foo` from the server.

```bash
scp -r user@your.server.example.com:/path/to/foo /home/user/Desktop/
```

## Simplify ssh commands with entries in `~/.ssh/config`

Add the following to `~/.ssh/config`, changing the values to the ones needed:

```js
Host awesomeProject
    HostName 12.34.5.67
    User deploy
    IdentityFile "~/.ssh/StagingCertificate.pem"
```

Now the server can then be accessed by

```bash
ssh awesomeProject
```

instead of

```bash
ssh -i "~/.ssh/StagingCertificate.pem" deploy@12.34.5.67
// or in case of an AWS EC2 server
ssh -i ~/.ssh/ec2.pem ec2-user@ec2.server.name.com
```

## Troubleshooting

### [OSX] If you are asked to enter your passphrase when openging a shell

```bash
ssh-add -K
```

See [this reply](http://stackoverflow.com/questions/30495445/git-suddenly-started-to-ask-for-ssh-key-password-every-time/40599667#40599667) for details.


## Difference between private/public keys and .pem file

- [This question was asked here](https://stackoverflow.com/questions/17670446/what-is-the-difference-between-various-keys-in-public-key-encryption)

- **AWS** distributes `.pem` files. They can contain anything - a certificate with a public key, an SSH public key, public key + private key, certificate with a public key + private key. PEM is a text file so you can open it in notepad and check its contents.

## Further SSH commands

| Command | Explanation |
| --- | --- |
| `ssh-keygen -C „some comment“` | Create public/private keypair with comment. |
| `ssh-keygen -y -f ~/.ssh/id_rsa > ~/.ssh/id_rsa.pub` | Retrieve ssh public key from private key |
| `cat ~/.ssh/id_rsa.pub | pbcopy` or `pbcopy < ~/.ssh/id_rsa.pub"` | Copy public key to clipboard |


## Create new user with sudo rights on server

1. ssh into server (with a method described above)
2. Create a new user with `adduser` + choose name + password
3. Give the new user sudo rights: `usermod -aG sudo <username>`
4. Switch to the new user `su - <username>`
5. Test sudo rights: `sudo ls -la /root` - if you can view the contents of the `root` folder and don't get an error, the user has `sudo` rights.

6. Enable password authentication

  Open the file `/etc/ssh/sshd_config` (change `vim` to `nano` to rather open it with the `nano` text editor):

  ```bash
	sudo vim /etc/ssh/sshd_config
  ```

	Uncomment the following line by removing the `#` infront of it:

  ```bash
	PasswordAuthentication yes
  ```

7. Reload that ssh configuration by running

  ```bash
	sudo /etc/init.d/ssh reload
  ```

### Links

- [Create new user with sudo rights](https://www.digitalocean.com/community/tutorials/how-to-create-a-sudo-user-on-ubuntu-quickstart)
- [Add user authentication to server](http://thekeesh.com/2011/05/setting-up-user-accounts-password-authentication-and-ssh-keys-on-a-new-ec2-instance/)

## Further reads

- [OVERVIEW](https://wiki.archlinux.org/index.php/SSH_keys)
- [What's the common pragmatic strategy for managing key pairs?](http://security.stackexchange.com/questions/10963/whats-the-common-pragmatic-strategy-for-managing-key-pairs)

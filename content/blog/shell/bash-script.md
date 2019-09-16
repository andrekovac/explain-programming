---
title: 'bash script'
date: '2016-08-28T17:52:03.284Z'
author: 'André Kovac'
description: 'How to create your bash script (with examples)'
category: 'shell'
tags: ['bash']
---

## Steps

1. Create file with `.sh` extension, e.g. with `touch filename.sh`
2. Write contents of your script (see below)
3. Make it executable: `chmod +x filename.sh`
4. Move file into folder `~/bin` or equivalently `$HOME/bin`

	You can now run the script with `$ filename` in a new shell tab

5. *Optional:*
	1. Add `alias coolerName='./filename.sh'` to `.bash_profile`
	2. Reload shell or run `. .bash_profile`
	3. Call your new shell script by just typing

		```bash
		coolerName
		```

## My first shell script - step by step

1. Write a program

   - First line is `#!/bin/bash` (`bash` shell) or `#!/bin/sh` (`sh` shell)
   - Then write your code below, e.g.
	```bash
	#!/bin/bash
	# My first script

	echo "Hello World!"
	```

2. Save it as `my_script`

3. Setting permissions - in order to make the script executable

	```bash
	chmod 755 my_script
	```

4. Run the script

	```bash
	./my_script
	```

5. Put script into the folder `/Users/myName/bin` to make it executable from anywhere because hopefully `/Users/myName/bin` is already in the path.

Example and instructions taken and adapted from [http://linuxcommand.org/wss0010.php]()


## Recipe to write a basic shell script

### Example 1

```bash
#!/bin/bash -l

export LANG=en_US.UTF-8

```

`-l`: Use current logged in user

### Example 2

This example contains an `if-then` clause.

```bash
# test if the current commit already has a tag
has_tag=$( git describe --tags --exact-match --match=builds/$PLATFORM/* HEAD || echo false )

if $FORCE || [ "$has_tag" == "false" ]
then
# proceed with build
  exit 0
else
# nothing changed
  exit 1
fi
```

## Links

- See [https://en.wikipedia.org/wiki/Shell_script]() for more examples.
- [How do I parse command line arguments in bash?](http://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash)
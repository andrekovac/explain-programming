---
title: 'bash basics'
date: '2019-08-27T17:52:03.284Z'
description: 'A set of basic (or not so basic) bash (shell) commands'
category: 'shell'
tags: ['bash', 'basic']
---

- Unix: Standard input: `keyboard`, standard output: `screen`
- Stop with `strg + d`

## Pipe operator

Get list of logged in user names:

```bash
who > names.txt
sort < names.txt
```

Better:

```bash
who | sort
```

##  Noteworthy unix commands

### Basics

```bash
cd..
mkdir
top
rm
cp
mv
```

## Write **blablabla** into `.vimrc` with `echo`

```bash
echo “blablabla” >> .vimrc
```

### Read files

```bash
$ cat test.tex    	:   	Displays the contents of test.tex
$ head test.tex		:	Display the first few lines
$ tail test.tex		:	Display last few lines
$ more test.tex		:
```

### Find files

```bash
find \usr\ -name "sup*"

find /myfiles -type d
```

### OSX: Open a file

Opens the file with the default-programme for that file-ending.
By default it will be the app `preview` in which the pdf will be opened.

```bash
open file.pdf
```

### Plot

```bash
echo $PATH
```

### Description

| Short       | Long     |
| ----------- | -------- |
| `whatis cp` | `man cp` |

### Compare files

Compare contents of `file1` and `file2`:

```bash
diff file1 file2
```

Does the same, but also works for binary

```bash
cmp file1 file2
```

### Redo last command

```bash
!!
```

### Get file-size

Get file size of `myfile.txt` in human readable form

```bash
du -h myfile.txt
```

Get file size of current folder (all its files recursively)

```bash
du -d0 -h .
```

### Redirect

#### Redicrect output to somewhere else with `>`

Redirect information about logged in user into a file `names.txt`:

```bash
who > names.txt
```

#### Redirect input to come from somewhere: `<`

```bash
sort < big_list_of_words.txt
```

### Append to a list

`>>`

## Links

- [great unix tutorial](http://www.ee.surrey.ac.uk/Teaching/Unix/unix7.html)

Good homepages with tips:

- [http://www.cs.jhu.edu/~joanne/unix.html]()
- [http://www.macresearch.org/pdflatex-command-not-found-mac-os-x-sl]()
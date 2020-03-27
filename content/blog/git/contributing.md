---
title: 'Git commands for contributing to open source projects'
description: 'Useful commands which come in handy when collaborating on GitHub projects'
date: '2019-06-07T02:30:00.169Z'
author: 'André Kovac'
category: 'tool'
tags: ['git']
draft: true
---

## How to fork a public repo on the command line and add a commit for a PR

### Via GitHub UI + command line:

1. Fork the repository
2. Clone the repository into a new folder
3. Create a new branch and add a commit with your change there
4. Push that branch
5. Back on GitHub when you go to the site of your forked projekt you'll see a
   message which you can click on to file a pull request with your change to the
   `master` branch of the original repository.

### Via command line

**TODO: Test this!!!**

1. Clone

## How to update a forked repository on Github

**TODO: Test this and check out the source article!!!**

You forked a repository at some point in the past and now want to merge in / rebase
the commits which have since been pushed to the `master` branch of the original repository.

1. Open a terminal and go to the folder of the cloned repository on your computer.

2. See which remotes exist

   ```bash
   git remote -v
   ```

3. Add another remote repository. You can use whatever name you like for the new remote repository, above I’ve used `some_name`.

   ```bash
   git remote add some_name https://github.com/MaxMustermann/OriginalRepository
   ```

4. Load all commits, including branches and tags, from the specified remote repository, using the alias defined above.

    ```bash
    git fetch original
    ```

5. Merge all changes from the original `master` branch in your current branch, eg. your local `master` branch.

    ```bash
    git merge original/master
    ```

6. By default, `push` pushes everything to your `origin` repository. Which brings your repo up-to-date. That’s it!

   ```bash
   git push
   ```


See also:

- [http://bassistance.de/2010/06/25/git-fu-updating-your-github-fork/]()

- [http://stackoverflow.com/questions/3903817/pull-new-updates-from-original-github-repository-into-forked-github-repository]()


## Review PR

You are managing a public repository and want to review a PR without having to to clone the other person's project into a new folder.

On GitHub you get the following instructions when clicking on **command line instructions**:

![](./merge-pr-command-line-instructions.png)

1. Get the branch of the other person who commited a PR with the newest change

	1. Create a new branch which is a copy of the branch the PR should be merged to

		```bash
		git checkout -b jampueroc-master master
		```

	2. Pull the content of the other person onto that newly created branch

		```bash
		git pull git://github.com/jampueroc/react-native-kontaktio.git master
		```

2. Test whether everything is alright
3. Go back to the branch which you want to merge into

	```bash
	git checkout master
	```

4. Do a fast-forward merge into the branch (here `master`) and push to its remote

	```bash
	git merge --no-ff jampueroc-master
	git push origin master
	```

### When getting a PR for your lib you can check out locally by doing this

This is what GitHub recommends you to do:

```bash
git fetch origin refs/pull/67/head
git checkout -b <some_other_user>/master FETCH_HEAD
```

---

Alternative (Verify!)


1. Add remote of your package on the account of the user who filed the PR:

	```bash
	// Look at all remotes
	git remote -v

	// Add new remote with name OtherUser
	git remote add OtherUser git@github.com: OtherUser/my-repo.git
	```

2. Fetch branches and checkout

	1. Begin tracking remote branches of `OtherUser`:

		```bash
		git fetch OtherUser
		```

	2. List both remote-tracking branches and local branches:

		```bash
		git branch -a
		```

	3. Checkout to the branch

		```bash
		git checkout remotes/OtherUser/name-of-branch
		```

		**NOTE**: This leads you to a detached HEAD state of that branch!
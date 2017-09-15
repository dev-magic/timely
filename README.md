# Let's Meet Up!

## Running Locally:

`git clone https://github.com/dev-magic/letsmeetup.git`

`cd letsmeetup`

`bundle && yarn`

`foreman start`

point browser to localhost:5000


## Contributing

### All PRs should be squashed and rebased before merging
#### This helps keep the commit history clean. Each commit should refer to a complete feature.

### Rebase

First, update your refs to be sure you have the latest code:

 git fetch --all

Next is the actual rebase.

git rebase -i origin/master

This says to rebase your work onto master from the main repository.

### Squash

From here, you'll see something like the following in your text editor:

pick f48d47c The first commit I did

pick fd4e046 The second commit I did

pick f80c87d The third commit I did

You'll want to change everything after your first commit from pick to squash. This tells git you want to squash these commits into the first one. Save and close the file.

The above should now read as follows:

pick f48d47c The first commit I did

squash fd4e046 The second commit I did

squash f80c87d The third commit I did

From here, you'll get an editor that will let you change the commit messages.

### This is a combination of 2 commits.
### The first commit's message is:
The first commit I did

### This is the 2nd commit message:

The second commit I did

You'll want to remove or comment out everything except for the first message, which you can edit to be a more complete summary of your changes. Once again, save and close the file.

To finish, you'll force push this new commit with the following command:

git push origin [my-feature-branch] --force-with-lease

The --force-with-lease flag will refuse to update a branch if someone else has updated it upstream, making your force push a little safer.

We created a `Common` Folder in it, there is a `package.json` file, with the following config.

```json
{
  "name": "@channel360/common",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```

take note of our name `<org-name>/<package-name>`

### How to publish to NPM

We have to publish our common folder to it's own seperate Git Repo. 
in the `.gitignore` file, we added the common folder to it. 

and set a remote called `common` to publish our changes for our common folder. 

```bash

```
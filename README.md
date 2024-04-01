# Madboks

A repository that hosts all Madboks apps: 
- The web that functions as a home page for the org [web](./apps/web/README.md)
- The app for registering the food [register](./apps/register/README.md)
- The app for the rest of the utilities like event management, volunteer event sign-up, and box bookings [app](./apps/app/README.md)

All these apps are served by the [api](./apps/api/README.md), which uses a `PostgreSQL` database

## Development

### Prerequisites
After cloning the repository, if you have `Docker` and `Visual Studio Code` installed, you can start coding right away. Our advice is to use `docker`, but it's something personal. Here are [9 reasons why](https://dev.to/danielgaldev/9-reasons-why-you-should-use-docker-as-a-development-environment-474j)

To use any of the scripts in the repository is necessary to change the access mode
```bash 
> chmod -R +x scripts/
```

### Running code from your local

#### Set up a `PostgreSQL` database. 
* with Docker

Start the database service with `docker-compose`.

```bash 
> docker compose up postgres
```
* or without Docker

Create a `PostgreSQL` database called `madboks` to be used by the api, in either your local or a remote host and make sure to remember host URL, user and password.

#### Install dependencies
* Run scripts/install.sh
Provide the params of your database or leave empty if you want to use the default values

```bash 
> scripts/install.sh -h
 Usage: scripts/install.sh <db_host> <db_port> <db_user>
 Description: This script sets up environment variables and installs dependencies.
 Options:
   -h, --help          Display this help message
   <db_host>           Database host (default: 127.0.0.1)
   <db_port>           Database port (default: 4433)

> scripts/install.sh <db_host> <db_port> <db_user>
```

* or use yarn and .env files
If you take a look in the apps inside `apps` directory, you should see some `.env.sample` files. Copy & paste `.env.sample` and rename to `.env.` if it doesn't exist already. In the file, every variable enclosed like this `${}` is a reference to your global environment variables. Continue with either declaring those variables globally or override them in the file. Notice that `.env.` files won't be added to the repository as they are included in .gitignore. 

After setting the variables, install dependencies with matching versions to the project and run dev command. The current project is running in node `20.11.0` as you can see in the file `.nvmrc`. You need to install this node version using `nvm` or `fnm` and activate yarn. 

```bash
> nvm install 20.11.0
> corepack enable yarn
> yarn install
```
#### Run apps scripts
Each app is a workspace in yarn. They have their own package.json where commands (scripts) like dev, build, lint are defined. 
* Run using scripts/run.sh

Use ./scripts/run.sh <app> <command> to run the command of your choice. This will make sure that the .env file exists before executing `yarn workspace @madboks/<app> run <command>`

Example on how to start the dev environment for the api : 
```bash
> ./scripts/run.sh api dev
```

* Run using yarn
You need to make sure that .env exists to those commands that uses it like `yarn workspace @madboks/api run dev`

#### Developing

* Use `Visual Studio Code` and docker compose
This option is as easy as running

```bash
> docker-compose up --detach
```
And changes in the local files will be reflected in the container in no time

* Using yarn workspace @madboks/<workspace> run dev and any IDE of your choice
Command `dev` is available for all workspaces, and it starts them watching out for any new changes. So if you get that command running for any of the workspaces, then you can start changing code. Check the README.md for each workspace, as they have their own requirements.

```bash
> yarn workspace @madboks/<workspace> run dev
```

## Deploy

We use Vercel and Fly.io

# Madboks

Repository that hosts all Madboks apps: 
- The web that functions as a home page for the org [web](./apps/web/README.md)
- The app for registering food [register](./apps/register/README.md)
- The app for the rest of utilities like event management, volunteers event sign up and box bookings [app](./apps/app/README.md)

All these apps are served by the [api](./apps/api/README.md) which uses a `PostgreSQL` database

## Development

### Prerequisites
- Clone project in your local
- Decide what type of development you will do between these options: 
 * Docker agnostic
    no docker involved, installing npm, yarn or anything needed to make the project run
 * Some docker involved to execute the database and/or the rest of the stack, but code executed locally
 * Docker + docker-compose


#### Running locally
We advice is to use `docker`, but it's something personal [9 reasons why](https://dev.to/danielgaldev/9-reasons-why-you-should-use-docker-as-a-development-environment-474j)

- Set up a `PostgreSQL` database
- Install dependencies with matching versions to the project

The current project is running in node `20.11.0` as you can see in the file `.nvmrc`. You need to install this node version using `nvm` or `fnm`.

When you have this node version installed, activate `yarn` with 

```bash
> corepack enable yarn
```

- Run scripts/install.sh <db_host> <db_port> <db_user> at the root directory. This will set up environment variables and run yarn install
- Use ./scripts/run.sh <app> <command> to start the app and run scripts defined at package.json. This will make sure that the .env file exists before executing yarn workspace @madboks/<app> run <command>  
Example to start the dev enviroment for api  api dev: `./scripts/run.sh api dev`

#### Running with Docker

To run the database with docker, you must have `docker` and `docker-compose` installed. Once installed, run this command from the root directory to create and run the container.

```bash
> docker-compose up --detach
```

This command will download the `PostgreSQL` image, and all of the other apps. All of the containers will be running in the background.

You can stop all of the services and just keep the database. Using scripts/install.sh without params, it will set the environment variables accordingly 

### Env files

It is possible to set environment variables within every app. You can set them in the different `.env` files. There is an `.env.sample` in every workspace. Copy & paste this file and rename to `.env.`, if it doesn't exist already, and fill the information for the env vars there. These won't be added to the repository, so make sure you include need information for deployment

### Install node dependencies

Docker images are already set to use the right versions. Check the guide for Running locally

### Install package-specific things

To run one of the apps, check the README inside the apps

[API](./apps/api/README.md)
[APP](./apps/app/README.md)

### Run scripts

Sometimes there are some scripts/tasks that you can run from the root directory. You can take a look at all of them in `package.json`. For example, if you want to run the `dev` script on all packages, you can run:

```tap
> yarn run dev
```

but if you want to run the `dev` script in just one, like `api`, using the package name, you can run this:

```tap
> yarn workspace @madboks/api run dev
```

## Deploy

We use Vercel and Fly.io

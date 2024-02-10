# Madboks

Madboks: The app to register the food

## Apps

[API](./apps/api/README.md)
[APP](./apps/app/README.md)

## Development

### Prerequisites

Before doing anything, we need to run our database with `PostgreSQL`. You can run it on your local machine or using `docker`. Our advice is to use `docker`, but it's something personal.

#### Docker

To run the database with docker, you must have `docker` and `docker-compose` installed. Once installed, run this command from the root directory to create and run the container.

```bash
> docker-compose up --detach
```

This command will download the `PostgreSQL` image, and mount the container, running in the background.

The next time that you want to run the database, run the same command, and that's all.

### Env files

Set some env. variables to run the app. You shoudl set this env. variables in different `.env` files. If you take a look in the apps inside `apps` directory, you should see some `.env.sample` files. Copy & paste this file and rename to `.env.`, and fill the information for the env vars inside this file.

### Install node dependencies

We use node `20.11.0` as you can see in the file `.nvmrc`. You need to install this node version. You can install the binaries or install using `nvm` or `fnm`.

When you have this noder version installed, activate `yarn` with 

```bash
> corepack enable yarn
```

Then, install all dependendies with

```bash
> yarn install
```

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

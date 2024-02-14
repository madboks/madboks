# Madboks API

API to manage the logic about registering process new packages with food from the different supermarkets.

## Database Schema

[Miro board](https://miro.com/app/embed/uXjVNeWi5hw=/?pres=1&frameId=3458764565852927320&embedId=208808018491)

## Development

### Prerequisites

Before doing anything, we need to run our database with `PostgreSQL`. You can run it on your local machine or using `docker`. Our advice is to use `docker`, but it's something personal.

### Run migrations for the database.

The first time you run the application you should run all the migrations and initial data to create the database schema and have some data to work with. To achieve this, you need to run this inside the `api` project/directory:

```bash
> yarn workspace @madboks/api run prisma migrate dev
> yarn workspace @madboks/api run prisma generate
```

and then, we can run the seeds

```bash
> yarn workspace @madboks/api run prisma db seed
```

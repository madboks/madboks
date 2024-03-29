# Madboks API

API to manage the logic about registering process new packages with food from the different supermarkets.

## Database Schema

>[Notion page](https://www.notion.so/madboks/DB-917e7d9f14814297999684e6639af9e4?pvs=4)

>[Shifts DB](ttps://www.notion.so/madboks/Shift-booking-fe9446ef3b9c4f0ba024acac41c70f24?pvs=4)
- [Model in mermaid](https://mermaid.live/edit#pako:eNqNUVtrgzAU_ivhPKsYLzHmbWyOFYqO1RU2AiPUdJVNLVZhnfrfF9M63A2WhwPnu-Uj6WBTZRIYyPoqF8-1KHiJ1InWUZyivjfNvkOrm8V1ytBOHObkMJI9WiaXF-kiiRnKy1-8HPT6pDPSh9uIwyzpPGGdLO_jNIruTjoOU_onMTf9Lf_e9DQ1Okk46NWculTbr1V-1P2nUU8woJB1IfJMPWk3YhyanSzkaOCQifqFAy8HpRNtU62O5QZYU7fSgHafiUaePwHYVrweFLoXJbAO3oCZnkOswHccj_ie7VLbN-AIjIRW6GKCKfVtElCXDga8V5VKwFaAg5BiEhLsUOr5jo571OR45_ABrCiRjg)

## API SChema

The scheme and implementation of the API follows the specification [JSON:api](https://jsonapi.org/format/) for methods, payload, etc.

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

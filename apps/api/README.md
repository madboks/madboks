# Madboks API

API to manage the logic about registering process new packages with food from the different supermarkets.

## Database Schema

>[Notion page](https://www.notion.so/madboks/DB-917e7d9f14814297999684e6639af9e4?pvs=4)

>[Shifts DB](ttps://www.notion.so/madboks/Shift-booking-fe9446ef3b9c4f0ba024acac41c70f24?pvs=4)
- [Model in mermaid](https://mermaid.live/edit#pako:eNqdlW2vmjAUx78KOa_V-MSDvFs2lkvm1Cgz2cayNFKVDFoD5eY65btfWii3CLrc9QXJ6Tk9_fXfc8oFdjTAYANOPoXokKDYJ1oxnK2z8LTrtd-_XrTNk_vZs7UjSlVnzp1Xbb78-MFzlwtbC0nHWh-E-Vvk8L6vHB-UTNUXtsv5t4XnOOsyzgeZvXaoi-6H35KWXzErQ3wQZl-y0H0TpYX7_wsvpYsP_IwJc4PKcrilrb68-dNjuGfe-YRFzEZajZhnGmWEYZykX0OiuYR1utDLmytXCctrUZhCiVONDUtCcmhsKbBrmrQEr-2fv24OkCrJuK0GRHSHWEiJFGFe2TWp1FFVuSXhA5a2nm2cRgxBMW6fv8XTLrZLh_DVsbbSbtO4QZOmEZHQqMFS51lzhw-YZLHW1wK8R1nE7CdnvnLWPtzA1qhd19xxvVIB9eR8nI6U4I55HKMw6piXajcuvaYq2-99hdfsB6Uj7rVU1VRdLXGjqEiV3jDKV-ydmCgIEpymnSX0rxLjI0YEHYpiueffUcLQjt3PTxlOH-Tnj7u6f-PRSCiNHy0WAisBQmDldqEHMU6KkgiK_4fQzQd2xDHmr6MPAUr-8ArNiziUMbo5kx3YLMlwD7JTgBiu_jhg71GUFrMnRMC-wAvY09lgNhqaxti0TMOwLEPvwRnskTkdjPSpZZpjYzgZG3reg7_FKcAeDkx9Nh2Op_rEms0m1kQX6X4IJ98zfwUkGOak)

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

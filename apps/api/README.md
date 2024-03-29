# Madboks API

API to manage the logic about registering process new packages with food from the different supermarkets.

## Database Schema

>[Notion page](https://www.notion.so/madboks/DB-917e7d9f14814297999684e6639af9e4?pvs=4)

>[Shifts DB](ttps://www.notion.so/madboks/Shift-booking-fe9446ef3b9c4f0ba024acac41c70f24?pvs=4)
- [Model in mermaid](https://mermaid.live/edit#pako:eNq9lMGO2jAQhl8lmjMgkiwQcqu2qRqJQlVSpHZdVRYxEJXYyDarpYF338SJgxNCV-2hPkQa_-PxN-PJZLBmMQEfCH-f4C3HKaJWvoJVMI-s87nfP2fW8mP4IfKtHRameCnEszVbPL6LwsXctxLacRaBMn-qGNG3zwECI1L1hdVi9nUeBcGX0g-Bjl4L5qH77m3S8qt2tQsCZfY1C9s0UW5w__1gVkrFIs-EyjCurKCwrqLYJRsZnQ5EOSy1dXV4ZvsjlYRw8SmhVmieNST8cpUuJlv5IAZNokGqtZQ8odsWbc0hSt7afvrRQhdGpMI2HfZsjWXCqM59Vtk1pi6fWVyTleKU_AdWg-S2u7KOelcJrbTduieMm_egdsb1LV3JtpM87BglHfs6pe5Uyr7_i3dvNmJnKzYb-aaVr-1oNcujQokWoJ4dLcY2Fo5jToS4i_1Wi6SY4i3hd_U1oxKv5f34TBLxh_jFCDXvb_ygnLFUvNW_hoMqaP2U0IOU8BQncT6jVZUQyB1JSTGBEMSY_0KAaOGHj5ItT3QNvuRH0oPjIcaSVFMd_A3ei3z3gCn4GbyA37fHA9cdDR3bG08cb-j14AS-PRqMvKk3ccb2aGpPhs6lB7_zFHJl4DzYjmtPbc91H6ZjWwX7rrTixssrAHS-NA)

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

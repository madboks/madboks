# Madboks Ingestor

Transform the data from the old database to the new one following the new schema

## Previous database

The main table of interest is 'items', with each row connected to the reference tables (product, country, shop) by their id. Followed by unit mass, number of items, total mass, barcode, best before, actual scan time, unit emissions.

Only records with the flag 'Active' set to 1 should be considered valid.

The 'products' table contains the reference to 'gwp' used in the emissions calculation.


## Development

Run the docker container using `docker-compose`:

```
> docker-compose --profile ingest up --detach
```

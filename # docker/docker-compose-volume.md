https://docs.docker.com/reference/compose-file/volumes/


### Example
The following example shows a two-service setup where a database's data directory is shared with another service as a volume, named `db-data`, so that it can be periodically backed up.

```yaml
services:
  backend:
    image: example/database
    volumes:
      - db-data:/etc/data
  backup:
    image: backup-service
    volumes:
      - db-data:/var/lib/backup/data

volumes:
  db-data:
```

The `db-data` volume is mounted at the `/var/lib/backup/data` and `/etc/data` container paths for backup and backend respectively.
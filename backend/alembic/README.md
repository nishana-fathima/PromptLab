# PromptLab Migrations

The initial revision creates a new `analyses` table or safely baselines an existing table after verifying all required columns exist. It never drops or recreates an existing table.

For an existing database, back it up and inspect it before running:

```bash
cp promptlab.db promptlab.db.backup
alembic upgrade head
```

If the table does not match the expected schema, the migration stops instead of stamping an unknown database. The JSON `weaknesses` field supports both legacy strings and newer objects with optional severity, so no data migration is needed for the Phase 5 severity enhancement.

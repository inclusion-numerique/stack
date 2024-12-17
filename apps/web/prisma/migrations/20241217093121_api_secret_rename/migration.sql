-- Rename instead of drop to avoid data loss
ALTER TABLE "api_clients"
    RENAME COLUMN "secret" TO "secret_hash";

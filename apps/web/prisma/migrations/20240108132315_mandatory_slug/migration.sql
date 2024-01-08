

WITH numbered_users AS (
    SELECT "id", "name", ROW_NUMBER() OVER (ORDER BY "id") AS rn
    FROM "users"
)
UPDATE "users" SET "slug" = LOWER(REGEXP_REPLACE(COALESCE(NULLIF(numbered_users."name", ''), 'p'), '[^a-zA-Z0-9]+', '-', 'g')) || '-' || numbered_users.rn
FROM numbered_users
WHERE "users"."id" = numbered_users."id";


WITH users_slug AS (
    SELECT "id", "slug"
    FROM "users"
),
numbered_collections AS (
 SELECT "id", "title", "is_favorites", "owner_id", ROW_NUMBER() OVER (ORDER BY "id") AS rn
 FROM "collections"
)
UPDATE "collections"
SET "slug" =
        CASE
            WHEN numbered_collections."is_favorites" THEN users_slug."slug" || '-' || LOWER(REGEXP_REPLACE("title", '[^a-zA-Z0-9]+', '-', 'g')) || '-' || numbered_collections.rn
            WHEN numbered_collections."title" = 'Ressources enregistrées' THEN users_slug."slug" || '-ressources-enregistrees-' || numbered_collections.rn
            ELSE LOWER(REGEXP_REPLACE("title", '[^a-zA-Z0-9]+', '-', 'g')) || '-' || numbered_collections.rn
            END
FROM users_slug, numbered_collections
WHERE "collections"."id" = numbered_collections."id" AND "collections"."owner_id" = users_slug."id";


-- AlterTable
ALTER TABLE "collections" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "slug" SET NOT NULL;

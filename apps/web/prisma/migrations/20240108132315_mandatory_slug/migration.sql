

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
)
UPDATE "collections"
SET "slug" =
        CASE
            WHEN "collections"."is_favorites" THEN users_slug."slug" || '-' || LOWER(REGEXP_REPLACE("title", '[^a-zA-Z0-9]+', '-', 'g')) || '-' || LEFT("collections"."id"::text, 2)
            WHEN "collections"."title" = 'Ressources enregistrées' THEN users_slug."slug" || '-ressources-enregistrees-' || LEFT("collections"."id"::text, 2)
            ELSE LOWER(REGEXP_REPLACE("title", '[^a-zA-Z0-9]+', '-', 'g')) || '-' || LEFT("collections"."id"::text, 2)
            END
FROM users_slug
WHERE "collections"."owner_id" = users_slug."id";


-- AlterTable
ALTER TABLE "collections" ALTER COLUMN "slug" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "slug" SET NOT NULL;

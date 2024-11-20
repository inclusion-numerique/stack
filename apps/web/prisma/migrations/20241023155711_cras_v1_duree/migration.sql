
-- AlterTable
ALTER TABLE "cras_conseiller_numerique_v1" ADD COLUMN     "duree_minutes" INTEGER;

-- Update 'duree_minutes' based on 'duree' column
UPDATE "cras_conseiller_numerique_v1"
SET "duree_minutes" = CASE
                          WHEN "duree" IS NULL OR "duree" = '' THEN 0
                          WHEN "duree" = '0-30' THEN 15
                          WHEN "duree" = '30-60' THEN 45
                          ELSE CAST("duree" AS INTEGER)  -- Direct cast for any valid numeric string
    END;

-- Set not null
ALTER TABLE "cras_conseiller_numerique_v1" ALTER COLUMN "duree_minutes" SET NOT NULL;

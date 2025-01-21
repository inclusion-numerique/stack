-- AlterTable
ALTER TABLE "accompagnements" ADD COLUMN     "premier_accompagnement" BOOLEAN NOT NULL DEFAULT false;

UPDATE accompagnements
SET premier_accompagnement = true
FROM beneficiaires
WHERE accompagnements.beneficiaire_id = beneficiaires.id
  AND beneficiaires.already_assisted = false
  AND beneficiaires.creation > '2025-01-15';

WITH ranked_activites AS (
  SELECT
      a.id AS accompagnement_id,
      ROW_NUMBER() OVER (PARTITION BY b.id ORDER BY act.date ASC) AS row_num
  FROM accompagnements a
      INNER JOIN activites act ON a.activite_id = act.id
      INNER JOIN beneficiaires b ON a.beneficiaire_id = b.id
  WHERE act.suppression IS NULL AND b.suppression IS NULL AND b.anonyme = false
)
UPDATE accompagnements
SET premier_accompagnement = true
FROM ranked_activites
WHERE accompagnements.id = ranked_activites.accompagnement_id
  AND ranked_activites.row_num = 1;

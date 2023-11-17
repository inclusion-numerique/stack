/*
 Create info sirets from legacy formulaires
 */

INSERT INTO informations_siret (siret, nom, creation, modification)
SELECT
    CASE
        WHEN fg.siret_structure IS NULL OR fg.siret_structure = '' THEN '__sans-siret__' || fg.nom_structure
        ELSE fg.siret_structure
    END AS siret,
    fg.nom_structure,
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
FROM
    formulaire_gouvernance fg
WHERE
    fg.nom_structure IS NOT NULL AND
        fg.nom_structure <> ''
ON CONFLICT (siret) DO NOTHING;

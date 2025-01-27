-- Reset the commune name for missing data when importing beneficiaires

UPDATE beneficiaires b
SET commune = (SELECT COALESCE(b2.commune, '')
               FROM beneficiaires b2
               WHERE b2.commune_code_insee = b.commune_code_insee
                 AND b2.commune IS NOT NULL
                 AND b2.commune != ''
               LIMIT 1)
WHERE b.commune_code_postal IS NOT NULL
  AND (b.commune IS NULL OR b.commune = '');

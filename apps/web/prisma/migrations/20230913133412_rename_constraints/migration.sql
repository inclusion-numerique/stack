-- AlterTable
ALTER TABLE "gouvernances" RENAME CONSTRAINT "Gouvernance_pkey" TO "gouvernances_pkey";

-- AlterTable
ALTER TABLE "informations_siret" RENAME CONSTRAINT "InformationsSiret_pkey" TO "informations_siret_pkey";

-- AlterTable
ALTER TABLE "organisations_recruteuses_coordinateurs" RENAME CONSTRAINT "OrganisationRecruteuseCoordinateurs_pkey" TO "organisations_recruteuses_coordinateurs_pkey";

-- RenameForeignKey
ALTER TABLE "gouvernances" RENAME CONSTRAINT "Gouvernance_createur_id_fkey" TO "gouvernances_createur_id_fkey";

-- RenameForeignKey
ALTER TABLE "gouvernances" RENAME CONSTRAINT "Gouvernance_departementCode_fkey" TO "gouvernances_departementCode_fkey";

-- RenameForeignKey
ALTER TABLE "gouvernances" RENAME CONSTRAINT "Gouvernance_derniere_modification_par_id_fkey" TO "gouvernances_derniere_modification_par_id_fkey";

-- RenameForeignKey
ALTER TABLE "gouvernances" RENAME CONSTRAINT "Gouvernance_porteur_departement_code_fkey" TO "gouvernances_porteur_departement_code_fkey";

-- RenameForeignKey
ALTER TABLE "gouvernances" RENAME CONSTRAINT "Gouvernance_porteur_epci_code_fkey" TO "gouvernances_porteur_epci_code_fkey";

-- RenameForeignKey
ALTER TABLE "gouvernances" RENAME CONSTRAINT "Gouvernance_porteur_region_code_fkey" TO "gouvernances_porteur_region_code_fkey";

-- RenameForeignKey
ALTER TABLE "gouvernances" RENAME CONSTRAINT "Gouvernance_porteur_siret_fkey" TO "gouvernances_porteur_siret_fkey";

-- RenameForeignKey
ALTER TABLE "organisations_recruteuses_coordinateurs" RENAME CONSTRAINT "OrganisationRecruteuseCoordinateurs_gouvernance_id_fkey" TO "organisations_recruteuses_coordinateurs_gouvernance_id_fkey";

-- RenameForeignKey
ALTER TABLE "organisations_recruteuses_coordinateurs" RENAME CONSTRAINT "OrganisationRecruteuseCoordinateurs_siret_fkey" TO "organisations_recruteuses_coordinateurs_siret_fkey";

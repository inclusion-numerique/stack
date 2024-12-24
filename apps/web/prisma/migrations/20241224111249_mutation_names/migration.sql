-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "mutation_name" ADD VALUE 'valider_inscription';
ALTER TYPE "mutation_name" ADD VALUE 'modifier_utilisateur';
ALTER TYPE "mutation_name" ADD VALUE 'usurper_utilisateur';
ALTER TYPE "mutation_name" ADD VALUE 'inviter_mediateurs_coordonnes';
ALTER TYPE "mutation_name" ADD VALUE 'accepter_invitation_mediateur_coordonne';
ALTER TYPE "mutation_name" ADD VALUE 'refuser_invitation_mediateur_coordonne';
ALTER TYPE "mutation_name" ADD VALUE 'creer_employe_structure';
ALTER TYPE "mutation_name" ADD VALUE 'supprimer_employe_structure';
ALTER TYPE "mutation_name" ADD VALUE 'creer_mediateur_en_activite';
ALTER TYPE "mutation_name" ADD VALUE 'supprimer_mediateur_en_activite';

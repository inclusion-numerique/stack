-- CreateEnum
CREATE TYPE "user_roles" AS ENUM ('admin', 'user');

-- CreateEnum
CREATE TYPE "mutation_name" AS ENUM ('creer_mediateur', 'modifier_mediateur', 'supprimer_mediateur', 'creer_coordinateur', 'modifier_coordinateur', 'supprimer_coordinateur', 'creer_mediateur_coordonne', 'supprimer_mediateur_coordonne', 'creer_structure', 'modifier_structure');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "last_login" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "mediateurs" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "mediateurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "conseillers_numeriques" (
    "id" TEXT NOT NULL,
    "mediateur_id" UUID NOT NULL,

    CONSTRAINT "conseillers_numeriques_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "coordinateurs" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "coordinateurs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mediateurs_coordonnes" (
    "id" UUID NOT NULL,
    "mediateur_id" UUID NOT NULL,
    "coordinateur_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "mediateurs_coordonnes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "structures" (
    "id" UUID NOT NULL,
    "id_data_inclusion" TEXT,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "structures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "organisations" (
    "id" UUID NOT NULL,
    "mon_compte_pro_id" TEXT,
    "structure_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "organisations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mediateurs_employes" (
    "id" UUID NOT NULL,
    "mediateur_id" UUID NOT NULL,
    "organisation_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "mediateurs_employes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lieux_activites" (
    "id" UUID NOT NULL,
    "structure_id" UUID NOT NULL,
    "creation" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modification" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suppression" TIMESTAMP(3),

    CONSTRAINT "lieux_activites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Mutation" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "nom" "mutation_name" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Mutation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mediateurs_user_id_key" ON "mediateurs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "conseillers_numeriques_mediateur_id_key" ON "conseillers_numeriques"("mediateur_id");

-- CreateIndex
CREATE UNIQUE INDEX "coordinateurs_user_id_key" ON "coordinateurs"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "structures_id_data_inclusion_key" ON "structures"("id_data_inclusion");

-- CreateIndex
CREATE UNIQUE INDEX "organisations_mon_compte_pro_id_key" ON "organisations"("mon_compte_pro_id");

-- CreateIndex
CREATE UNIQUE INDEX "organisations_structure_id_key" ON "organisations"("structure_id");

-- CreateIndex
CREATE UNIQUE INDEX "lieux_activites_structure_id_key" ON "lieux_activites"("structure_id");

-- AddForeignKey
ALTER TABLE "mediateurs" ADD CONSTRAINT "mediateurs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "conseillers_numeriques" ADD CONSTRAINT "conseillers_numeriques_mediateur_id_fkey" FOREIGN KEY ("mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "coordinateurs" ADD CONSTRAINT "coordinateurs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediateurs_coordonnes" ADD CONSTRAINT "mediateurs_coordonnes_mediateur_id_fkey" FOREIGN KEY ("mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediateurs_coordonnes" ADD CONSTRAINT "mediateurs_coordonnes_coordinateur_id_fkey" FOREIGN KEY ("coordinateur_id") REFERENCES "coordinateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "organisations" ADD CONSTRAINT "organisations_structure_id_fkey" FOREIGN KEY ("structure_id") REFERENCES "structures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediateurs_employes" ADD CONSTRAINT "mediateurs_employes_mediateur_id_fkey" FOREIGN KEY ("mediateur_id") REFERENCES "mediateurs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mediateurs_employes" ADD CONSTRAINT "mediateurs_employes_organisation_id_fkey" FOREIGN KEY ("organisation_id") REFERENCES "organisations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lieux_activites" ADD CONSTRAINT "lieux_activites_structure_id_fkey" FOREIGN KEY ("structure_id") REFERENCES "structures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mutation" ADD CONSTRAINT "Mutation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

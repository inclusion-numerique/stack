-- CreateTable
CREATE TABLE "regions" (
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "regions_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "epcis" (
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "geometry" JSONB,
    "population" INTEGER NOT NULL,

    CONSTRAINT "epcis_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "departements" (
    "code" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "code_region" TEXT,
    "geometry" JSONB,

    CONSTRAINT "departements_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "communes" (
    "code" TEXT NOT NULL,
    "article" TEXT,
    "nom" TEXT NOT NULL,
    "nom_commune_complet" TEXT NOT NULL,
    "code_postal" TEXT NOT NULL,
    "code_departement" TEXT,
    "population" INTEGER NOT NULL,
    "code_epci" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "geometry" JSONB,

    CONSTRAINT "communes_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "structures_cartographie_nationale" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "thematiques" TEXT[],
    "typologie" TEXT,
    "code_commune" TEXT NOT NULL,
    "adresse" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "labelConseillersNumerique" BOOLEAN NOT NULL,
    "labelFranceServices" BOOLEAN NOT NULL,
    "labelAidantsConnect" BOOLEAN NOT NULL,
    "source_data" JSONB NOT NULL,
    "structure_aidants_connect_id" TEXT,
    "permanence_conseiller_numerique_id" TEXT,

    CONSTRAINT "structures_cartographie_nationale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "structures_aidants_connect" (
    "id" TEXT NOT NULL,

    CONSTRAINT "structures_aidants_connect_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permanences_conseiller_numerique" (
    "id" TEXT NOT NULL,

    CONSTRAINT "permanences_conseiller_numerique_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "communes_code_departement_idx" ON "communes"("code_departement");

-- CreateIndex
CREATE INDEX "communes_code_postal_idx" ON "communes"("code_postal");

-- CreateIndex
CREATE UNIQUE INDEX "structures_cartographie_nationale_structure_aidants_connect_key" ON "structures_cartographie_nationale"("structure_aidants_connect_id");

-- CreateIndex
CREATE UNIQUE INDEX "structures_cartographie_nationale_permanence_conseiller_num_key" ON "structures_cartographie_nationale"("permanence_conseiller_numerique_id");

-- AddForeignKey
ALTER TABLE "departements" ADD CONSTRAINT "departements_code_region_fkey" FOREIGN KEY ("code_region") REFERENCES "regions"("code") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "communes" ADD CONSTRAINT "communes_code_departement_fkey" FOREIGN KEY ("code_departement") REFERENCES "departements"("code") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "communes" ADD CONSTRAINT "communes_code_epci_fkey" FOREIGN KEY ("code_epci") REFERENCES "epcis"("code") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "structures_cartographie_nationale" ADD CONSTRAINT "structures_cartographie_nationale_code_commune_fkey" FOREIGN KEY ("code_commune") REFERENCES "communes"("code") ON DELETE RESTRICT ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "structures_cartographie_nationale" ADD CONSTRAINT "structures_cartographie_nationale_structure_aidants_connec_fkey" FOREIGN KEY ("structure_aidants_connect_id") REFERENCES "structures_aidants_connect"("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

-- AddForeignKey
ALTER TABLE "structures_cartographie_nationale" ADD CONSTRAINT "structures_cartographie_nationale_permanence_conseiller_nu_fkey" FOREIGN KEY ("permanence_conseiller_numerique_id") REFERENCES "permanences_conseiller_numerique"("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY DEFERRED;

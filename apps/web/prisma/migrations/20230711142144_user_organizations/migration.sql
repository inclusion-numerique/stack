-- AlterTable
ALTER TABLE "users" ADD COLUMN     "mon_compte_pro_organizations" JSONB;

-- CreateTable
CREATE TABLE "user_organizations" (
    "mon_compte_pro_id" INTEGER NOT NULL,
    "is_collectivite_territoriale" BOOLEAN NOT NULL,
    "is_external" BOOLEAN NOT NULL,
    "is_service_public" BOOLEAN NOT NULL,
    "label" TEXT NOT NULL,
    "siret" TEXT NOT NULL,
    "prefecture_checked_at" TIMESTAMP(3),
    "is_departement_prefecture" TEXT,

    CONSTRAINT "user_organizations_pkey" PRIMARY KEY ("mon_compte_pro_id")
);

-- CreateTable
CREATE TABLE "_UserToUserOrganization" (
    "A" UUID NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToUserOrganization_AB_unique" ON "_UserToUserOrganization"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToUserOrganization_B_index" ON "_UserToUserOrganization"("B");

-- AddForeignKey
ALTER TABLE "_UserToUserOrganization" ADD CONSTRAINT "_UserToUserOrganization_A_fkey" FOREIGN KEY ("A") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToUserOrganization" ADD CONSTRAINT "_UserToUserOrganization_B_fkey" FOREIGN KEY ("B") REFERENCES "user_organizations"("mon_compte_pro_id") ON DELETE CASCADE ON UPDATE CASCADE;

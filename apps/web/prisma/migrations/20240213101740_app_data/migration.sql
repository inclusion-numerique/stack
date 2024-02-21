-- CreateTable
CREATE TABLE "app_data" (
    "id" TEXT NOT NULL DEFAULT 'app-data' CHECK (id = 'app-data'),
    "data_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_data_pkey" PRIMARY KEY ("id")
);


INSERT INTO "app_data" ("id", "data_updated") VALUES ('app-data', '2023-11-28 00:00:00.000');

-- CreateTable
CREATE TABLE "job_executions" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "started" TIMESTAMP(3) NOT NULL,
    "completed" TIMESTAMP(3),
    "errored" TIMESTAMP(3),
    "duration" INTEGER,
    "data" JSONB,
    "result" JSONB,
    "error" TEXT,

    CONSTRAINT "job_executions_pkey" PRIMARY KEY ("id")
);

-- CreateEnum
CREATE TYPE "SearchType" AS ENUM ('quicksearch', 'resources', 'bases', 'profiles');

-- CreateTable
CREATE TABLE "search_executions" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "type" "SearchType" NOT NULL,
    "query" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "duration" INTEGER NOT NULL,
    "results" INTEGER NOT NULL,
    "themes" "theme"[] DEFAULT ARRAY[]::"theme"[],
    "support_types" "support_type"[] DEFAULT ARRAY[]::"support_type"[],
    "target_audiences" "target_audience"[] DEFAULT ARRAY[]::"target_audience"[],
    "departments" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "page" INTEGER NOT NULL,
    "per_page" INTEGER NOT NULL,
    "sorting" TEXT NOT NULL,

    CONSTRAINT "search_executions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "search_executions_user_id_idx" ON "search_executions"("user_id");

-- AddForeignKey
ALTER TABLE "search_executions" ADD CONSTRAINT "search_executions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

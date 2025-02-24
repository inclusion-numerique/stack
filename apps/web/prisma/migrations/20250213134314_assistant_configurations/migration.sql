/*
  Warnings:

  - Added the required column `assistant_configuration_id` to the `assistant_chat_sessions` table without a default value. This is not possible if the table is not empty.

*/

DELETE FROM "assistant_chat_messages" WHERE 1 = 1;
DELETE FROM "assistant_chat_sessions" WHERE  1 = 1;

-- AlterTable
ALTER TABLE "assistant_chat_sessions" ADD COLUMN     "assistant_configuration_id" UUID NOT NULL;

-- CreateTable
CREATE TABLE "assistant_configurations" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "title" TEXT,
    "notes" TEXT,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "model" TEXT NOT NULL,
    "frequency_penalty" DOUBLE PRECISION,
    "function_call" TEXT,
    "max_completion_tokens" INTEGER,
    "max_tokens" INTEGER,
    "parallel_tool_calls" BOOLEAN,
    "presence_penalty" DOUBLE PRECISION,
    "reasoning_effort" TEXT,
    "seed" INTEGER,
    "temperature" DOUBLE PRECISION,
    "top_logprobs" INTEGER,
    "top_p" DOUBLE PRECISION,
    "system_message" TEXT,
    "search_tool_description" TEXT,

    CONSTRAINT "assistant_configurations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "assistant_chat_sessions" ADD CONSTRAINT "assistant_chat_sessions_assistant_configuration_id_fkey" FOREIGN KEY ("assistant_configuration_id") REFERENCES "assistant_configurations"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assistant_configurations" ADD CONSTRAINT "assistant_configurations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `gouvernancePersona` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `roleScope` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE users RENAME "gouvernancePersona" TO gouvernance_persona;
ALTER TABLE users RENAME "roleScope" TO role_scope;
ALTER TABLE "users"  ADD COLUMN  "gouvernance_signup_email_sent" TEXT;

/*
  Warnings:

  - You are about to drop the column `FileId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_FileId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "FileId";

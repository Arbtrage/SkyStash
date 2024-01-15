/*
  Warnings:

  - Added the required column `refresh_Token` to the `Auth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Auth" ADD COLUMN     "refresh_Token" STRING NOT NULL;

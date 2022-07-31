/*
  Warnings:

  - You are about to drop the column `tarifaId` on the `Items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Items" DROP COLUMN "tarifaId",
ADD COLUMN     "pruebaId" TEXT;

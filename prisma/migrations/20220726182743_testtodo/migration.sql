/*
  Warnings:

  - Made the column `testsToDo` on table `Perfil` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Perfil" ALTER COLUMN "testsToDo" SET NOT NULL;

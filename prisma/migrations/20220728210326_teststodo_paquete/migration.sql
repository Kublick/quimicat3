/*
  Warnings:

  - Added the required column `testsToDo` to the `Paquete` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paquete" ADD COLUMN     "testsToDo" JSONB NOT NULL;

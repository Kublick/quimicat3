/*
  Warnings:

  - You are about to drop the column `comenatarios` on the `Paciente` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Paciente" DROP COLUMN "comenatarios",
ADD COLUMN     "comentarios" TEXT;

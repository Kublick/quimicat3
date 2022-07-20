/*
  Warnings:

  - Changed the type of `valoresRangos` on the `Prueba` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Prueba" DROP COLUMN "valoresRangos",
ADD COLUMN     "valoresRangos" JSONB NOT NULL;

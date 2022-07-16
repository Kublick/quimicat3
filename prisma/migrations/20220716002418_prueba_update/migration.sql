/*
  Warnings:

  - The `printBold` column on the `Prueba` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `printNotas` column on the `Prueba` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Prueba" DROP COLUMN "printBold",
ADD COLUMN     "printBold" BOOLEAN NOT NULL DEFAULT false,
DROP COLUMN "printNotas",
ADD COLUMN     "printNotas" BOOLEAN NOT NULL DEFAULT false;

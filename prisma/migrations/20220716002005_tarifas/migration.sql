/*
  Warnings:

  - The `printMetodo` column on the `Prueba` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Prueba" DROP COLUMN "printMetodo",
ADD COLUMN     "printMetodo" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "ventaIndividual" SET DEFAULT false,
ALTER COLUMN "permitirAntibiograma" SET DEFAULT false;

-- CreateTable
CREATE TABLE "Tarifa" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Tarifa_pkey" PRIMARY KEY ("id")
);

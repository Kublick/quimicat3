/*
  Warnings:

  - You are about to drop the column `barCode` on the `Metodo` table. All the data in the column will be lost.
  - You are about to drop the column `clave` on the `Metodo` table. All the data in the column will be lost.
  - You are about to drop the column `desscripcion` on the `Metodo` table. All the data in the column will be lost.
  - You are about to drop the column `excludeStatus` on the `Metodo` table. All the data in the column will be lost.
  - You are about to drop the column `nombreTubo` on the `Metodo` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `Metodo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Metodo" DROP COLUMN "barCode",
DROP COLUMN "clave",
DROP COLUMN "desscripcion",
DROP COLUMN "excludeStatus",
DROP COLUMN "nombreTubo",
ADD COLUMN     "nombre" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Muestra" (
    "id" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "nombreTubo" TEXT NOT NULL,
    "barCode" BOOLEAN NOT NULL DEFAULT false,
    "excludeStatus" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Muestra_pkey" PRIMARY KEY ("id")
);

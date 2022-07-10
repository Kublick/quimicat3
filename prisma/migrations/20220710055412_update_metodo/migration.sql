/*
  Warnings:

  - You are about to drop the column `nombre` on the `Metodo` table. All the data in the column will be lost.
  - Added the required column `clave` to the `Metodo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `desscripcion` to the `Metodo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombreTubo` to the `Metodo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Metodo" DROP COLUMN "nombre",
ADD COLUMN     "barCode" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "clave" TEXT NOT NULL,
ADD COLUMN     "desscripcion" TEXT NOT NULL,
ADD COLUMN     "excludeStatus" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "nombreTubo" TEXT NOT NULL;

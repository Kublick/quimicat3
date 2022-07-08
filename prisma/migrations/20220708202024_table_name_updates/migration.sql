/*
  Warnings:

  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Sucursal` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Sucursal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "name",
ADD COLUMN     "nombre" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sucursal" DROP COLUMN "name",
ADD COLUMN     "nombre" TEXT NOT NULL;

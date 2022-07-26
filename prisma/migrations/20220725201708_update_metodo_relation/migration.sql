/*
  Warnings:

  - You are about to drop the column `perfilId` on the `Metodo` table. All the data in the column will be lost.
  - Added the required column `metodoId` to the `Perfil` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Metodo" DROP CONSTRAINT "Metodo_perfilId_fkey";

-- AlterTable
ALTER TABLE "Metodo" DROP COLUMN "perfilId";

-- AlterTable
ALTER TABLE "Perfil" ADD COLUMN     "metodoId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Perfil" ADD CONSTRAINT "Perfil_metodoId_fkey" FOREIGN KEY ("metodoId") REFERENCES "Metodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the column `name` on the `Items` table. All the data in the column will be lost.
  - You are about to drop the column `tipo` on the `Items` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Items" DROP COLUMN "name",
DROP COLUMN "tipo";

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_pruebaId_fkey" FOREIGN KEY ("pruebaId") REFERENCES "Prueba"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "Perfil"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_paqueteId_fkey" FOREIGN KEY ("paqueteId") REFERENCES "Paquete"("id") ON DELETE SET NULL ON UPDATE CASCADE;

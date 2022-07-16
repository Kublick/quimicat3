/*
  Warnings:

  - You are about to drop the column `pruebaId` on the `Metodo` table. All the data in the column will be lost.
  - You are about to drop the column `departamento` on the `Prueba` table. All the data in the column will be lost.
  - You are about to drop the column `muestra` on the `Prueba` table. All the data in the column will be lost.
  - Added the required column `departamentoId` to the `Prueba` table without a default value. This is not possible if the table is not empty.
  - Added the required column `metodoId` to the `Prueba` table without a default value. This is not possible if the table is not empty.
  - Added the required column `muestraId` to the `Prueba` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Metodo" DROP CONSTRAINT "Metodo_pruebaId_fkey";

-- AlterTable
ALTER TABLE "Metodo" DROP COLUMN "pruebaId";

-- AlterTable
ALTER TABLE "Prueba" DROP COLUMN "departamento",
DROP COLUMN "muestra",
ADD COLUMN     "departamentoId" TEXT NOT NULL,
ADD COLUMN     "metodoId" TEXT NOT NULL,
ADD COLUMN     "muestraId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Prueba" ADD CONSTRAINT "Prueba_departamentoId_fkey" FOREIGN KEY ("departamentoId") REFERENCES "Departamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prueba" ADD CONSTRAINT "Prueba_muestraId_fkey" FOREIGN KEY ("muestraId") REFERENCES "Muestra"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prueba" ADD CONSTRAINT "Prueba_metodoId_fkey" FOREIGN KEY ("metodoId") REFERENCES "Metodo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

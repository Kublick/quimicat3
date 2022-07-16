/*
  Warnings:

  - Added the required column `pruebaId` to the `Metodo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Metodo" ADD COLUMN     "pruebaId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Prueba" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "abreviatura" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "hojaTrabajo" TEXT NOT NULL,
    "departamento" TEXT NOT NULL,
    "muestra" TEXT NOT NULL,
    "printMetodo" TEXT NOT NULL,
    "formula" TEXT NOT NULL,
    "printBold" TEXT NOT NULL,
    "unidades" TEXT NOT NULL,
    "sexo" TEXT NOT NULL,
    "tipoResultado" TEXT NOT NULL,
    "resultadoDefault" TEXT NOT NULL,
    "valorTipo" TEXT NOT NULL,
    "decimales" INTEGER NOT NULL,
    "indicaciones" TEXT NOT NULL,
    "notas" TEXT NOT NULL,
    "printNotas" TEXT NOT NULL,
    "notasInternas" TEXT NOT NULL,
    "tipoValorNormalidad" TEXT NOT NULL,
    "valorNormalidadTexto" TEXT NOT NULL,
    "valoresRangos" TEXT[],
    "ventaIndividual" BOOLEAN NOT NULL,
    "permitirAntibiograma" BOOLEAN NOT NULL,

    CONSTRAINT "Prueba_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Metodo" ADD CONSTRAINT "Metodo_pruebaId_fkey" FOREIGN KEY ("pruebaId") REFERENCES "Prueba"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

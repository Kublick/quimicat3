-- AlterTable
ALTER TABLE "Metodo" ADD COLUMN     "perfilId" TEXT;

-- CreateTable
CREATE TABLE "Perfil" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "abreviatura" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "ventaIndividual" BOOLEAN NOT NULL DEFAULT false,
    "sexo" TEXT NOT NULL,
    "notas" TEXT NOT NULL,
    "notasInternas" TEXT NOT NULL,
    "alineacion" TEXT NOT NULL,

    CONSTRAINT "Perfil_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Metodo" ADD CONSTRAINT "Metodo_perfilId_fkey" FOREIGN KEY ("perfilId") REFERENCES "Perfil"("id") ON DELETE SET NULL ON UPDATE CASCADE;

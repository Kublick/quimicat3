/*
  Warnings:

  - A unique constraint covering the columns `[clave]` on the table `Paciente` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Orden" (
    "id" TEXT NOT NULL,
    "orderGeneratorId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "medicoId" TEXT NOT NULL,
    "tarifaId" TEXT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL,

    CONSTRAINT "Orden_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderGenerator" (
    "id" TEXT NOT NULL,
    "sucId" TEXT NOT NULL,
    "consec" SERIAL NOT NULL,

    CONSTRAINT "OrderGenerator_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_clave_key" ON "Paciente"("clave");

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_orderGeneratorId_fkey" FOREIGN KEY ("orderGeneratorId") REFERENCES "OrderGenerator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_medicoId_fkey" FOREIGN KEY ("medicoId") REFERENCES "Medico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orden" ADD CONSTRAINT "Orden_tarifaId_fkey" FOREIGN KEY ("tarifaId") REFERENCES "Tarifa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

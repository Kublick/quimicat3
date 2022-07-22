-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "abreviatura" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefono" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "rfc" TEXT NOT NULL,
    "tarifaId" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_tarifaId_fkey" FOREIGN KEY ("tarifaId") REFERENCES "Tarifa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

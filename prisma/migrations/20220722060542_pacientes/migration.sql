-- CreateTable
CREATE TABLE "Paciente" (
    "id" TEXT NOT NULL,
    "clave" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellidos" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "fechaNacimiento" TIMESTAMP(3) NOT NULL,
    "celular" TEXT NOT NULL,
    "emailResultados" TEXT NOT NULL,
    "direccion" TEXT NOT NULL,
    "comenatarios" TEXT,
    "tutor" TEXT,
    "clienteId" TEXT NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

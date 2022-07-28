-- CreateTable
CREATE TABLE "Paquete" (
    "id" TEXT NOT NULL,
    "abreviatura" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "indicaciones" TEXT NOT NULL,
    "notasInternas" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paquete_pkey" PRIMARY KEY ("id")
);

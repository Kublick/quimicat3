-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ItemsTarifa" (
    "id" TEXT NOT NULL,
    "tarifaId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ItemsTarifa_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ItemsTarifa" ADD CONSTRAINT "ItemsTarifa_tarifaId_fkey" FOREIGN KEY ("tarifaId") REFERENCES "Tarifa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ItemsTarifa" ADD CONSTRAINT "ItemsTarifa_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

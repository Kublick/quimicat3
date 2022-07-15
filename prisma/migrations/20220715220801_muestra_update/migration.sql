-- AlterTable
ALTER TABLE "Muestra" ADD COLUMN     "observaciones" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "startAsPending" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'usuario',
ALTER COLUMN "status" SET DEFAULT 'activo';

/*
  Warnings:

  - You are about to drop the column `specifications` on the `gearItems` table. All the data in the column will be lost.
  - You are about to drop the `rentalOrderss` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_rentalOrderId_fkey";

-- DropForeignKey
ALTER TABLE "rentalOrderss" DROP CONSTRAINT "rentalOrderss_customerId_fkey";

-- DropForeignKey
ALTER TABLE "rentalOrderss" DROP CONSTRAINT "rentalOrderss_gearId_fkey";

-- AlterTable
ALTER TABLE "gearItems" DROP COLUMN "specifications",
ADD COLUMN     "specification" TEXT;

-- DropTable
DROP TABLE "rentalOrderss";

-- CreateTable
CREATE TABLE "rentalOrders" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "gearId" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "returnedAt" TIMESTAMP(3),
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "totalPrice" DOUBLE PRECISION NOT NULL,
    "status" "RentalStatus" NOT NULL DEFAULT 'PLACED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rentalOrders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rentalOrders_customerId_idx" ON "rentalOrders"("customerId");

-- CreateIndex
CREATE INDEX "rentalOrders_gearId_idx" ON "rentalOrders"("gearId");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_rentalOrderId_fkey" FOREIGN KEY ("rentalOrderId") REFERENCES "rentalOrders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentalOrders" ADD CONSTRAINT "rentalOrders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentalOrders" ADD CONSTRAINT "rentalOrders_gearId_fkey" FOREIGN KEY ("gearId") REFERENCES "gearItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

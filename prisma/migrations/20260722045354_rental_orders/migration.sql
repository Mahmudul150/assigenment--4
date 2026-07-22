/*
  Warnings:

  - You are about to drop the `rentalOrders` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_rentalOrderId_fkey";

-- DropForeignKey
ALTER TABLE "rentalOrders" DROP CONSTRAINT "rentalOrders_customerId_fkey";

-- DropForeignKey
ALTER TABLE "rentalOrders" DROP CONSTRAINT "rentalOrders_gearId_fkey";

-- DropTable
DROP TABLE "rentalOrders";

-- CreateTable
CREATE TABLE "rentalOrderss" (
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

    CONSTRAINT "rentalOrderss_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "rentalOrderss_customerId_idx" ON "rentalOrderss"("customerId");

-- CreateIndex
CREATE INDEX "rentalOrderss_gearId_idx" ON "rentalOrderss"("gearId");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_rentalOrderId_fkey" FOREIGN KEY ("rentalOrderId") REFERENCES "rentalOrderss"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentalOrderss" ADD CONSTRAINT "rentalOrderss_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rentalOrderss" ADD CONSTRAINT "rentalOrderss_gearId_fkey" FOREIGN KEY ("gearId") REFERENCES "gearItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

import { prisma } from "../../lib/prisma";
import { TCreateRental} from "./rental.interface";

const createRental = async (payload: TCreateRental, customerId: string) => {
  const gear = await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: payload.gearId,
    },
  });

  if (!gear.isAvailable) {
    throw new Error("Gear is not available");
  }

  if (gear.stock < payload.quantity) {
    throw new Error("Not enough stock");
  }
  const start = new Date(payload.startDate);
  const end = new Date(payload.endDate);

  const startTime = start.getTime()
  const endTime = end.getTime()

  const rentalDays  = Math.ceil(
    (endTime - startTime) / (1000 * 60 * 60 * 24),
  );

  if (rentalDays  <= 0) {
    throw new Error("Invalid rental dates");
  }

  const totalPrice = rentalDays  * gear.pricePerDay * payload.quantity;

  const rental = await prisma.rentalOrder.create({
    data: {
      customerId,
      gearId: payload.gearId,
      startDate: start,
      endDate: end,
      quantity: payload.quantity,
      totalPrice,
    },
    include:{
        gear:{
            select:{
                id:true,
                name:true,
                pricePerDay:true,
                stock:true
            }
        }
    }
  });

  return rental;
};

const getAllRentals = async () => {
  const rentals = await prisma.rentalOrder.findMany({
    include: {
      gear:true,
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return rentals;
};

const getRentalById = async (rentalId:string) => {
        const rental = await prisma.rentalOrder.findUnique({
            where:{
                id:rentalId
            }
        })

        return rental
};

export const rentalService = {
  createRental,
  getAllRentals,
  getRentalById,
};

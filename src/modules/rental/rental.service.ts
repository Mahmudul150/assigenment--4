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

  // const rental = await prisma.rentalOrder.create({
  //   data: {
  //     customerId,
  //     gearId: payload.gearId,
  //     startDate: start,
  //     endDate: end,
  //     quantity: payload.quantity,
  //     totalPrice,
  //   },
  //   include:{
  //       gear:{
  //           select:{
  //               id:true,
  //               name:true,
  //               pricePerDay:true,
  //               stock:true
  //           }
  //       }
  //   }
  // });


 const rental = await prisma.$transaction(async (tx) => {
    const createdRental = await tx.rentalOrder.create({
      data: {
        customerId,
        gearId: payload.gearId,
        startDate: start,
        endDate: end,
        quantity: payload.quantity,
        totalPrice,
      },
      include: {
        gear: {
          select: {
            id: true,
            name: true,
            pricePerDay: true,
            stock: true,
          },
        },
      },
    });

    const updatedGear = await tx.gearItem.update({
      where: {
        id: payload.gearId,
      },
      data: {
        stock: {
          decrement: payload.quantity,
        },
      },
    });

    // Stock 0 হলে availability false করে দাও
    if (updatedGear.stock === 0) {
      await tx.gearItem.update({
        where: {
          id: payload.gearId,
        },
        data: {
          isAvailable: false,
        },
      });
    }

    return createdRental;
  });

  return rental;
}; 

const getAllRentals = async (customerId:string) => {
  const rentals = await prisma.rentalOrder.findMany({
    where: {
      customerId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return rentals;
};

const getRentalById = async (rentalId:string, customerId:string) => {
        const rental = await prisma.rentalOrder.findUnique({
            where:{
                id:rentalId,
                customerId
            },
            include: {
                gear: true,
               payment: true,
                    },
        })

        return rental
};

export const rentalService = {
  createRental,
  getAllRentals,
  getRentalById,
};

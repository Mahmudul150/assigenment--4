import { RentalStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";
import { IGearItem, TUpdateGear } from "../gear/gear.interface";

const providerCreateGear = async(providerId:string , payload:IGearItem)=>{
    const categoryExists = await prisma.category.findUnique({
    where: { id: payload.categoryId }
  });

  if (!categoryExists) {
    throw new Error("Invalid Category ID");
  }

  const gearData = await prisma.gearItem.create({
    data: {
    name: payload.name,
    description: payload.description,
    brand: payload.brand,
    pricePerDay: payload.pricePerDay,
    stock: payload.stock,
    condition: payload.condition,
    image: payload.image,
    specifications: payload.specifications,
    categoryId: payload.categoryId,
    providerId:providerId,
    }
  });


  return gearData
}

const ProviderUpdateGear = async(gearId:string,payload:TUpdateGear,providerId: string,)=>{
  const gear =  await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: gearId,
    },
  });

    if (gear.providerId !== providerId) {
    throw new Error("You are not authorized to update this gear");
  }

  if (payload.categoryId) {
    await prisma.category.findUniqueOrThrow({
      where: {
        id: payload.categoryId,
      },
    });
  }

  const updatedGear = await prisma.gearItem.update({
    where: {
      id: gearId,
    },
    data: payload,
  });

  return updatedGear;
}


const ProviderDeleteGear = async(gearId:string,providerId:string)=>{
    const gear = await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: gearId,
    },
  });

    if (gear.providerId !== providerId) {
    throw new Error("FORBIDDEN! , You are not authorized to delete this gear"
    );
  }

  const deletedGear = await prisma.gearItem.delete({
    where: {
      id: gearId,
    },
  });

  return deletedGear
}


const ProviderGetOrders = async (providerId: string) => {
  const orders = await prisma.rentalOrder.findMany({
    where: {
      gear: {
        providerId,
      },
    },
    include: {
      customer: {
        omit: {
          password: true,
        },
      },
      gear: true,
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return orders;
};


const providerUpdateOrderStatus = async (orderId: string,providerId:string,status: RentalStatus) => {
  const order = await prisma.rentalOrder.findUniqueOrThrow({
    where: {
      id: orderId,
    },
     include: {
      gear: true,
    },
  });


  if (order.gear.providerId !== providerId) {
    throw new Error("You are not authorized to update this order");
  }

 const result = await prisma.$transaction(async (tx) => {
    const updateData: any = {
      status,
    };

   
    if (status === RentalStatus.RETURNED) {
      updateData.returnedAt = new Date();
    }

    const updatedOrder = await tx.rentalOrder.update({
      where: {
        id: orderId,
      },
      data: updateData,
      include: {
        customer: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        gear: {
          select: {
            id: true,
            name: true,
            brand: true,
            pricePerDay: true,
            stock: true,
            isAvailable: true,
          },
        },
      },
    });

  
    if (status === RentalStatus.RETURNED) {
      await tx.gearItem.update({
        where: {
          id: order.gearId,
        },
        data: {
          stock: {
            increment: order.quantity,
          },
          isAvailable: true,
        },
      });
    }

    return updatedOrder;
  });

  return result;

};


export const providerService = {
    providerCreateGear,
    ProviderUpdateGear,
    ProviderDeleteGear,
    ProviderGetOrders,
    providerUpdateOrderStatus
}
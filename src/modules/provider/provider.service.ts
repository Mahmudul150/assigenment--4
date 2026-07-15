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

const ProviderUpdateGear = async(gearId:string,payload:TUpdateGear)=>{
    await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: gearId,
    },
  });

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


const ProviderDeleteGear = async(gearId:string)=>{
    const gear = await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: gearId,
    },
  });


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


const providerUpdateOrderStatus = async (orderId: string,status: RentalStatus) => {
  const order = await prisma.rentalOrder.findUniqueOrThrow({
    where: {
      id: orderId,
    },
  });

  const updatedOrder = await prisma.rentalOrder.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
    include: {
      customer: {
        select:{
            id:true,
            name:true,
            email:true
        }
      },
      gear: {
        select:{
            id:true,
            name:true,
            brand:true,
            pricePerDay:true,
            stock:true
        }
      },
    //   payment: true,
    },
  });

  return updatedOrder;
};


export const providerService = {
    providerCreateGear,
    ProviderUpdateGear,
    ProviderDeleteGear,
    ProviderGetOrders,
    providerUpdateOrderStatus
}
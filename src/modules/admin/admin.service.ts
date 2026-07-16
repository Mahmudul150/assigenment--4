import { prisma } from "../../lib/prisma";
import { TUpdateUserStatus } from "./admin.interface";

const getAllUsers = async () => {
  return await prisma.user.findMany({
    omit: {
      password: true,
    },
  });
};

const updateUserStatus = async (id: string, payload: TUpdateUserStatus) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id,
    },
  });

   if (
    payload.status !== "ACTIVE" &&
    payload.status !== "SUSPENDED"
  ) {
    throw new Error("Invalid user status");
  }

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      status: payload.status,
    },
    omit: {
      password: true,
    },
  });

  return user;
};

const getAllGear = async () => {
  return await prisma.gearItem.findMany({
    include: {
      provider: {
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
        },
      },
      category: {
        select: {
          id: true,
          name: true,
          description: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getAllRentals = async () => {
  return await prisma.rentalOrder.findMany({
    include: {
      customer: true,
      gear: true,
      payment: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const adminService = {
  getAllUsers,
  updateUserStatus,
  getAllGear,
  getAllRentals,
};

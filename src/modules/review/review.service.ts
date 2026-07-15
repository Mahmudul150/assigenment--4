import { prisma } from "../../lib/prisma";
import { TReview } from "./review.interface";

const reViewsCreate = async (customerId: string, payload: TReview) => {
  const { gearId, rating, comment } = payload;

  await prisma.gearItem.findUniqueOrThrow({
    where: {
      id: gearId,
    },
  });

   if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const rental = await prisma.rentalOrder.findFirst({
    where: {
      customerId,
      gearId,
      status: "RETURNED",
    },
  });

  if (!rental) {
    throw new Error("You can review only after returning this gear.");
  }

  const existingReview = await prisma.review.findFirst({
    where: {
      customerId,
      gearId,
    },
  });

  if (existingReview) {
    throw new Error("You already reviewed this gear.");
  }

  const review = await prisma.review.create({
    data: {
      customerId,
      gearId,
      rating,
      comment,
    },
  });

  return review;
};

const getReview = async () => {
  const reviews = await prisma.review.findMany({
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
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return reviews;
};

export const reviewService = {
  reViewsCreate,
  getReview,
};

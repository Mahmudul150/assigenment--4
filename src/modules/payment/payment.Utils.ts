import Stripe from "stripe";
import { prisma } from "../../lib/prisma";

export const handleCheckoutCompleted = async (
  session: Stripe.Checkout.Session
) => {
console.log("session get",session)
  const rentalOrderId = session.metadata?.rentalOrderId;

  if (!rentalOrderId) {
    throw new Error("Rental Order ID Missing");
  }

  await prisma.payment.update({
    where: {
      transactionId: session.id
    },
    data: {
      status: "COMPLETED",
      paidAt: new Date(),
    },
  });

  await prisma.rentalOrder.update({
    where: {
      id: rentalOrderId,
    },
    data: {
      status: "PAID",
    },
  });
};


export const handlePaymentFailed = async (
  paymentIntent: Stripe.PaymentIntent
) => {
    console.log('payment get:',paymentIntent)
  await prisma.payment.update({
    where: {
      transactionId: paymentIntent.id,
    },
    data: {
      status: "FAILED",
    },
  });

};
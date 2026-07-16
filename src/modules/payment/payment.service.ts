import { PaymentMethod, PaymentStatus } from "../../../generated/prisma/enums";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import stripe from "../../lib/stripe";
import { handleCheckoutCompleted, handlePaymentFailed } from "./payment.Utils";

const createPayment = async (customerId: string, rentalId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const rental = await tx.rentalOrder.findUniqueOrThrow({
      where: {
        id: rentalId,
      },
      include: {
        gear: true,
        payment: true,
      },
    });

    if (rental.customerId !== customerId) {
      throw new Error("Unauthorized");
    }

    if (rental.payment) {
      throw new Error("Payment already exists");
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "BDT",
            product_data: {
              name: rental.gear.name,
            },
            unit_amount: rental.totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `${config.app_url}/payment?success=true`,
      cancel_url: `${config.app_url}/payment?success=false`,
      metadata: {
        rentalOrderId: rental.id,
      },
    });


   const payment = await tx.payment.create({
      data: {
        transactionId: session.id,
        rentalOrderId: rental.id,
        amount: rental.totalPrice,
        provider: PaymentMethod.STRIPE,
        status: PaymentStatus.PENDING,
      },
    });

    return  session.url
  });
  return {
    paymentUrl: transactionResult,
  };
};

const confirmPayment = async (payload:Buffer , signature:string)=>{
   const endpointSecret = config.stripe_webhook_secret;

  const event = stripe.webhooks.constructEvent(
    payload,
    signature,
    endpointSecret
  );

switch (event.type) {

    case "checkout.session.completed":

      await handleCheckoutCompleted(
        event.data.object  
      );

      break;

    case "payment_intent.payment_failed":

      await handlePaymentFailed(
        event.data.object 
      );

      break;

    default:
      console.log(event.type);
  }


}


const getPaymentHistory = async (
  customerId: string
) => {

  return prisma.payment.findMany({

    where: {
      rentalOrder: {
        customerId,
      },
    },

    include: {
      rentalOrder: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

};




const getPaymentDetails = async (
  paymentId: string,
  customerId: string
) => {

  return prisma.payment.findFirstOrThrow({

    where: {
      id: paymentId,
      rentalOrder: {
        customerId,
      },
    },

    include: {
      rentalOrder: true,
    },
  });

};


export const paymentService = {
  createPayment,
  confirmPayment,
  getPaymentDetails,
  getPaymentHistory
};

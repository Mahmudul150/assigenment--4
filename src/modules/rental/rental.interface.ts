import { RentalStatus } from "../../../generated/prisma/enums";

export type TCreateRental = {
  gearId: string;
  startDate: Date;
  endDate: Date;
  quantity: number;
};


export type TRentalQuery = {
  status?: RentalStatus;
  customerId?: string;
  gearId?: string;
};



export type TUpdateRental = {
  status?: RentalStatus;
  returnedAt?: Date;
};
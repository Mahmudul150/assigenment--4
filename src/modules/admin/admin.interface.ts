import { UserStatus } from "../../../generated/prisma/enums";

export type TUpdateUserStatus = {
  status: UserStatus;
};
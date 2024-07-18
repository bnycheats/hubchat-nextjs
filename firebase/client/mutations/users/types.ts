import { type UserDetailsType } from "@/helpers/types";

export type UpdateUserPayloadType = {
  userId: string;
  payload: Partial<UserDetailsType>;
};

import { type User } from "firebase/auth";
import { type UserDetailsType } from "@/helpers/types";

export type LoginPayloadType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ForgotPasswordPayloadType = {
  email: string;
};

export type ChangePasswordPayloadType = {
  user: User;
  newPassword: string;
};

export type UpdateUserProfilePayloadType = {
  user: User;
  displayName: string;
};

export type CreateUserPayloadType = {
  email: string;
  payload: Partial<UserDetailsType>;
};

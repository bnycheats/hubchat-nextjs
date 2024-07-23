import { type User } from "firebase/auth";
import { RolesEnums } from "@/helpers/types";

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

export type UpdateDisplayNamePayloadType = {
  user: User;
  displayName: string;
};

export type CreateUserPayloadType = {
  email: string;
  payload: {
    first_name: string;
    last_name: string;
    dob: number;
    phone_number: string;
    province: string;
    street: string;
    postal_code: string;
    role: Array<RolesEnums>;
  };
};

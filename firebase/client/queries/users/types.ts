import { RolesEnums } from "@/helpers/types";

export type GetUserPayloadType = {
  userId: string;
};

export type GetUserDetailsResponseType = {
  email: string;
  creation_date: number;
  first_name: string;
  last_name: string;
  dob: number;
  phone_number: string;
  province: string;
  status: boolean;
  street: string;
  postal_code: string;
  role: Array<RolesEnums>;
  companies: Array<string>;
};

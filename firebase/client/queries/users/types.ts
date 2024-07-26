import { RolesEnums } from '@/helpers/types';

export type GetUserPayloadType = {
  userId: string;
};

export type GetUserDetailsResponseType = {
  uid: string;
  email: string;
  created_at: number;
  updated_at: number;
  first_name: string;
  last_name: string;
  dob: number;
  phone_number: string;
  province: string;
  status: boolean;
  street: string;
  postal_code: string;
  role: Array<RolesEnums>;
  active: boolean;
};

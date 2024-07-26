import { RolesEnums } from '@/helpers/types';

export type UpdateUserPayloadType = {
  userId: string;
  payload: Partial<{
    email: string;
    first_name: string;
    last_name: string;
    dob: number;
    phone_number: string;
    province: string;
    street: string;
    postal_code: string;
    role: Array<RolesEnums>;
    companies: Array<string>;
  }>;
};

export type DisableUserPayloadType = {
  userId: string;
};

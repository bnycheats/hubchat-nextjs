export type UserDetailsType = {
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
};

export type UserDetailsFormValues = {
  email: string;
  first_name: string;
  last_name: string;
  dob: Date;
  role: Array<string>;
  phone_number: string;
  street: string;
  province: string;
  postal_code: string;
  companies: Array<string>;
};

export enum RolesEnums {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  CHATTER = "CHATTER",
  HR = "HR",
}

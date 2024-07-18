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

export enum RolesEnums {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  CHATTER = "CHATTER",
  HR = "HR",
}

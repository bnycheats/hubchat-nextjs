export type CreateAccountPayloadType = {
  user_id: string;
  company_id: string;
  currency: string;
  account_name: string;
  commission_rate: string;
  expenses_rate: string;
  over_time_rate: string;
  per_hour_rate: string;
  per_day_rate: string;
  per_month_rate: string;
  role: string;
};

export type UpdateAccountPayloadType = {
  account_id: string;
  payload: {
    company_id: string;
    currency: string;
    account_name: string;
    commission_rate: string;
    expenses_rate: string;
    over_time_rate: string;
    per_hour_rate: string;
    per_day_rate: string;
    per_month_rate: string;
    role: string;
  };
};

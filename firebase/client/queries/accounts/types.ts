export type GetAccountPayloadType = {
  account_id: string;
};

export type GetAccountResponseType = {
  created_at: number;
  updated_at: number;
  account_id: string;
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
  active: boolean;
};

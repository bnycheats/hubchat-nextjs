import { type GetCompanyResponse } from '@/firebase/client/queries/companies/types';
import convertToAmount from '@/utils/convertToAmount';

function CompanyDetails(props: GetCompanyResponse) {
  return (
    <div className="border-b pb-4">
      <small>Company Reference</small>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="flex gap-2">
          <div>Company name:</div>
          <div className="underline">{props?.company_name}</div>
        </div>
        <div className="flex gap-2">
          <div>Currency:</div>
          <div className="underline">{props?.currency}</div>
        </div>
        <div className="flex gap-2">
          <div>Owner name:</div>
          <div className="underline">{props?.owner_name}</div>
        </div>
        <div className="flex gap-2">
          <div>Commission rate:</div>
          <div className="underline">{`${props?.commission_rate && props?.commission_rate}%`}</div>
        </div>
        <div className="flex gap-2">
          <div>Over time rate:</div>
          <div className="underline">{`${props?.over_time_rate && props?.over_time_rate}%`}</div>
        </div>
        <div className="flex gap-2">
          <div>Per hour rate:</div>
          <div className="underline">
            {props?.per_hour_rate &&
              Intl.NumberFormat('en', {
                style: 'currency',
                currency: props?.currency,
              }).format(convertToAmount(Number(props.per_hour_rate)))}
          </div>
        </div>
        <div className="flex gap-2">
          <div>Per day rate:</div>
          <div className="underline">
            {props?.per_day_rate &&
              Intl.NumberFormat('en', {
                style: 'currency',
                currency: props?.currency,
              }).format(convertToAmount(Number(props.per_day_rate)))}
          </div>
        </div>
        <div className="flex gap-2">
          <div>Per month rate:</div>
          <div className="underline">
            {props?.per_month_rate &&
              Intl.NumberFormat('en', {
                style: 'currency',
                currency: props?.currency,
              }).format(convertToAmount(Number(props.per_month_rate)))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;

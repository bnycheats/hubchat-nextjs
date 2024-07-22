import { type GetCompanyResponse } from "@/firebase/client/queries/companies/types";

function CompanyDetailsSection(props: GetCompanyResponse) {
  return (
    <section className="border-b pb-4">
      {props?.company_name && (
        <h1 className="text-2xl">{props.company_name}</h1>
      )}
      <div className="pb-4">
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="flex gap-2">
            <div>Owner name:</div>
            <div className="font-semibold">{props?.owner_name}</div>
          </div>
          <div className="flex gap-2">
            <div>Currency:</div>
            <div className="font-semibold">{props?.currency}</div>
          </div>
          <div className="flex gap-2">
            <div>Commission rate:</div>
            <div className="font-semibold">{props?.commission_rate}</div>
          </div>
          {props?.per_hour_rate && (
            <div className="flex gap-2">
              <div>Per hour rate:</div>
              <div className="font-semibold">{props?.per_hour_rate}</div>
            </div>
          )}
          {props?.per_day_rate && (
            <div className="flex gap-2">
              <div>Per day rate:</div>
              <div className="font-semibold">{props?.per_day_rate}</div>
            </div>
          )}
          {props?.per_month_rate && (
            <div className="flex gap-2">
              <div>Per month rate:</div>
              <div className="font-semibold">{props?.per_month_rate}</div>
            </div>
          )}
          {props?.over_time_rate && (
            <div className="flex gap-2">
              <div>Over time rate:</div>
              <div className="font-semibold">{props?.over_time_rate}</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default CompanyDetailsSection;

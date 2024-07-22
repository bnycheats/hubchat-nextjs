"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import CompanyDetailsSection from "./_components/comany-details-section";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useUser from "../_hooks/useUser";
import JobForm from "./_components/job-form";

export default function UserJobsPage() {
  const { user, companies } = useUser();

  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(
    user.companies[0]
  );

  const company = useMemo(() => {
    return companies.find((item) => item.id === selectedCompanyId);
  }, [selectedCompanyId, companies]);

  return (
    <section>
      {user && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl">{`${user.first_name} ${user.last_name}`}</h2>
          <Select
            value={selectedCompanyId}
            onValueChange={setSelectedCompanyId}
          >
            <SelectTrigger className="w-[280px]">
              <SelectValue placeholder="Select company" />
            </SelectTrigger>
            <SelectContent>
              {companies
                ?.filter((item) => user.companies.includes(item.id))
                ?.map((item, index) => (
                  <SelectItem key={index} value={item.id}>
                    {item.company_name}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      )}
      <Card className="p-4">
        {company && <CompanyDetailsSection {...company} />}
        <JobForm />
      </Card>
    </section>
  );
}

import { getCompanies } from "@/firebase/client/queries/companies";
import { getUser } from "@/firebase/client/queries/users";
import { notFound } from "next/navigation";
import CompanyDetailsSection from "./_components/comany-details-section";
import { Card } from "@/components/ui/card";
// import JobForm from "./_components/job-form";

export default async function UserJobsPage({ params }: UserJobsPageProps) {
  try {
    const user = await getUser({ userId: params.uid });
    const companies = await getCompanies();
    return (
      <section>
        {user && (
          <h2 className="text-3xl mb-6">{`${user.first_name} ${user.last_name}`}</h2>
        )}
        {companies?.map((company, index) => {
          return (
            <Card className="p-4" key={index}>
              <CompanyDetailsSection {...company} />
              {/* <JobForm /> */}
            </Card>
          );
        })}
      </section>
    );
  } catch (e) {
    notFound();
  }
}

type UserJobsPageProps = {
  params: {
    uid: string;
  };
};

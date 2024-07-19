import UpdateUserForm from "./_components/update-user-form";
import { getUser } from "@/firebase/client/queries/users";
import { getCompanies } from "@/firebase/client/queries/companies";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiOutlineEye } from "react-icons/ai";

export default async function UpdateUserPage({ params }: UserPageProps) {
  try {
    const user = await getUser({ userId: params.uid });
    const companies = await getCompanies();
    return (
      <section>
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-3xl">User Details</h2>
          <Link href={`/users/${params.uid}/jobs`}>
            <Button className="rounded-full" variant="secondary" size="sm">
              <AiOutlineEye /> Jobs
            </Button>
          </Link>
        </div>
        <UpdateUserForm user={user} companies={companies} />
      </section>
    );
  } catch (e) {
    notFound();
  }
}

type UserPageProps = {
  params: {
    uid: string;
  };
};

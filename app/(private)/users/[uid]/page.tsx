import UpdateUserForm from "./_components/update-user-form";
import { getUser } from "@/firebase/client/queries/auth";
import { getCompanies } from "@/firebase/client/queries/companies";
import { notFound } from "next/navigation";

export default async function UpdateUserPage({ params }: UserPageProps) {
  try {
    const user = await getUser({ userId: params.uid });
    const companies = await getCompanies();
    return <UpdateUserForm user={user} companies={companies} />;
  } catch (e) {
    notFound();
  }
}

type UserPageProps = {
  params: {
    uid: string;
  };
};

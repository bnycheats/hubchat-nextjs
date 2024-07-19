import CreateUserForm from "./_components/create-user-form";
import { getCompanies } from "@/firebase/client/queries/companies";
import { notFound } from "next/navigation";

export default async function CreateUserPage() {
  try {
    const companies = await getCompanies();
    return <CreateUserForm companies={companies} />;
  } catch (e) {
    notFound();
  }
}

import CreateUserForm from "./_components/create-user-form";
import { getCompanies } from "@/firebase/client/queries/companies";
import { notFound } from "next/navigation";

export default async function CreateUserPage() {
  try {
    const companies = await getCompanies();
    return (
      <section>
        <h2 className="text-3xl">Create User</h2>
        <CreateUserForm companies={companies} />
      </section>
    );
  } catch (e) {
    notFound();
  }
}

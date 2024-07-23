import UpdateUserForm from "./_components/update-user-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiOutlineEye } from "react-icons/ai";

export default function UpdateUserPage({ params }: UpdateUserPageProps) {
  return (
    <section>
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-3xl">User Details</h2>
        <Link href={`/users/${params.uid}/accounts`}>
          <Button className="rounded-full" variant="secondary" size="sm">
            <AiOutlineEye /> View Accounts
          </Button>
        </Link>
      </div>
      <UpdateUserForm />
    </section>
  );
}

type UpdateUserPageProps = {
  params: {
    uid: string;
  };
};

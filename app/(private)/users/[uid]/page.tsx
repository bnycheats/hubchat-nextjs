import UpdateUserForm from "./_components/update-user-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiOutlineEye } from "react-icons/ai";

import { getUser } from "@/firebase/client/queries/users";
import { notFound } from "next/navigation";
import { UserProvider } from "./_context/user-provider";

export default async function UpdateUserPage({ params }: UpdateUserPageProps) {
  try {
    const user = await getUser({ userId: params.uid });
    return (
      <UserProvider user={user} userId={params.uid}>
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
      </UserProvider>
    );
  } catch (e) {
    notFound();
  }
}

type UpdateUserPageProps = {
  params: {
    uid: string;
  };
};

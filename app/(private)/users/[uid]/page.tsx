import UpdateUserForm from "./_components/update-user-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AiOutlineEye } from "react-icons/ai";

export default function UpdateUserPage({ params }: UserPageProps) {
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
      <UpdateUserForm />
    </section>
  );
}

type UserPageProps = {
  params: {
    uid: string;
  };
};

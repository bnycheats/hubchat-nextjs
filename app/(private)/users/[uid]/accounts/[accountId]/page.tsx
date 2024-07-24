import { type PropsWithChildren } from "react";

import UpdateAccountForm from "./_components/update-account-form";
import { notFound } from "next/navigation";
import { getAccount } from "@/firebase/client/queries/accounts";

export default async function UserAccountPage(props: UserAccountProps) {
  try {
    const { params } = props;
    const account = await getAccount({ account_id: params.accountId });
    return (
      <section>
        <h2 className="text-3xl mb-6">Update Account</h2>
        <UpdateAccountForm account={account} accountId={params.accountId} />
      </section>
    );
  } catch (e) {
    notFound();
  }
}

type UserAccountProps = PropsWithChildren & {
  params: {
    accountId: string;
  };
};

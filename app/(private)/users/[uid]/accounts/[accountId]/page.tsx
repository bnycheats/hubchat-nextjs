import UpdateAccountForm from './_components/update-account-form';
import { notFound } from 'next/navigation';
import { getAccount } from '@/firebase/client/queries/accounts';
import DisableButton from './_components/disable-button';

export default async function UserAccountPage(props: UserAccountProps) {
  try {
    const { params } = props;
    const account = await getAccount({ account_id: params.accountId });
    return (
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl">Update Account</h2>
          {account?.active && <DisableButton />}
        </div>
        <UpdateAccountForm account={account} accountId={params.accountId} />
      </section>
    );
  } catch (e) {
    notFound();
  }
}

type UserAccountProps = {
  params: {
    accountId: string;
  };
};

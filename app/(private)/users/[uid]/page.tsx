'use client';

import UpdateUserForm from './_components/update-user-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AiOutlineEye } from 'react-icons/ai';
import DisableButton from './_components/disable-button';
import { useParams } from 'next/navigation';
import useUser from './_hooks/useUser';

export default function UpdateUserPage() {
  const { uid } = useParams<{ uid: string }>();
  const { user } = useUser();
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-3xl">Update User</h2>
          <Link href={`/users/${uid}/accounts`}>
            <Button className="rounded-full" variant="secondary" size="sm">
              <AiOutlineEye /> View Accounts
            </Button>
          </Link>
        </div>
        {user?.active && <DisableButton />}
      </div>
      <UpdateUserForm />
    </section>
  );
}

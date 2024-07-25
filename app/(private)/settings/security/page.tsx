'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import ChangePasswordModal from './_components/change-password-modal';

export default function SecurityPage() {
  const [changePassOpen, setChangePassOpen] = useState(false);
  return (
    <section>
      <ChangePasswordModal open={changePassOpen} closeModal={() => setChangePassOpen(false)} />
      <ul>
        <li className="flex items-center justify-between gap-2">
          <div>
            <h2 className="font-medium">Password</h2>
            <p className="text-sm">Set a unique password to protect your account.</p>
          </div>
          <Button onClick={() => setChangePassOpen(true)} variant="secondary" className="rounded-full text-primary">
            Change Password
          </Button>
        </li>
      </ul>
    </section>
  );
}

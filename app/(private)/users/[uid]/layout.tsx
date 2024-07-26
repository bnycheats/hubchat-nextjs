import { type PropsWithChildren } from 'react';
import { Metadata } from 'next';
import { getUser } from '@/firebase/client/queries/users';
import { notFound } from 'next/navigation';
import { UserProvider } from './_context/user-provider';

/**
 * The Layout is needed to specify the page title and meta tags.
 */
export default async function UserLayout({ children, params }: UserLayoutProps) {
  try {
    const user = await getUser({ userId: params.uid });
    return (
      <UserProvider user={user} userId={params.uid}>
        {children}
      </UserProvider>
    );
  } catch (e) {
    notFound();
  }
}

type UserLayoutProps = PropsWithChildren & {
  params: {
    uid: string;
  };
};

export const metadata: Metadata = {
  title: 'User Details',
  robots: 'noindex',
};

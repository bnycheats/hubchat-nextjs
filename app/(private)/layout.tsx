import { type PropsWithChildren } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getCompanies } from '@/firebase/client/queries/companies';

import { PrivateProvider } from './_context/private-provider';

/**
 * The Layout is needed to specify the page title and meta tags.
 */
export default async function PrivateLayout(props: PropsWithChildren) {
  try {
    const { children } = props;
    const companies = await getCompanies();
    return <PrivateProvider companies={companies}>{children}</PrivateProvider>;
  } catch (e) {
    notFound();
  }
}

export const metadata: Metadata = {
  title: 'User Details',
  robots: 'noindex',
};

import { type PropsWithChildren } from 'react';
import { Metadata } from 'next';

/**
 * The Layout is needed to specify the page title and meta tags.
 */
export default function UserLayout({ children }: PropsWithChildren) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: 'User Details',
  robots: 'noindex',
};

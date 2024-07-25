import { type PropsWithChildren } from 'react';
import { Metadata } from 'next';
/**
 * The Layout is needed to specify the page title and meta tags.
 */
export default function UserAccountLayout(props: UserAccountLayoutProps) {
  const { children } = props;
  return <>{children}</>;
}

type UserAccountLayoutProps = PropsWithChildren;

export const metadata: Metadata = {
  title: 'User Account',
  robots: 'noindex',
};

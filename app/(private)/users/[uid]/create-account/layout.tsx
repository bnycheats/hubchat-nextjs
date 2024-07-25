import { type PropsWithChildren } from 'react';
import { Metadata } from 'next';
/**
 * The Layout is needed to specify the page title and meta tags.
 */
export default function CreateAccountLayout(props: CreateAccountLayoutProps) {
  const { children } = props;
  return <>{children}</>;
}

type CreateAccountLayoutProps = PropsWithChildren;

export const metadata: Metadata = {
  title: 'Create Account',
  robots: 'noindex',
};

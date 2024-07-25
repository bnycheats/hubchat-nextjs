'use client';

import { ReactNode } from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Logo from '@/assets/logo.svg';

import useAuth from '@/hooks/useAuth';
import Spinner from '@/components/spinner';

export default function PublicLayout({ children }: { children: ReactNode }) {
  const { loading, authUser } = useAuth();

  if (loading) return <Spinner centered fullScreen />;

  if (authUser) redirect('/dashboard');

  return (
    <Card className="absolute left-1/2 top-1/4 w-[400px] -translate-x-1/2">
      <CardHeader className="flex items-center">
        <Image src={Logo} width={150} height={150} alt="Logo" />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

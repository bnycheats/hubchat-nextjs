'use client';

import useAuth from '@/hooks/useAuth';
import { redirect } from 'next/navigation';

import Spinner from '@/components/spinner';

export default function Home() {
  const { loading, authUser } = useAuth();
  if (loading) return <Spinner centered fullScreen />;

  if (authUser) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}

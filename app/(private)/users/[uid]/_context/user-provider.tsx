'use client';

import { createContext, type PropsWithChildren } from 'react';
import { type GetUserDetailsResponseType } from '@/firebase/client/queries/users/types';
import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/firebase/client/queries/users';

export const UserContext = createContext<UserContextType>({
  user: {} as GetUserDetailsResponseType,
});

export type UserContextType = {
  user: GetUserDetailsResponseType;
};

export const UserProvider = (props: UserProviderProps) => {
  const { user: initialData, userId, children } = props;

  const { data: user } = useQuery({
    queryKey: ['SpecificUser', userId],
    queryFn: async () => getUser({ userId }),
    initialData,
  });

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

type UserProviderProps = PropsWithChildren & {
  user: GetUserDetailsResponseType;
  userId: string;
};

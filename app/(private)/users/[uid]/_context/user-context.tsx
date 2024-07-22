"use client";

import { createContext, type PropsWithChildren } from "react";
import { type GetUserDetailsResponseType } from "@/firebase/client/queries/users/types";
import { type GetCompanyResponse } from "@/firebase/client/queries/companies/types";

export const UserContext = createContext<UserContextType>({
  user: {} as GetUserDetailsResponseType,
  companies: {} as Array<GetCompanyResponse>,
});

export type UserContextType = {
  user: GetUserDetailsResponseType;
  companies: Array<GetCompanyResponse>;
};

export const UserProvider = (props: UserProviderProps) => {
  const { companies, user, children } = props;
  return (
    <UserContext.Provider value={{ user, companies }}>
      {children}
    </UserContext.Provider>
  );
};

type UserProviderProps = PropsWithChildren & {
  user: GetUserDetailsResponseType;
  companies: Array<GetCompanyResponse>;
};

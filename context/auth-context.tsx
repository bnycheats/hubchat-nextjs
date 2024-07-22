import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { auth } from "@/firebase/client/firebase";
import { getUser } from "@/firebase/client/queries/users";
import { type GetUserDetailsResponseType } from "@/firebase/client/queries/users/types";
import { useQuery } from "@tanstack/react-query";
import { type User } from "firebase/auth";

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = (props: PropsWithChildren) => {
  const [authUserLoading, setAuthUserLoading] = useState(true);
  const [authUser, setAuthUser] = useState<User | null>(null);

  const { data: userDetails, isLoading: userDetailsLoading } = useQuery({
    queryKey: ["User", authUser?.uid],
    queryFn: async () => getUser({ userId: authUser?.uid ?? "" }),
    enabled: !!authUser?.uid,
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthUser(user);
      setAuthUserLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: AuthContextType = {
    loading: authUserLoading || userDetailsLoading,
    authUser,
    userDetails,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export type AuthContextType = {
  loading: boolean;
  authUser: User | null;
  userDetails?: GetUserDetailsResponseType;
};

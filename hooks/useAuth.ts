import { useContext } from "react";
import { AuthContext, type AuthContextType } from "@/context/auth-provider";

export default function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

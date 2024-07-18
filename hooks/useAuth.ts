import { useContext } from "react";
import { AuthContext, type AuthContextType } from "@/context/authContext";

export default function useAuth() {
  return useContext(AuthContext) as AuthContextType;
}

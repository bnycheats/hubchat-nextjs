import { useContext } from "react";
import { UserContext, type UserContextType } from "../_context/user-context";

export default function useUser() {
  return useContext(UserContext) as UserContextType;
}

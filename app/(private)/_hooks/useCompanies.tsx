import { useContext } from "react";
import {
  PrivateContext,
  type PrivateContextType,
} from "../_context/private-provider";

export default function useCompanies() {
  return useContext(PrivateContext) as PrivateContextType;
}

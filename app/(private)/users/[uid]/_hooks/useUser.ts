import { useContext } from 'react';
import { UserContext, type UserContextType } from '../_context/user-provider';

export default function useUser() {
  return useContext(UserContext) as UserContextType;
}

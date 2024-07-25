import {
  browserSessionPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import generatePass from '@/utils/generatePass';

import { type CreateUserPayloadType } from './types';
import { auth } from '../../firebase';
import {
  type ChangePasswordPayloadType,
  type ForgotPasswordPayloadType,
  type LoginPayloadType,
  type UpdateDisplayNamePayloadType,
} from './types';

export function login({ email, password, rememberMe }: LoginPayloadType) {
  if (!rememberMe) {
    setPersistence(auth, browserSessionPersistence);
  }
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

export function forgotPassword({ email }: ForgotPasswordPayloadType) {
  return sendPasswordResetEmail(auth, email);
}

export function changePassword({ user, newPassword }: ChangePasswordPayloadType) {
  return updatePassword(user, newPassword);
}

export function updateUserDisplayName({ user, displayName }: UpdateDisplayNamePayloadType) {
  return updateProfile(user, { displayName });
}

export async function createUser({ email, payload }: CreateUserPayloadType) {
  const response = await fetch('/api/auth/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password: generatePass(),
      displayName: `${payload.first_name} ${payload.last_name}`,
      ...payload,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error);
  }
  return data;
}

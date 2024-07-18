import {
  browserSessionPersistence,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import generatePass from "@/utils/generatePass";

import { type CreateUserPayloadType } from "./types";
import { auth } from "../../firebase";
import {
  type ChangePasswordPayloadType,
  type ForgotPasswordPayloadType,
  type LoginPayloadType,
  type UpdateUserProfilePayloadType,
} from "./types";

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

export function changePassword({
  user,
  newPassword,
}: ChangePasswordPayloadType) {
  return updatePassword(user, newPassword);
}

export function updateUserProfile({
  user,
  displayName,
}: UpdateUserProfilePayloadType) {
  return updateProfile(user, { displayName });
}

export async function createUser({ email, payload }: CreateUserPayloadType) {
  try {
    const res = await fetch("/api/auth/createUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: generatePass(),
        displayName: `${payload.first_name} ${payload.last_name}`,
        ...payload,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

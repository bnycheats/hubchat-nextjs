import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";
import { type UpdateUserPayloadType, type GetUserPayloadType } from "./types";
import { type UserDetailsType } from "@/helpers/types";

export async function updateUser({ userId, payload }: UpdateUserPayloadType) {
  const docRef = doc(db, "Users", userId);
  return await updateDoc(docRef, payload);
}

export async function getUser({ userId }: GetUserPayloadType) {
  const docRef = doc(db, "Users", userId);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as UserDetailsType;
}

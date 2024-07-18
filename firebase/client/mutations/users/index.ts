import generatePass from "@/utils/generatePass";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase";
import { type UpdateUserPayloadType } from "./types";

export async function updateUser({ userId, payload }: UpdateUserPayloadType) {
  const docRef = doc(db, "Users", userId);
  return await updateDoc(docRef, payload);
}

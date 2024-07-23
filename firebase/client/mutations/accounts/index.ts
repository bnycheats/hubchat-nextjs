import { addDoc, collection } from "firebase/firestore";

import { db } from "../../firebase";
import { type CreateAccountPayloadType } from "./types";

export async function createAccount(payload: CreateAccountPayloadType) {
  const docRef = await addDoc(collection(db, "Accounts"), payload);
  return docRef.id;
}

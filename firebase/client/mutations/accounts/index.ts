import { addDoc, doc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';

import { db } from '../../firebase';
import { type CreateAccountPayloadType, type UpdateAccountPayloadType } from './types';

export async function createAccount(payload: CreateAccountPayloadType) {
  const docRef = await addDoc(collection(db, 'Accounts'), {
    ...payload,
    created_at: serverTimestamp(),
    active: true,
  });
  return docRef.id;
}

export async function updateAccount({ account_id, payload }: UpdateAccountPayloadType) {
  const docRef = doc(db, 'Accounts', account_id);
  return await updateDoc(docRef, {
    ...payload,
    updated_at: serverTimestamp(),
  });
}

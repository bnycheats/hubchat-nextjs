import { addDoc, doc, updateDoc, collection, serverTimestamp } from 'firebase/firestore';

import { db } from '../../firebase';
import { type CreateAccountPayloadType, type UpdateAccountPayloadType, type DisableAccountPayloadType } from './types';

export async function createAccount(payload: CreateAccountPayloadType) {
  console.log(payload);
  const docRef = await addDoc(collection(db, 'Accounts'), {
    ...payload,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
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

export async function disableAccount({ account_id }: DisableAccountPayloadType) {
  const docRef = doc(db, 'Accounts', account_id);
  return await updateDoc(docRef, {
    active: false,
    updated_at: serverTimestamp(),
  });
}

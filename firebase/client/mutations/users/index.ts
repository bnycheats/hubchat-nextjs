import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';

import { db } from '../../firebase';
import { type DisableUserPayloadType, type UpdateUserPayloadType } from './types';

export async function updateUser({ userId, payload }: UpdateUserPayloadType) {
  const docRef = doc(db, 'Users', userId);
  return await updateDoc(docRef, {
    ...payload,
    updated_at: serverTimestamp(),
  });
}

export async function disableUser({ userId }: DisableUserPayloadType) {
  const docRef = doc(db, 'Users', userId);
  return await updateDoc(docRef, {
    active: false,
    updated_at: serverTimestamp(),
  });
}

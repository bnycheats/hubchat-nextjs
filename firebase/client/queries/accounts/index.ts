import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../firebase';
import { type GetAccountResponseType, type GetAccountPayloadType } from './types';
import { Timestamp } from 'firebase/firestore';

export async function getAccount({ account_id }: GetAccountPayloadType) {
  const docRef = doc(db, 'Accounts', account_id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const account = docSnap.data();
    if (account.created_at) {
      account.created_at = (account.created_at as unknown as Timestamp).toMillis();
    }
    if (account.updated_at) {
      account.updated_at = (account.updated_at as unknown as Timestamp).toMillis();
    }
    return { account_id: docRef.id, ...account } as GetAccountResponseType;
  } else {
    throw new Error('Account not found!');
  }
}

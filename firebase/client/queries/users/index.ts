import { GetUserDetailsResponseType } from './types';
import { doc, getDoc } from 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';

import { db } from '../../firebase';
import { type GetUserPayloadType } from './types';

export async function getUser({ userId }: GetUserPayloadType) {
  const docRef = doc(db, 'Users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user = docSnap.data() as GetUserDetailsResponseType;
    if (user.created_at) {
      user.created_at = (user.created_at as unknown as Timestamp).toMillis();
    }
    if (user.updated_at) {
      user.updated_at = (user.updated_at as unknown as Timestamp).toMillis();
    }
    return user;
  } else {
    throw new Error('User not found!');
  }
}

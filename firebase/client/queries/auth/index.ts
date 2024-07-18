import { type UserDetailsType } from '@/helpers/types';
import { doc, getDoc } from 'firebase/firestore';

import { db } from '../../firebase';
import { type GetUserPayloadType } from './types';

export async function getUser({ userId }: GetUserPayloadType) {
    const docRef = doc(db, 'Users', userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data() as UserDetailsType;
    } else {
        throw new Error('User not found!');
    }
}

import { collection, getDocs } from 'firebase/firestore';

import { db } from '../../firebase';
import { type GetUserRolesResponse } from './types';

export async function getUserRoles() {
    const querySnapshot = await getDocs(collection(db, 'Roles'));
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as GetUserRolesResponse;
}

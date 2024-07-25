import { collection, getDocs } from 'firebase/firestore';

import { db } from '../../firebase';
import { type GetCompanyResponse } from './types';

export async function getCompanies() {
  const querySnap = await getDocs(collection(db, 'Companies'));
  return querySnap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Array<GetCompanyResponse>;
}

import { create } from 'zustand';
import { UserState, User } from '../types';
import { db } from '../lib/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs,
  updateDoc,
  doc 
} from 'firebase/firestore';

export const useUserStore = create<UserState>((set) => ({
  pendingUsers: [],
  verifiedUsers: [],
  
  fetchPendingUsers: async () => {
    try {
      const q = query(
        collection(db, 'users'), 
        where('isVerified', '==', false),
        where('isAdmin', '==', false)
      );
      const snapshot = await getDocs(q);
      const users = snapshot.docs.map(doc => ({ 
        ...doc.data(), 
        id: doc.id 
      })) as User[];
      set({ pendingUsers: users });
    } catch (error) {
      console.error('Error fetching pending users:', error);
    }
  },

  fetchVerifiedUsers: async () => {
    try {
      const q = query(
        collection(db, 'users'), 
        where('isVerified', '==', true),
        where('isAdmin', '==', false)
      );
      const snapshot = await getDocs(q);
      const users = snapshot.docs.map(doc => ({ 
        ...doc.data(), 
        id: doc.id 
      })) as User[];
      set({ verifiedUsers: users });
    } catch (error) {
      console.error('Error fetching verified users:', error);
    }
  },

  verifyUser: async (userId: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), {
        isVerified: true
      });
      
      set(state => ({
        pendingUsers: state.pendingUsers.filter(user => user.id !== userId),
        verifiedUsers: [...state.verifiedUsers, 
          state.pendingUsers.find(user => user.id === userId)!
        ]
      }));
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  }
}));
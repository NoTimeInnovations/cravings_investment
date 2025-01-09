import { create } from 'zustand';
import { AuthState, User } from '../types';
import { auth, db } from '../lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  error: null,
  login: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;
      
      const userDoc = await getDoc(doc(db, 'users', uid));
      const userData = userDoc.data() as User;
      
      set({ user: userData, error: null });
    } catch (error) {
      set({ error: 'Invalid email or password' });
    }
  },
  signup: async (fullName: string, email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const { uid } = userCredential.user;
      
      const userData = {
        id: uid,
        fullName,
        email,
        isAdmin: false,
        isVerified: false,
        createdAt: new Date().toISOString()
      };

      await setDoc(doc(db, 'users', uid), userData);
      set({ user: userData, error: null });
    } catch (error) {
      set({ error: 'Email already exists or invalid' });
    }
  },
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, error: null });
    } catch (error) {
      set({ error: 'Error signing out' });
    }
  },
  clearError: () => set({ error: null })
}));
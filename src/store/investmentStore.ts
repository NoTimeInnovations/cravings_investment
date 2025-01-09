import { create } from 'zustand';
import { InvestmentState, Investment } from '../types';
import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc,
  doc,
  query,
  where,
  getDocs,
  orderBy
} from 'firebase/firestore';
import { useAuthStore } from './authStore';

export const useInvestmentStore = create<InvestmentState>((set, get) => ({
  investments: [],
  addInvestment: async (amount: number) => {
    try {
      const user = useAuthStore.getState().user;
      if (!user) return;

      const newInvestment = {
        userId: user.id,
        userFullName: user.fullName,
        amount,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'investments'), newInvestment);
      
      set(state => ({
        investments: [...state.investments, { ...newInvestment, id: docRef.id }]
      }));
    } catch (error) {
      console.error('Error adding investment:', error);
    }
  },
  approveInvestment: async (id: string) => {
    try {
      await updateDoc(doc(db, 'investments', id), {
        status: 'approved',
        approvedAt: new Date().toISOString()
      });

      set(state => ({
        investments: state.investments.map(inv =>
          inv.id === id
            ? { ...inv, status: 'approved', approvedAt: new Date().toISOString() }
            : inv
        )
      }));
    } catch (error) {
      console.error('Error approving investment:', error);
    }
  },
  fetchInvestments: async (userId?: string) => {
    try {
      let q;
      if (userId) {
        // For regular users - fetch their own investments
        q = query(
          collection(db, 'investments'), 
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );
      } else {
        // For admin - fetch all investments
        q = query(
          collection(db, 'investments'),
          orderBy('createdAt', 'desc')
        );
      }
      
      const querySnapshot = await getDocs(q);
      const investments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Investment[];
      
      set({ investments });
    } catch (error) {
      console.error('Error fetching investments:', error);
    }
  },
  getTotalInvestments: () => {
    const { investments } = get();
    return investments
      .filter(inv => inv.status === 'approved')
      .reduce((sum, inv) => sum + inv.amount, 0);
  },
  getPendingInvestments: () => {
    return get().investments.filter(inv => inv.status === 'pending');
  }
}));
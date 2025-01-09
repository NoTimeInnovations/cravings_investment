export interface User {
  id: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  isVerified?: boolean;
  createdAt: string;
}

export interface Investment {
  id: string;
  userId: string;
  userFullName: string;
  amount: number;
  status: 'pending' | 'approved';
  createdAt: string;
  approvedAt?: string;
}

export interface AuthState {
  user: User | null;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export interface UserState {
  pendingUsers: User[];
  verifiedUsers: User[];
  fetchPendingUsers: () => Promise<void>;
  fetchVerifiedUsers: () => Promise<void>;
  verifyUser: (userId: string) => Promise<void>;
}
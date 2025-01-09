import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { ClockIcon } from 'lucide-react';

export const VerificationPending = () => {
  const { logout } = useAuthStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center">
          <ClockIcon className="mx-auto h-12 w-12 text-orange-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Verification Pending</h2>
          <p className="mt-2 text-sm text-gray-600">
            Your account is currently pending verification by our admin team. We'll notify you once your account is verified.
          </p>
        </div>
        <button
          onClick={logout}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};
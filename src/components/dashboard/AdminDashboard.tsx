import React, { useEffect } from 'react';
import { useInvestmentStore } from '../../store/investmentStore';
import { useUserStore } from '../../store/userStore';
import { AdminTabs } from './AdminTabs';

export const AdminDashboard = () => {
  const { getTotalInvestments, fetchInvestments } = useInvestmentStore();
  const totalInvestments = getTotalInvestments();

  useEffect(() => {
    fetchInvestments(); // Fetch all investments for admin
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Total Investment Pool</h2>
        <div className="text-4xl font-bold text-orange-600">${totalInvestments.toLocaleString()}</div>
      </div>

      <AdminTabs />
    </div>
  );
};
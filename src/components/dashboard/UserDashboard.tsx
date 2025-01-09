import React, { useState, useEffect } from 'react';
import { useInvestmentStore } from '../../store/investmentStore';
import { useAuthStore } from '../../store/authStore';
import { Investment } from '../../types';
import { PlusCircle } from 'lucide-react';
import { NewInvestmentModal } from './NewInvestmentModal';

export const UserDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { investments, getTotalInvestments, fetchInvestments } = useInvestmentStore();
  const user = useAuthStore(state => state.user);
  const totalInvestments = getTotalInvestments();

  useEffect(() => {
    if (user) {
      fetchInvestments(user.id);
    }
  }, [user]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8 bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Portfolio Overview</h2>
        <div className="text-4xl font-bold text-orange-600">${totalInvestments.toLocaleString()}</div>
        <p className="text-gray-600">Total Approved Investments</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Investment History</h3>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
        >
          <PlusCircle size={20} />
          New Investment
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {investments.map((investment: Investment) => (
              <tr key={investment.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(investment.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${investment.amount.toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    investment.status === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {investment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NewInvestmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};
import React from 'react';
import { useUserStore } from '../../store/userStore';
import { useInvestmentStore } from '../../store/investmentStore';

export const VerifiedInvestors = () => {
  const { verifiedUsers } = useUserStore();
  const { investments } = useInvestmentStore();

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Investment</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {verifiedUsers.map(user => (
            <tr key={user.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {user.fullName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {user.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${investments
                  .filter(inv => inv.userId === user.id && inv.status === 'approved')
                  .reduce((sum, inv) => sum + inv.amount, 0)
                  .toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
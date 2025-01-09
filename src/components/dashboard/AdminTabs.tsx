import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../store/userStore';
import { useInvestmentStore } from '../../store/investmentStore';
import { CheckCircle, Users, Clock, DollarSign } from 'lucide-react';
import clsx from 'clsx';
import { PendingInvestments } from './PendingInvestments';
import { VerifiedInvestors } from './VerifiedInvestors';
import { PendingInvestors } from './PendingInvestors';

export const AdminTabs = () => {
  const [activeTab, setActiveTab] = useState('verified');
  const { fetchVerifiedUsers, fetchPendingUsers } = useUserStore();
  const { fetchInvestments } = useInvestmentStore();

  useEffect(() => {
    fetchVerifiedUsers();
    fetchPendingUsers();
    fetchInvestments();
  }, []);

  const tabs = [
    { id: 'verified', label: 'Verified Investors', icon: Users },
    { id: 'pending', label: 'Pending Verification', icon: Clock },
    { id: 'investments', label: 'Pending Investments', icon: DollarSign }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={clsx(
                'flex items-center py-4 px-1 border-b-2 font-medium text-sm',
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              )}
            >
              <tab.icon className="h-5 w-5 mr-2" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'verified' && <VerifiedInvestors />}
      {activeTab === 'pending' && <PendingInvestors />}
      {activeTab === 'investments' && <PendingInvestments />}
    </div>
  );
};
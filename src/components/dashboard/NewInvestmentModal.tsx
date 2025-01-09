import React, { useState } from 'react';
import { useInvestmentStore } from '../../store/investmentStore';
import { X } from 'lucide-react';

interface NewInvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NewInvestmentModal = ({ isOpen, onClose }: NewInvestmentModalProps) => {
  const [amount, setAmount] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const addInvestment = useInvestmentStore(state => state.addInvestment);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInvestment(Number(amount));
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      setAmount('');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={24} />
        </button>
        
        {showSuccess ? (
          <div className="text-center py-8">
            <div className="text-green-600 text-xl font-semibold mb-2">Investment Submitted!</div>
            <p className="text-gray-600">Your investment is pending approval.</p>
          </div>
        ) : (
          <>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">New Investment</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investment Amount ($)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter amount"
                  required
                  min="1"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Submit Investment
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import {
  DollarSign, Calendar, FileText, Eye, Download, User, Building, 
  CreditCard, Plus, AlertCircle, CheckCircle, Clock, TrendingUp,
  Users, Award, UserCheck, X, Upload, Edit, Save, Trash2, MessageSquare
} from 'lucide-react';

const CreditAccountView = ({ customerData, formatCurrency, formatDate, viewMode = 'customer' }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showNewChargeModal, setShowNewChargeModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [transactionFilter, setTransactionFilter] = useState('all');
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isEditingNote, setIsEditingNote] = useState(false);
  const [editNoteText, setEditNoteText] = useState('');

  // Mock transaction data - would come from API
  const mockTransactions = [
    {
      id: 1,
      date: '2025-01-15',
      type: 'charge',
      description: 'Premium Widget Set - New Rental',
      amount: 999.95,
      sales_tax: 97.49,
      balance_change: 1097.44,
      running_balance: 2750.00,
      person: 'Sarah Johnson',
      reference: 'ORD-2025-001',
      note: 'Customer requested expedited processing due to urgent project deadline. Approved by management for priority handling.'
    },
    {
      id: 2,
      date: '2025-01-18',
      type: 'payment',
      description: 'Credit Card Payment',
      amount: -1250.00,
      sales_tax: 0,
      balance_change: -1250.00,
      running_balance: 1500.00,
      person: 'System',
      reference: 'PAY-2025-001'
    },
    {
      id: 3,
      date: '2025-01-20',
      type: 'charge',
      description: 'Standard Widget Pack - Rental Extension',
      amount: 449.97,
      sales_tax: 43.87,
      balance_change: 493.84,
      running_balance: 1993.84,
      person: 'Michael Chen',
      reference: 'ORD-2025-002',
      note: 'Extension approved after customer called to extend rental period. Original return date was 2025-01-22.'
    },
    {
      id: 4,
      date: '2025-01-22',
      type: 'discount',
      description: 'Volume Discount - Repeat Customer',
      amount: -100.00,
      sales_tax: -9.75,
      balance_change: -109.75,
      running_balance: 1884.09,
      person: 'Emily Rodriguez',
      reference: 'DISC-2025-001'
    },
    {
      id: 5,
      date: '2025-01-25',
      type: 'charge',
      description: 'Widget Accessories Kit - Product Purchase',
      amount: 199.98,
      sales_tax: 19.50,
      balance_change: 219.48,
      running_balance: 2103.57,
      person: 'David Thompson',
      reference: 'ORD-2025-003'
    },
    {
      id: 6,
      date: '2025-01-28',
      type: 'refund',
      description: 'Damaged Item Refund',
      amount: -50.00,
      sales_tax: -4.88,
      balance_change: -54.88,
      running_balance: 2048.69,
      person: 'Sarah Johnson',
      reference: 'REF-2025-001',
      note: 'Item arrived damaged during shipping. Customer provided photos as evidence. Refund processed immediately to maintain good relationship.'
    }
  ];

  const getTransactionTypeColor = (type) => {
    switch (type) {
      case 'charge': return 'bg-red-100 text-red-800';
      case 'payment': return 'bg-green-100 text-green-800';
      case 'refund': return 'bg-blue-100 text-blue-800';
      case 'discount': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionIcon = (type) => {
    switch (type) {
      case 'charge': return <Plus className="w-4 h-4" />;
      case 'payment': return <CreditCard className="w-4 h-4" />;
      case 'refund': return <TrendingUp className="w-4 h-4" />;
      case 'discount': return <Award className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  // Filter transactions based on selected filter
  const filteredTransactions = mockTransactions.filter(transaction => {
    if (transactionFilter === 'all') return true;
    return transaction.type === transactionFilter;
  });

  const handleViewNote = (transaction) => {
    setSelectedNote(transaction);
    setEditNoteText(transaction.note || '');
    setIsEditingNote(false);
    setShowNoteModal(true);
  };

  const handleEditNote = () => {
    setIsEditingNote(true);
  };

  const handleSaveNote = () => {
    // Here you would make an API call to save the note
    console.log('Saving note:', editNoteText);
    setSelectedNote(prev => ({ ...prev, note: editNoteText }));
    setIsEditingNote(false);
    setShowNoteModal(false);
  };

  const handleCancelNoteEdit = () => {
    setEditNoteText(selectedNote?.note || '');
    setIsEditingNote(false);
  };

  // Note Modal Component
  const NoteModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-600" />
              Transaction Note
            </h3>
            <button onClick={() => setShowNoteModal(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {selectedNote && (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-500">Transaction:</span>
                    <span className="text-gray-900">{selectedNote.reference}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-500">Date:</span>
                    <span className="text-gray-900">{formatDate(selectedNote.date)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-500">Amount:</span>
                    <span className="text-gray-900">{formatCurrency(selectedNote.balance_change)}</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                {isEditingNote ? (
                  <textarea
                    value={editNoteText}
                    onChange={(e) => setEditNoteText(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Enter note about this transaction..."
                  />
                ) : (
                  <div className="min-h-[100px] p-3 bg-gray-50 border border-gray-200 rounded-md">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedNote.note || 'No note available for this transaction.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowNoteModal(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Close
            </button>
            {viewMode === 'admin' && (
              <>
                {isEditingNote ? (
                  <>
                    <button
                      onClick={handleCancelNoteEdit}
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveNote}
                      className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                    >
                      Save Note
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleEditNote}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                  >
                    Edit Note
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Payment Modal Component (Admin Only)
  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-green-600" />
              Record Payment
            </h3>
            <button onClick={() => setShowPaymentModal(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select payment method</option>
                <option value="credit-debit">Credit / Debit Card</option>
                <option value="cash">Cash</option>
                <option value="check">Check</option>
                <option value="bank-transfer">Bank Transfer</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Person Responsible</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select person responsible</option>
                <option value="sarah-johnson">Sarah Johnson</option>
                <option value="michael-chen">Michael Chen</option>
                <option value="emily-rodriguez">Emily Rodriguez</option>
                <option value="david-thompson">David Thompson</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes (Optional)</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter any additional notes..."
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">
              Record Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Refund Modal Component (Admin Only)
  const RefundModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
              Process Refund
            </h3>
            <button onClick={() => setShowRefundModal(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Refund Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Refund Reason</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select refund reason</option>
                <option value="damaged-item">Damaged Item</option>
                <option value="wrong-item">Wrong Item Shipped</option>
                <option value="customer-cancellation">Customer Cancellation</option>
                <option value="overcharge">Billing Overcharge</option>
                <option value="duplicate-charge">Duplicate Charge</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Person Responsible</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select person responsible</option>
                <option value="sarah-johnson">Sarah Johnson</option>
                <option value="michael-chen">Michael Chen</option>
                <option value="emily-rodriguez">Emily Rodriguez</option>
                <option value="david-thompson">David Thompson</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Describe the reason for this refund..."
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowRefundModal(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
              Process Refund
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Discount Modal Component (Admin Only)
  const DiscountModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Award className="w-5 h-5 mr-2 text-purple-600" />
              Apply Discount
            </h3>
            <button onClick={() => setShowDiscountModal(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount Amount</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                  step="0.01"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount Reason</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select discount reason</option>
                <option value="volume-discount">Volume Discount</option>
                <option value="repeat-customer">Repeat Customer Discount</option>
                <option value="damage-waiver">Damage Waiver Protection</option>
                <option value="misc-management">Misc. Management Discount</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Person Responsible</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="">Select person responsible</option>
                <option value="sarah-johnson">Sarah Johnson</option>
                <option value="michael-chen">Michael Chen</option>
                <option value="emily-rodriguez">Emily Rodriguez</option>
                <option value="david-thompson">David Thompson</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
              <textarea
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter any additional notes about this discount..."
              />
            </div>
          </div>
          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowDiscountModal(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700">
              Apply Discount
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // New Charge Modal Component (Admin Only)
  const NewChargeModal = () => {
    const [chargeAmount, setChargeAmount] = useState('');
    const [taxOption, setTaxOption] = useState('add-tax');
    const salesTaxRate = 0.0975; // 9.75%

    const calculateTaxBreakdown = () => {
      const amount = parseFloat(chargeAmount) || 0;
      
      switch (taxOption) {
        case 'add-tax':
          const salesTax = amount * salesTaxRate;
          return {
            amount: amount,
            salesTax: salesTax,
            total: amount + salesTax
          };
        case 'tax-free':
          return {
            amount: amount,
            salesTax: 0,
            total: amount
          };
        case 'reverse-tax':
          const baseAmount = amount / (1 + salesTaxRate);
          const reverseTax = amount - baseAmount;
          return {
            amount: baseAmount,
            salesTax: reverseTax,
            total: amount
          };
        default:
          return { amount: 0, salesTax: 0, total: 0 };
      }
    };

    const breakdown = calculateTaxBreakdown();

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-red-600" />
                New Charge
              </h3>
              <button onClick={() => setShowNewChargeModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Charge Amount</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    value={chargeAmount}
                    onChange={(e) => setChargeAmount(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Sales Tax Treatment</label>
                <div className="space-y-3">
                  <label className="flex items-start">
                    <input
                      type="radio"
                      name="taxOption"
                      value="add-tax"
                      checked={taxOption === 'add-tax'}
                      onChange={(e) => setTaxOption(e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Add Sales Tax</div>
                      <div className="text-sm text-gray-500">Add 9.75% sales tax to the entered amount</div>
                    </div>
                  </label>
                  <label className="flex items-start">
                    <input
                      type="radio"
                      name="taxOption"
                      value="tax-free"
                      checked={taxOption === 'tax-free'}
                      onChange={(e) => setTaxOption(e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Tax Free</div>
                      <div className="text-sm text-gray-500">No sales tax applied to this charge</div>
                    </div>
                  </label>
                  <label className="flex items-start">
                    <input
                      type="radio"
                      name="taxOption"
                      value="reverse-tax"
                      checked={taxOption === 'reverse-tax'}
                      onChange={(e) => setTaxOption(e.target.value)}
                      className="mt-1 mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900">Reverse Sales Tax</div>
                      <div className="text-sm text-gray-500">Split entered amount proportionally between base amount and tax</div>
                    </div>
                  </label>
                </div>
              </div>

              {chargeAmount && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-blue-900 mb-2">Calculation Preview</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Amount:</span>
                      <span className="font-medium text-blue-900">{formatCurrency(breakdown.amount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Sales Tax:</span>
                      <span className="font-medium text-blue-900">{formatCurrency(breakdown.salesTax)}</span>
                    </div>
                    <div className="flex justify-between border-t border-blue-300 pt-1">
                      <span className="font-medium text-blue-700">Total Balance Change:</span>
                      <span className="font-bold text-blue-900">{formatCurrency(breakdown.total)}</span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Charge Reason</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select charge reason</option>
                  <option value="new-rental">New Rental</option>
                  <option value="rental-extension">Rental Extension</option>
                  <option value="damages">Damages</option>
                  <option value="fuel-charge">Fuel Charge</option>
                  <option value="cleaning-charge">Cleaning Charge</option>
                  <option value="missing-items">Missing Items</option>
                  <option value="product-purchase">Product Purchase</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Person Responsible</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select person responsible</option>
                  <option value="sarah-johnson">Sarah Johnson</option>
                  <option value="michael-chen">Michael Chen</option>
                  <option value="emily-rodriguez">Emily Rodriguez</option>
                  <option value="david-thompson">David Thompson</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter any additional notes about this charge..."
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNewChargeModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700">
                Add Charge
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Credit Account Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {viewMode === 'admin' ? 'Customer Credit Account Management' : 'Credit Account'}
            </h2>
            <p className="text-gray-600 mt-1">
              {viewMode === 'admin' 
                ? 'Manage customer credit account transactions and balance'
                : 'View your credit account balance and transaction history'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Current Balance</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(customerData?.current_balance)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Available Credit</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(customerData?.available_credit)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Credit Limit</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(customerData?.credit_limit)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Last Payment Date</p>
              <p className="text-2xl font-bold text-gray-900">
                {(() => {
                  const lastPayment = customerData?.payments
                    ?.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
                  return lastPayment ? formatDate(lastPayment.date) : 'No payments';
                })()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Utilization Bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Utilization</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-gray-600">
            <span>Used: {formatCurrency(customerData?.current_balance)}</span>
            <span>Available: {formatCurrency(customerData?.available_credit)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${(customerData?.current_balance / customerData?.credit_limit) * 100}%` }}
            ></div>
          </div>
          <div className="text-center text-sm text-gray-500">
            Credit Limit: {formatCurrency(customerData?.credit_limit)}
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {viewMode === 'admin' ? 'Account Transactions' : 'Transaction History'}
            </h3>
            <div className="flex items-center space-x-4">
              {viewMode === 'admin' && (
                <>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setShowPaymentModal(true)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2"
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>Credit / Debit</span>
                    </button>
                    <button
                      onClick={() => setShowRefundModal(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2"
                    >
                      <TrendingUp className="w-4 h-4" />
                      <span>Refund</span>
                    </button>
                    <button
                      onClick={() => setShowDiscountModal(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2"
                    >
                      <Award className="w-4 h-4" />
                      <span>Discount</span>
                    </button>
                    <button
                      onClick={() => setShowNewChargeModal(true)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-sm flex items-center space-x-2 mr-[100px]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>New Charge</span>
                    </button>
                  </div>
                  <div className="border-l border-gray-300 h-8"></div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm font-medium text-gray-700">Filter by Type:</label>
                    <select
                      value={transactionFilter}
                      onChange={(e) => setTransactionFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Transactions ({mockTransactions.length})</option>
                      <option value="charge">
                        Charges ({mockTransactions.filter(t => t.type === 'charge').length})
                      </option>
                      <option value="payment">
                        Payments ({mockTransactions.filter(t => t.type === 'payment').length})
                      </option>
                      <option value="refund">
                        Refunds ({mockTransactions.filter(t => t.type === 'refund').length})
                      </option>
                      <option value="discount">
                        Discounts ({mockTransactions.filter(t => t.type === 'discount').length})
                      </option>
                    </select>
                  </div>
                </>
              )}
              {viewMode === 'customer' && (
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Filter by Type:</label>
                  <select
                    value={transactionFilter}
                    onChange={(e) => setTransactionFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Transactions ({mockTransactions.length})</option>
                    <option value="charge">
                      Charges ({mockTransactions.filter(t => t.type === 'charge').length})
                    </option>
                    <option value="payment">
                      Payments ({mockTransactions.filter(t => t.type === 'payment').length})
                    </option>
                    <option value="refund">
                      Refunds ({mockTransactions.filter(t => t.type === 'refund').length})
                    </option>
                    <option value="discount">
                      Discounts ({mockTransactions.filter(t => t.type === 'discount').length})
                    </option>
                  </select>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Tax</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Change</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Running Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTransactionTypeColor(transaction.type)}`}>
                      {getTransactionIcon(transaction.type)}
                      <span className="ml-1 capitalize">{transaction.type}</span>
                    </span>
                    {viewMode === 'admin' && transaction.person && (
                      <div className="text-xs text-gray-500 mt-1">{transaction.person}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    <div className="max-w-xs truncate">{transaction.description}</div>
                    {transaction.reference && (
                      <div className="text-xs text-gray-500">Ref: {transaction.reference}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(Math.abs(transaction.amount))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(Math.abs(transaction.sales_tax))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                    <span className={transaction.balance_change >= 0 ? 'text-red-600' : 'text-green-600'}>
                      {transaction.balance_change >= 0 ? '+' : ''}{formatCurrency(transaction.balance_change)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {formatCurrency(transaction.running_balance)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900 mr-3">
                      <Download className="h-4 w-4" />
                    </button>
                    {transaction.note && (
                      <button 
                        onClick={() => handleViewNote(transaction)}
                        className="text-purple-600 hover:text-purple-900"
                        title="View note"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {transactionFilter === 'all' 
                  ? 'No transactions found.' 
                  : `No transactions found with type "${transactionFilter}".`
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Admin Only Modals */}
      {viewMode === 'admin' && (
        <>
          {showPaymentModal && <PaymentModal />}
          {showRefundModal && <RefundModal />}
          {showDiscountModal && <DiscountModal />}
          {showNewChargeModal && <NewChargeModal />}
        </>
      )}
      
      {/* Note Modal - Available to both admin and customer */}
      {showNoteModal && <NoteModal />}
    </div>
  );
};

export default CreditAccountView;
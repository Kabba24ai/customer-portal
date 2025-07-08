import React, { useState } from 'react';
import {
  DollarSign, Plus, Edit, Trash2, Save, X, Calculator, Globe,
  AlertCircle, CheckCircle, FileText, Calendar, TrendingUp,
  CreditCard, RotateCcw, Percent, Receipt
} from 'lucide-react';

const CreditAccountView = ({ customerData, formatDate, formatCurrency, viewMode = 'customer' }) => {
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState('');
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [showNewChargeModal, setShowNewChargeModal] = useState(false);
  const [refundData, setRefundData] = useState({
    amount: '',
    person: '',
    reason: '',
    notes: ''
  });
  const [discountData, setDiscountData] = useState({
    amount: '',
    person: '',
    reason: '',
    notes: ''
  });
  const [newChargeData, setNewChargeData] = useState({
    amount: '',
    taxOption: '',
    reason: '',
    person: '',
    notes: ''
  });
  const [paymentData, setPaymentData] = useState({
    amount: '',
    person: '',
    notes: '',
    checkNumber: ''
  });
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    order_number: '',
    contract_id: '',
    product_description: '',
    amount: '',
    sales_tax: '',
    gross_payment: '',
    product_payment: '',
    tax_payment: '',
    notes: ''
  });

  // Mock credit account transactions data
  const mockCreditTransactions = [
    {
      id: 1,
      date: '2025-01-15',
      order_number: '2001',
      contract_id: 'CNT-2025-001',
      product_description: 'Premium Widget Set Installation',
      amount: 999.95,
      sales_tax: 87.50,
      gross_payment: 0,
      product_payment: 0,
      tax_payment: 0,
      balance: 1087.45,
      notes: 'Initial order - credit account'
    },
    {
      id: 2,
      date: '2025-01-20',
      order_number: '2002',
      contract_id: 'CNT-2025-002',
      product_description: 'Standard Widget Pack + Express Shipping',
      amount: 474.97,
      sales_tax: 41.56,
      gross_payment: 0,
      product_payment: 0,
      tax_payment: 0,
      balance: 1603.98,
      notes: 'Rush order for expansion'
    },
    {
      id: 3,
      date: '2025-01-25',
      order_number: '2003',
      contract_id: 'CNT-2025-003',
      product_description: 'Widget Accessories Kit + Maintenance',
      amount: 624.50,
      sales_tax: 54.64,
      gross_payment: 0,
      product_payment: 0,
      tax_payment: 0,
      balance: 2283.12,
      notes: 'Monthly maintenance contract'
    },
    {
      id: 4,
      date: '2025-02-03',
      order_number: '',
      contract_id: '',
      product_description: 'Payment Received',
      amount: 0,
      sales_tax: 0,
      gross_payment: 1000.00,
      product_payment: 909.09,
      tax_payment: 90.91,
      balance: 1283.12,
      notes: 'Customer payment - check #1234'
    },
    {
      id: 5,
      date: '2025-02-14',
      order_number: '',
      contract_id: '',
      product_description: 'Payment Received',
      amount: 0,
      sales_tax: 0,
      gross_payment: 500.00,
      product_payment: 454.55,
      tax_payment: 45.45,
      balance: 783.12,
      notes: 'Customer payment - ACH transfer'
    }
  ];

  const calculateTotals = () => {
    const totalSales = mockCreditTransactions.reduce((sum, t) => sum + t.amount, 0);
    const totalSalesTax = mockCreditTransactions.reduce((sum, t) => sum + t.sales_tax, 0);
    const totalPayments = mockCreditTransactions.reduce((sum, t) => sum + t.gross_payment, 0);
    const currentBalance = totalSales + totalSalesTax - totalPayments;
    
    return {
      totalSales,
      totalSalesTax,
      totalPayments,
      currentBalance,
      grossSales: totalSales + totalSalesTax
    };
  };

  const totals = calculateTotals();

  const handleAddTransaction = () => {
    setShowAddTransaction(true);
    setNewTransaction({
      date: new Date().toISOString().split('T')[0],
      order_number: '',
      contract_id: '',
      product_description: '',
      amount: '',
      sales_tax: '',
      gross_payment: '',
      product_payment: '',
      tax_payment: '',
      notes: ''
    });
  };

  const handleSaveTransaction = () => {
    // Here you would save the transaction to the backend
    console.log('Saving transaction:', newTransaction);
    setShowAddTransaction(false);
    setEditingTransaction(null);
  };

  const handlePaymentClick = (type) => {
    setPaymentType(type);
    setPaymentData({
      amount: '',
      person: '',
      notes: '',
      checkNumber: ''
    });
    setShowPaymentModal(true);
  };

  const handleSavePayment = () => {
    // Here you would save the payment to the backend
    console.log('Saving payment:', { type: paymentType, ...paymentData });
    setShowPaymentModal(false);
    setPaymentType('');
  };

  const handleRefundClick = () => {
    setRefundData({
      amount: '',
      person: '',
      reason: '',
      notes: ''
    });
    setShowRefundModal(true);
  };

  const handleSaveRefund = () => {
    // Here you would save the refund to the backend
    console.log('Saving refund:', refundData);
    setShowRefundModal(false);
  };

  const handleDiscountClick = () => {
    setDiscountData({
      amount: '',
      person: '',
      reason: '',
      notes: ''
    });
    setShowDiscountModal(true);
  };

  const handleSaveDiscount = () => {
    // Here you would save the discount to the backend
    console.log('Saving discount:', discountData);
    setShowDiscountModal(false);
  };

  const handleNewChargeClick = () => {
    setNewChargeData({
      amount: '',
      taxOption: '',
      reason: '',
      person: '',
      notes: ''
    });
    setShowNewChargeModal(true);
  };

  const handleSaveNewCharge = () => {
    // Here you would save the new charge to the backend
    console.log('Saving new charge:', newChargeData);
    setShowNewChargeModal(false);
  };

  // Calculate tax amounts based on selected option
  const calculateTaxAmounts = (amount, taxOption) => {
    const TAX_RATE = 0.0975; // 9.75%
    const numAmount = parseFloat(amount) || 0;
    
    switch (taxOption) {
      case 'add-sales-tax':
        return {
          salesAmount: numAmount,
          taxAmount: numAmount * TAX_RATE,
          totalAmount: numAmount * (1 + TAX_RATE)
        };
      case 'tax-free':
        return {
          salesAmount: numAmount,
          taxAmount: 0,
          totalAmount: numAmount
        };
      case 'reverse-sales-tax':
        return {
          salesAmount: numAmount / (1 + TAX_RATE),
          taxAmount: numAmount - (numAmount / (1 + TAX_RATE)),
          totalAmount: numAmount
        };
      default:
        return {
          salesAmount: 0,
          taxAmount: 0,
          totalAmount: 0
        };
    }
  };

  const NewChargeModal = () => {
    const taxCalculation = calculateTaxAmounts(newChargeData.amount, newChargeData.taxOption);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <Receipt className="w-5 h-5 mr-2 text-orange-600" />
                Add New Charge
              </h3>
              <button
                onClick={() => setShowNewChargeModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="space-y-6">
              {/* Amount Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Charge Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    step="0.01"
                    value={newChargeData.amount}
                    onChange={(e) => setNewChargeData(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="0.00"
                    min="0"
                  />
                </div>
              </div>

              {/* Sales Tax Option */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Sales Tax Treatment <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="add-sales-tax"
                      name="taxOption"
                      value="add-sales-tax"
                      checked={newChargeData.taxOption === 'add-sales-tax'}
                      onChange={(e) => setNewChargeData(prev => ({ ...prev, taxOption: e.target.value }))}
                      className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <label htmlFor="add-sales-tax" className="text-sm font-medium text-gray-900">
                        Add Sales Tax
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Adds sales tax to the entered amount at 9.75% rate
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="tax-free"
                      name="taxOption"
                      value="tax-free"
                      checked={newChargeData.taxOption === 'tax-free'}
                      onChange={(e) => setNewChargeData(prev => ({ ...prev, taxOption: e.target.value }))}
                      className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <label htmlFor="tax-free" className="text-sm font-medium text-gray-900">
                        Tax Free
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Adds amount to sales only, no sales tax applied
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <input
                      type="radio"
                      id="reverse-sales-tax"
                      name="taxOption"
                      value="reverse-sales-tax"
                      checked={newChargeData.taxOption === 'reverse-sales-tax'}
                      onChange={(e) => setNewChargeData(prev => ({ ...prev, taxOption: e.target.value }))}
                      className="mt-1 h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300"
                    />
                    <div className="ml-3">
                      <label htmlFor="reverse-sales-tax" className="text-sm font-medium text-gray-900">
                        Reverse Sales Tax
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Splits entered amount proportionately between sales and tax
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Charge Reason */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Charge Reason <span className="text-red-500">*</span>
                </label>
                <select
                  value={newChargeData.reason}
                  onChange={(e) => setNewChargeData(prev => ({ ...prev, reason: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
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

              {/* Person Responsible Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Person Responsible <span className="text-red-500">*</span>
                </label>
                <select
                  value={newChargeData.person}
                  onChange={(e) => setNewChargeData(prev => ({ ...prev, person: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">Select person responsible</option>
                  <option value="sarah-johnson">Sarah Johnson - Cashier</option>
                  <option value="michael-chen">Michael Chen - Sales Rep</option>
                  <option value="emily-rodriguez">Emily Rodriguez - Manager</option>
                  <option value="david-thompson">David Thompson - Supervisor</option>
                  <option value="jennifer-williams">Jennifer Williams - Admin</option>
                </select>
              </div>

              {/* Notes Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  value={newChargeData.notes}
                  onChange={(e) => setNewChargeData(prev => ({ ...prev, notes: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Enter any additional notes about this charge..."
                />
              </div>

              {/* Charge Calculation Summary */}
              {newChargeData.amount && newChargeData.taxOption && (
                <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                  <h4 className="text-sm font-semibold text-orange-900 mb-3">Charge Calculation</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-orange-700">Amount Column:</span>
                      <span className="font-medium text-orange-900">
                        {formatCurrency(taxCalculation.salesAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-700">Sales Tax Column:</span>
                      <span className="font-medium text-orange-900">
                        {formatCurrency(taxCalculation.taxAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-orange-200 pt-2">
                      <span className="text-orange-700">Total Added to Balance:</span>
                      <span className="font-bold text-orange-900">
                        {formatCurrency(taxCalculation.totalAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-orange-700">Current Balance:</span>
                      <span className="font-medium text-orange-900">{formatCurrency(totals.currentBalance)}</span>
                    </div>
                    <div className="flex justify-between border-t border-orange-200 pt-2">
                      <span className="text-orange-700">New Balance:</span>
                      <span className="font-bold text-orange-900">
                        {formatCurrency(totals.currentBalance + taxCalculation.totalAmount)}
                      </span>
                    </div>
                  </div>
                  
                  {/* Tax Option Explanation */}
                  <div className="mt-3 pt-3 border-t border-orange-200">
                    <p className="text-xs text-orange-700">
                      <strong>
                        {newChargeData.taxOption === 'add-sales-tax' && 'Add Sales Tax: '}
                        {newChargeData.taxOption === 'tax-free' && 'Tax Free: '}
                        {newChargeData.taxOption === 'reverse-sales-tax' && 'Reverse Sales Tax: '}
                      </strong>
                      {newChargeData.taxOption === 'add-sales-tax' && 
                        `$${newChargeData.amount} + 9.75% tax = $${taxCalculation.totalAmount.toFixed(2)} total`
                      }
                      {newChargeData.taxOption === 'tax-free' && 
                        `$${newChargeData.amount} added to Amount column only, no tax applied`
                      }
                      {newChargeData.taxOption === 'reverse-sales-tax' && 
                        `$${newChargeData.amount} split: $${taxCalculation.salesAmount.toFixed(2)} to Amount + $${taxCalculation.taxAmount.toFixed(2)} to Sales Tax`
                      }
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNewChargeModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveNewCharge}
                disabled={!newChargeData.amount || !newChargeData.taxOption || !newChargeData.reason || !newChargeData.person}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Charge
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const DiscountModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Percent className="w-5 h-5 mr-2 text-purple-600" />
              Apply Discount
            </h3>
            <button
              onClick={() => setShowDiscountModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {/* Amount Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  value={discountData.amount}
                  onChange={(e) => setDiscountData(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="0.00"
                  min="0"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Fixed amount discount (not percentage)
              </p>
            </div>

            {/* Person Responsible Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Person Responsible <span className="text-red-500">*</span>
              </label>
              <select
                value={discountData.person}
                onChange={(e) => setDiscountData(prev => ({ ...prev, person: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select person responsible</option>
                <option value="sarah-johnson">Sarah Johnson - Cashier</option>
                <option value="michael-chen">Michael Chen - Sales Rep</option>
                <option value="emily-rodriguez">Emily Rodriguez - Manager</option>
                <option value="david-thompson">David Thompson - Supervisor</option>
                <option value="jennifer-williams">Jennifer Williams - Admin</option>
              </select>
            </div>

            {/* Reason Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Discount Reason <span className="text-red-500">*</span>
              </label>
              <select
                value={discountData.reason}
                onChange={(e) => setDiscountData(prev => ({ ...prev, reason: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select discount reason</option>
                <option value="volume-discount">Volume Discount</option>
                <option value="repeat-customer-discount">Repeat Customer Discount</option>
                <option value="damage-waiver-protection">Damage Waiver Protection</option>
                <option value="misc-management-discount">Misc. Management Discount</option>
              </select>
            </div>

            {/* Notes Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={discountData.notes}
                onChange={(e) => setDiscountData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                placeholder="Enter any additional notes about this discount..."
              />
            </div>

            {/* Discount Summary */}
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
              <h4 className="text-sm font-semibold text-purple-900 mb-3">Discount Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-700">Discount Amount:</span>
                  <span className="font-medium text-purple-900">
                    {discountData.amount ? formatCurrency(parseFloat(discountData.amount)) : '$0.00'}
                  </span>
                </div>
                {discountData.reason && (
                  <div className="flex justify-between">
                    <span className="text-purple-700">Reason:</span>
                    <span className="font-medium text-purple-900">
                      {discountData.reason.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-purple-700">Current Balance:</span>
                  <span className="font-medium text-purple-900">{formatCurrency(totals.currentBalance)}</span>
                </div>
                <div className="flex justify-between border-t border-purple-200 pt-2">
                  <span className="text-purple-700">New Balance:</span>
                  <span className="font-bold text-purple-900">
                    {discountData.amount 
                      ? formatCurrency(totals.currentBalance - parseFloat(discountData.amount))
                      : formatCurrency(totals.currentBalance)
                    }
                  </span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-purple-200">
                <p className="text-xs text-purple-700">
                  <strong>Note:</strong> This discount will be applied to both Sales Balance and Sales Tax proportionally, 
                  reducing the customer's outstanding balance without requiring payment.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowDiscountModal(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveDiscount}
              disabled={!discountData.amount || !discountData.person || !discountData.reason}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Apply Discount
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const RefundModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <RotateCcw className="w-5 h-5 mr-2 text-red-600" />
              Process Refund
            </h3>
            <button
              onClick={() => setShowRefundModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {/* Amount Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refund Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  value={refundData.amount}
                  onChange={(e) => setRefundData(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="0.00"
                  min="0"
                />
              </div>
            </div>

            {/* Person Responsible Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Person Responsible <span className="text-red-500">*</span>
              </label>
              <select
                value={refundData.person}
                onChange={(e) => setRefundData(prev => ({ ...prev, person: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select person responsible</option>
                <option value="sarah-johnson">Sarah Johnson - Cashier</option>
                <option value="michael-chen">Michael Chen - Sales Rep</option>
                <option value="emily-rodriguez">Emily Rodriguez - Manager</option>
                <option value="david-thompson">David Thompson - Supervisor</option>
                <option value="jennifer-williams">Jennifer Williams - Admin</option>
              </select>
            </div>

            {/* Reason Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refund Reason <span className="text-red-500">*</span>
              </label>
              <select
                value={refundData.reason}
                onChange={(e) => setRefundData(prev => ({ ...prev, reason: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                <option value="">Select refund reason</option>
                <option value="customer-canceled">Customer Canceled</option>
                <option value="equipment-not-available">Equipment Not Available</option>
                <option value="downgraded-equipment">Downgraded Equipment</option>
                <option value="downgraded-rental">Downgraded Rental</option>
              </select>
            </div>

            {/* Notes Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={refundData.notes}
                onChange={(e) => setRefundData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                placeholder="Enter any additional notes about this refund..."
              />
            </div>

            {/* Refund Summary */}
            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <h4 className="text-sm font-semibold text-red-900 mb-3">Refund Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-red-700">Refund Amount:</span>
                  <span className="font-medium text-red-900">
                    {refundData.amount ? formatCurrency(parseFloat(refundData.amount)) : '$0.00'}
                  </span>
                </div>
                {refundData.reason && (
                  <div className="flex justify-between">
                    <span className="text-red-700">Reason:</span>
                    <span className="font-medium text-red-900">
                      {refundData.reason.split('-').map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1)
                      ).join(' ')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-red-700">Current Balance:</span>
                  <span className="font-medium text-red-900">{formatCurrency(totals.currentBalance)}</span>
                </div>
                <div className="flex justify-between border-t border-red-200 pt-2">
                  <span className="text-red-700">New Balance:</span>
                  <span className="font-bold text-red-900">
                    {refundData.amount 
                      ? formatCurrency(totals.currentBalance + parseFloat(refundData.amount))
                      : formatCurrency(totals.currentBalance)
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowRefundModal(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveRefund}
              disabled={!refundData.amount || !refundData.person || !refundData.reason}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Process Refund
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-green-600" />
              Record {paymentType} Payment
            </h3>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {/* Amount Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  value={paymentData.amount}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                  min="0"
                />
              </div>
            </div>

            {/* Check Number Field - Only for Check payments */}
            {paymentType === 'Check' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={paymentData.checkNumber}
                  onChange={(e) => setPaymentData(prev => ({ ...prev, checkNumber: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter check number"
                />
              </div>
            )}

            {/* Person Responsible Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Person Responsible <span className="text-red-500">*</span>
              </label>
              <select
                value={paymentData.person}
                onChange={(e) => setPaymentData(prev => ({ ...prev, person: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select person responsible</option>
                <option value="sarah-johnson">Sarah Johnson - Cashier</option>
                <option value="michael-chen">Michael Chen - Sales Rep</option>
                <option value="emily-rodriguez">Emily Rodriguez - Manager</option>
                <option value="david-thompson">David Thompson - Supervisor</option>
                <option value="jennifer-williams">Jennifer Williams - Admin</option>
              </select>
            </div>

            {/* Notes Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notes
              </label>
              <textarea
                value={paymentData.notes}
                onChange={(e) => setPaymentData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                placeholder={`Enter any additional notes about this ${paymentType.toLowerCase()} payment...`}
              />
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Payment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span className="font-medium text-gray-900">{paymentType}</span>
                </div>
                {paymentType === 'Check' && paymentData.checkNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Check Number:</span>
                    <span className="font-medium text-gray-900">#{paymentData.checkNumber}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-medium text-gray-900">
                    {paymentData.amount ? formatCurrency(parseFloat(paymentData.amount)) : '$0.00'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Balance:</span>
                  <span className="font-medium text-red-600">{formatCurrency(totals.currentBalance)}</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 pt-2">
                  <span className="text-gray-600">New Balance:</span>
                  <span className="font-bold text-green-600">
                    {paymentData.amount 
                      ? formatCurrency(totals.currentBalance - parseFloat(paymentData.amount))
                      : formatCurrency(totals.currentBalance)
                    }
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-6">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              onClick={handleSavePayment}
              disabled={!paymentData.amount || !paymentData.person || (paymentType === 'Check' && !paymentData.checkNumber)}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Record Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction.id);
    setNewTransaction({
      date: transaction.date,
      order_number: transaction.order_number,
      contract_id: transaction.contract_id,
      product_description: transaction.product_description,
      amount: transaction.amount.toString(),
      sales_tax: transaction.sales_tax.toString(),
      gross_payment: transaction.gross_payment.toString(),
      product_payment: transaction.product_payment.toString(),
      tax_payment: transaction.tax_payment.toString(),
      notes: transaction.notes
    });
  };

  const TransactionForm = ({ isEditing = false }) => (
    <tr className="bg-blue-50">
      <td className="px-4 py-2">
        <input
          type="date"
          value={newTransaction.date}
          onChange={(e) => setNewTransaction(prev => ({ ...prev, date: e.target.value }))}
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="text"
          value={newTransaction.order_number}
          onChange={(e) => setNewTransaction(prev => ({ ...prev, order_number: e.target.value }))}
          placeholder="Last 4 digits"
          maxLength="4"
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="text"
          value={newTransaction.contract_id}
          onChange={(e) => setNewTransaction(prev => ({ ...prev, contract_id: e.target.value }))}
          placeholder="Contract ID"
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="text"
          value={newTransaction.product_description}
          onChange={(e) => setNewTransaction(prev => ({ ...prev, product_description: e.target.value }))}
          placeholder="Product description"
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="number"
          step="0.01"
          value={newTransaction.amount}
          onChange={(e) => setNewTransaction(prev => ({ ...prev, amount: e.target.value }))}
          placeholder="0.00"
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="number"
          step="0.01"
          value={newTransaction.sales_tax}
          onChange={(e) => setNewTransaction(prev => ({ ...prev, sales_tax: e.target.value }))}
          placeholder="0.00"
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="number"
          step="0.01"
          value={newTransaction.gross_payment}
          onChange={(e) => setNewTransaction(prev => ({ ...prev, gross_payment: e.target.value }))}
          placeholder="0.00"
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="number"
          step="0.01"
          value={newTransaction.product_payment}
          onChange={(e) => setNewTransaction(prev => ({ ...prev, product_payment: e.target.value }))}
          placeholder="0.00"
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-2">
        <input
          type="number"
          step="0.01"
          value={newTransaction.tax_payment}
          onChange={(e) => setNewTransaction(prev => ({ ...prev, tax_payment: e.target.value }))}
          placeholder="0.00"
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-2">
        <span className="text-xs text-gray-500">Calculated</span>
      </td>
      <td className="px-4 py-2">
        <input
          type="text"
          value={newTransaction.notes}
          onChange={(e) => setNewTransaction(prev => ({ ...prev, notes: e.target.value }))}
          placeholder="Notes"
          className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
        />
      </td>
      <td className="px-4 py-2">
        <div className="flex space-x-1">
          <button
            onClick={handleSaveTransaction}
            className="p-1 text-green-600 hover:text-green-800"
            title="Save"
          >
            <Save className="w-3 h-3" />
          </button>
          <button
            onClick={() => {
              setShowAddTransaction(false);
              setEditingTransaction(null);
            }}
            className="p-1 text-gray-600 hover:text-gray-800"
            title="Cancel"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      {/* Credit Account Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {customerData?.first_name} {customerData?.last_name}
            </h1>
            <p className="text-gray-600 mt-1">
              Account: {customerData?.unique_id} • {customerData?.company_name}
            </p>
          </div>
          <div className="flex items-center">
            <div className="text-center mr-8">
              <p className="text-sm font-medium text-gray-500 mb-1">Tax Status</p>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                customerData?.tax_exempt ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                <FileText className="w-4 h-4 mr-1" />
                {customerData?.tax_exempt ? 'Tax Exempt' : 'Taxable'}
              </div>
              {customerData?.tax_exempt && customerData?.tax_document && (
                <p className="text-xs text-gray-500 mt-1">
                  Valid until {formatDate(customerData.tax_document.valid_until)}
                </p>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              customerData?.status === 'Good Standing' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {customerData?.status}
            </div>
            <div className="mt-2">
              <button 
                onClick={() => window.open(`${customerData?.website}/login?customer_id=${customerData?.unique_id}&admin_login=true`, '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
              >
                <Globe className="w-4 h-4" />
                <span>Website Login</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totals.totalSales)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Sales Tax</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totals.totalSalesTax)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Payments</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totals.totalPayments)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Outstanding Balance</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totals.currentBalance)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Account Transactions Table - Full Width */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 -mx-4 sm:-mx-6 lg:-mx-8">
        <div className="p-6 border-b border-gray-200">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Credit Account Transactions</h3>
          </div>
          <div className="flex justify-center mt-4">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => handlePaymentClick('Cash')}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center space-x-1.5 transition-colors"
              >
                <DollarSign className="w-3 h-3" />
                <span>Cash Payment</span>
              </button>
              <button 
                onClick={() => handlePaymentClick('Check')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center space-x-1.5 transition-colors"
              >
                <FileText className="w-3 h-3" />
                <span>Check Payment</span>
              </button>
              <button 
                onClick={() => handlePaymentClick('Credit / Debit')}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center space-x-1.5 transition-colors"
              >
                <CreditCard className="w-3 h-3" />
                <span>Credit / Debit</span>
              </button>
              <button 
                onClick={handleDiscountClick}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center space-x-1.5 transition-colors"
              >
                <Percent className="w-3 h-3" />
                <span>Discount</span>
              </button>
              <button 
                onClick={handleRefundClick}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center space-x-1.5 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Refund</span>
              </button>
              <button 
                onClick={handleNewChargeClick}
                className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded text-sm font-medium flex items-center space-x-1.5 transition-colors"
              >
                <Receipt className="w-3 h-3" />
                <span>New Charge</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[80px]">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Contract ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[200px]">Product Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Sales Tax</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Gross Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[130px]">Product Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[120px]">Tax Payment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Balance</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[150px]">Notes</th>
                {viewMode === 'admin' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider min-w-[100px]">Operations</th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockCreditTransactions.map((transaction) => (
                editingTransaction === transaction.id ? (
                  <TransactionForm key={transaction.id} isEditing={true} />
                ) : (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 whitespace-nowrap text-xs text-gray-900">
                      {formatDate(transaction.date)}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-xs font-mono text-gray-900">
                      {transaction.order_number || '-'}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-xs font-mono text-gray-900">
                      {transaction.contract_id || '-'}
                    </td>
                    <td className="px-6 py-3 text-xs text-gray-900">
                      <div className="truncate" title={transaction.product_description}>
                        {transaction.product_description}
                      </div>
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-xs font-semibold text-gray-900">
                      {transaction.amount > 0 ? formatCurrency(transaction.amount) : '-'}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-xs font-semibold text-gray-900">
                      {transaction.sales_tax > 0 ? formatCurrency(transaction.sales_tax) : '-'}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-xs font-semibold text-green-600">
                      {transaction.gross_payment > 0 ? formatCurrency(transaction.gross_payment) : '-'}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-xs font-semibold text-green-600">
                      {transaction.product_payment > 0 ? formatCurrency(transaction.product_payment) : '-'}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-xs font-semibold text-green-600">
                      {transaction.tax_payment > 0 ? formatCurrency(transaction.tax_payment) : '-'}
                    </td>
                    <td className="px-6 py-3 whitespace-nowrap text-xs font-bold text-gray-900">
                      {formatCurrency(transaction.balance)}
                    </td>
                    <td className="px-6 py-3 text-xs text-gray-600">
                      <div className="truncate" title={transaction.notes}>
                        {transaction.notes || '-'}
                      </div>
                    </td>
                    {viewMode === 'admin' && (
                      <td className="px-6 py-3 whitespace-nowrap text-xs font-medium">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => handleEditTransaction(transaction)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => console.log('Delete transaction:', transaction.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                )
              ))}
              
              {/* Add new transaction form */}
              {showAddTransaction && <TransactionForm />}
              
              {/* Totals Row */}
              <tr className="bg-gray-100 font-semibold">
                <td className="px-6 py-3 text-xs text-gray-900" colSpan="4">
                  <strong>TOTALS</strong>
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-xs font-bold text-gray-900">
                  {formatCurrency(totals.totalSales)}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-xs font-bold text-gray-900">
                  {formatCurrency(totals.totalSalesTax)}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-xs font-bold text-green-600">
                  {formatCurrency(totals.totalPayments)}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-xs font-bold text-green-600">
                  {formatCurrency(mockCreditTransactions.reduce((sum, t) => sum + t.product_payment, 0))}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-xs font-bold text-green-600">
                  {formatCurrency(mockCreditTransactions.reduce((sum, t) => sum + t.tax_payment, 0))}
                </td>
                <td className="px-6 py-3 whitespace-nowrap text-xs font-bold text-red-600">
                  {formatCurrency(totals.currentBalance)}
                </td>
                <td className="px-6 py-3 text-xs text-gray-600" colSpan={viewMode === 'admin' ? "2" : "1"}>
                  Outstanding Balance
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && <PaymentModal />}
      
      {/* Refund Modal */}
      {showRefundModal && <RefundModal />}
      
      {/* Discount Modal */}
      {showDiscountModal && <DiscountModal />}
      
      {/* New Charge Modal */}
      {showNewChargeModal && <NewChargeModal />}
    </div>
  );
};

export default CreditAccountView;
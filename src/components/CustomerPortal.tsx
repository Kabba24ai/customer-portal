import React, { useState, useEffect } from 'react';
import AccountView from './AccountView';
import OrdersView from './OrdersView';
import CreditAccountView from './CreditAccountView_Credit1';
import AccountBillingSummary from './AccountBillingSummary';
import InvoiceCreationView from './InvoiceCreationView';
import {
  User, CreditCard, FileText, Settings, Bell, Download, Eye, Calendar, ShieldCheck,
  DollarSign, TrendingUp, AlertCircle, CheckCircle, Clock, Phone, Mail,
  MapPin, Building, Globe, Plus, Edit, Trash2, Upload, X, Truck
} from 'lucide-react';

const CustomerPortal = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [customerData, setCustomerData] = useState(null);
  const [viewMode, setViewMode] = useState('customer'); // 'customer' or 'admin'
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState('all');
  const [showInvoiceCreation, setShowInvoiceCreation] = useState(false);

  // Mock customer data - would come from API
  const mockCustomerData = {
    id: 1,
    unique_id: 'CUST-001',
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@acmecorp.com',
    phone: '(555) 012-3456',
    company_name: 'Acme Corp',
    company_phone: '(555) 012-0100',
    billing_address: '123 Main St, New York, NY 10001',
    delivery_address: '456 Oak Ave, New York, NY 10002',
    website: 'https://acme-corp.com',
    status: 'Good Standing',
    account_approved: true,
    credit_limit: 15000,
    current_balance: 2750.00,
    available_credit: 12250.00,
    tax_exempt: true,
    tax_document: {
      filename: 'acme_corp_tax_exempt_2025.pdf',
      upload_date: '2025-03-03',
      status: 'approved',
      valid_until: '2027-12-31'
    },
    created_at: '2024-01-15',
    invoices: [
      {
        id: 1,
        invoice_number: 'INV-2025-001',
        date: '2025-01-15',
        due_date: '2025-02-14',
        amount: 1250.00,
        status: 'paid',
        items: [
          { description: 'Premium Widget Set', quantity: 5, unit_price: 199.99, total: 999.95 },
          { description: 'Installation Service', quantity: 1, unit_price: 250.00, total: 250.00 }
        ]
      },
      {
        id: 2,
        invoice_number: 'INV-2025-002',
        date: '2025-01-20',
        due_date: '2025-02-19',
        amount: 875.50,
        status: 'overdue',
        items: [
          { description: 'Standard Widget Pack', quantity: 3, unit_price: 149.99, total: 449.97 },
          { description: 'Express Shipping', quantity: 1, unit_price: 25.00, total: 25.00 },
          { description: 'Extended Warranty', quantity: 3, unit_price: 133.51, total: 400.53 }
        ]
      },
      {
        id: 3,
        invoice_number: 'INV-2025-003',
        date: '2025-01-25',
        due_date: '2025-02-24',
        amount: 624.50,
        status: 'pending',
        items: [
          { description: 'Widget Accessories Kit', quantity: 2, unit_price: 99.99, total: 199.98 },
          { description: 'Monthly Maintenance', quantity: 1, unit_price: 424.52, total: 424.52 }
        ]
      }
    ],
    payments: [
      {
        id: 1,
        date: '2025-01-18',
        amount: 1250.00,
        method: 'Credit / Debit',
        status: 'completed',
        invoice_number: 'INV-2025-001'
      },
      {
        id: 2,
        date: '2025-01-10',
        amount: 500.00,
        method: 'Account',
        status: 'completed',
        invoice_number: 'Credit Applied'
      }
    ],
    orders: [
      {
        id: 1,
        order_number: 'ORD-2025-001',
        date: '2025-01-15',
        status: 'delivered',
        payment_status: 'paid',
        total: 1249.95,
        items_count: 6,
        tracking_number: 'TRK123456789',
        payment_method: 'Credit / Debit',
        primary_product: 'Premium Widget Set'
      },
      {
        id: 2,
        order_number: 'ORD-2025-002',
        date: '2025-01-20',
        status: 'shipped',
        payment_status: 'paid',
        total: 875.50,
        items_count: 4,
        tracking_number: 'TRK987654321',
        payment_method: 'COD',
        primary_product: 'Standard Widget Pack'
      },
      {
        id: 3,
        order_number: 'ORD-2025-003',
        date: '2025-01-25',
        status: 'processing',
        payment_status: 'acct',
        total: 624.50,
        items_count: 2,
        tracking_number: null,
        payment_method: 'Account',
        primary_product: 'Widget Accessories Kit'
      }
    ]
  };

  useEffect(() => {
    setCustomerData(mockCustomerData);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInvoiceStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePayInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const handleCreateInvoice = (newInvoice) => {
    // Here you would make an API call to create the invoice
    console.log('Creating invoice:', newInvoice);
    
    // For demo purposes, add it to the customer data
    const invoiceWithId = {
      ...newInvoice,
      id: Date.now(),
      invoice_number: newInvoice.invoice_number || `INV-${new Date().getFullYear()}-${String(customerData.invoices.length + 1).padStart(3, '0')}`
    };
    
    setCustomerData(prev => ({
      ...prev,
      invoices: [...prev.invoices, invoiceWithId]
    }));
  };

  const PaymentModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Pay Invoice</h3>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">Invoice Number:</span>
                <span className="text-sm font-semibold text-gray-900">{selectedInvoice?.invoice_number}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">Due Date:</span>
                <span className="text-sm text-gray-900">{formatDate(selectedInvoice?.due_date)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-500">Amount Due:</span>
                <span className="text-lg font-bold text-gray-900">{formatCurrency(selectedInvoice?.amount)}</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <CreditCard className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Secure Payment Processing</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Payments are processed securely through our payment gateway. You'll enter your payment details on the next step.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowPaymentModal(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
              Pay {formatCurrency(selectedInvoice?.amount)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-6">
      {/* Standardized Customer Header - matches Admin */}
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
                <ShieldCheck className="w-4 h-4 mr-1" />
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
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 ${
              customerData?.status === 'Good Standing' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {customerData?.status}
            </div>
            <div>
              <button 
                onClick={() => window.open(`${customerData?.website}`, '_blank')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
              >
                <Globe className="w-4 h-4" />
                <span>Visit Website</span>
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
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Invoices</p>
              <p className="text-2xl font-bold text-gray-900">
                {customerData?.invoices.filter(inv => inv.status !== 'paid').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Last Payment</p>
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

      {/* Recent Activity */}
      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button 
              onClick={() => setActiveTab('orders')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Methods</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerData?.orders.slice(0, 3).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.order_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.primary_product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.payment_method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                      order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.payment_status === 'acct' ? 'bg-blue-100 text-blue-800' :
                      order.payment_status === 'failed' ? 'bg-red-100 text-red-800' :
                      order.payment_status === 'refunded' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.payment_status === 'acct' ? 'Acct.' : order.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const BillingView = () => (
    <div className="space-y-6">
      {/* Invoices Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {viewMode === 'admin' ? 'Customer Invoices Management' : 'Invoices'}
            </h2>
            <p className="text-gray-600 mt-1">
              {viewMode === 'admin' 
                ? 'Manage customer invoices, payments, and billing administration'
                : 'View and manage your invoices and payment methods'
              }
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {viewMode === 'admin' && (
              <button 
                onClick={() => setShowInvoiceCreation(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Create Invoice</span>
              </button>
            )}
            <div className="text-right">
              <p className="text-sm font-medium text-gray-500">Current Balance</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(customerData?.current_balance)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Paid Invoices</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  customerData?.invoices
                    .filter(invoice => invoice.status === 'paid')
                    .reduce((sum, invoice) => sum + invoice.amount, 0) || 0
                )}
              </p>
            </div>
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Invoices</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  customerData?.invoices
                    .filter(invoice => invoice.status === 'pending')
                    .reduce((sum, invoice) => sum + invoice.amount, 0) || 0
                )}
              </p>
            </div>
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Overdue Invoices</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(
                  customerData?.invoices
                    .filter(invoice => invoice.status === 'overdue')
                    .reduce((sum, invoice) => sum + invoice.amount, 0) || 0
                )}
              </p>
            </div>
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Invoices</h3>
            {viewMode === 'admin' && (
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
                <select
                  value={invoiceStatusFilter}
                  onChange={(e) => setInvoiceStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Invoices ({customerData?.invoices.length || 0})</option>
                  <option value="paid">
                    Paid ({customerData?.invoices.filter(invoice => invoice.status === 'paid').length || 0})
                  </option>
                  <option value="pending">
                    Pending ({customerData?.invoices.filter(invoice => invoice.status === 'pending').length || 0})
                  </option>
                  <option value="overdue">
                    Overdue ({customerData?.invoices.filter(invoice => invoice.status === 'overdue').length || 0})
                  </option>
                </select>
              </div>
            )}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
                {viewMode === 'admin' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                )}
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerData?.invoices
                .filter(invoice => {
                  if (invoiceStatusFilter === 'all') return true;
                  return invoice.status === invoiceStatusFilter;
                })
                .map((invoice) => (
                <tr key={invoice.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{invoice.invoice_number}</div>
                  </td>
                  {viewMode === 'admin' && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">{customerData.company_name}</div>
                        <div className="text-gray-500">{customerData.first_name} {customerData.last_name}</div>
                      </div>
                    </td>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(invoice.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(invoice.due_date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getInvoiceStatusColor(invoice.status)}`}>
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button className="text-blue-600 hover:text-blue-900 inline-flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </button>
                    <button className="text-green-600 hover:text-green-900 inline-flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </button>
                    {viewMode === 'admin' ? (
                      <>
                        <button className="text-green-600 hover:text-green-900 inline-flex items-center">
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </button>
                        <button className="text-purple-600 hover:text-purple-900 inline-flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          Send
                        </button>
                      </>
                    ) : (
                      invoice.status !== 'paid' && (
                        <button 
                          onClick={() => handlePayInvoice(invoice)}
                          className="text-purple-600 hover:text-purple-900 inline-flex items-center"
                        >
                          <CreditCard className="w-4 h-4 mr-1" />
                          Pay
                        </button>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {customerData?.invoices
            .filter(invoice => {
              if (invoiceStatusFilter === 'all') return true;
              return invoice.status === invoiceStatusFilter;
            }).length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {invoiceStatusFilter === 'all' 
                  ? 'No invoices found.' 
                  : `No invoices found with status "${invoiceStatusFilter}".`
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const AdminDashboardView = () => (
    <div className="space-y-6">
      {/* Standardized Admin Header */}
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
                <ShieldCheck className="w-4 h-4 mr-1" />
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

      {/* Customer Contact Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Contact Information
          </h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-900">{customerData?.email}</p>
                <p className="text-xs text-gray-500">Email Address</p>
              </div>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-900">{customerData?.phone}</p>
                <p className="text-xs text-gray-500">Personal Phone</p>
              </div>
            </div>
            <div className="flex items-center">
              <Building className="w-4 h-4 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-900">{customerData?.company_phone}</p>
                <p className="text-xs text-gray-500">Company Phone</p>
              </div>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Address Information
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">Billing Address</p>
              <p className="text-sm text-gray-900 whitespace-pre-line">{customerData?.billing_address}</p>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm font-medium text-gray-500 mb-1">Delivery Address</p>
              <p className="text-sm text-gray-900 whitespace-pre-line">{customerData?.delivery_address}</p>
            </div>
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
              <FileText className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Open Invoices</p>
              <p className="text-2xl font-bold text-gray-900">
                {customerData?.invoices.filter(inv => inv.status !== 'paid').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Last Payment</p>
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

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button 
              onClick={() => setActiveTab('orders')}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              View All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Methods</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customerData?.orders.slice(0, 3).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.order_number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.primary_product}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(order.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.payment_method}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                      order.payment_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.payment_status === 'acct' ? 'bg-blue-100 text-blue-800' :
                      order.payment_status === 'failed' ? 'bg-red-100 text-red-800' :
                      order.payment_status === 'refunded' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {order.payment_status === 'acct' ? 'Acct.' : order.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatDate(order.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="text-green-600 hover:text-green-900">
                      <Download className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (!customerData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Show Invoice Creation View */}
      {showInvoiceCreation && (
        <InvoiceCreationView
          customerData={customerData}
          formatCurrency={formatCurrency}
          formatDate={formatDate}
          onBack={() => setShowInvoiceCreation(false)}
          onCreateInvoice={handleCreateInvoice}
        />
      )}
      
      {/* Show main portal when not creating invoice */}
      {!showInvoiceCreation && (
        <>
          {/* Development Only - View Toggle */}
          <div className="bg-yellow-100 border-b border-yellow-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-yellow-800">🚧 DEVELOPMENT ONLY</span>
                  <span className="text-xs text-yellow-700">|</span>
                  <span className="text-xs text-yellow-700">View Mode:</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('customer')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      viewMode === 'customer'
                        ? 'bg-blue-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    👤 Customer Portal
                  </button>
                  <button
                    onClick={() => setViewMode('admin')}
                    className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                      viewMode === 'admin'
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                    }`}
                  >
                    🔧 Admin Portal
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Header */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">{customerData.company_name}</h1>
                  <span className="ml-3 text-sm text-gray-500">
                    {viewMode === 'customer' ? 'Customer Portal' : 'Admin Portal'}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <Bell className="w-5 h-5 text-gray-400 hover:text-gray-600 cursor-pointer" />
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{customerData.first_name} {customerData.last_name}</p>
                      <p className="text-xs text-gray-500">{customerData.email}</p>
                    </div>
                    <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation - Unified for both Customer and Admin */}
          <div className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="flex space-x-8">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                  { id: 'orders', label: 'Orders', icon: FileText },
                  { id: 'customer-account', label: 'Credit Account', icon: DollarSign },
                  { id: 'invoices', label: 'Invoices', icon: CreditCard },
                  { id: 'account', label: 'Account', icon: Settings },
                  ...(viewMode === 'admin' ? [{ id: 'billing-summary', label: 'Billing Summary', icon: FileText }] : [])
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-1 py-4 border-b-2 text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {tab.label}
                      {viewMode === 'admin' && (
                        <span className="ml-1 text-xs bg-red-100 text-red-700 px-1.5 py-0.5 rounded">
                          Admin
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              viewMode === 'customer' ? <DashboardView /> : <AdminDashboardView />
            )}
            
            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <OrdersView 
                customerData={customerData}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                getOrderStatusColor={getOrderStatusColor}
                viewMode={viewMode}
              />
            )}
            
            {/* Customer Account Tab */}
            {activeTab === 'customer-account' && (
              <CreditAccountView 
                customerData={customerData}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                viewMode={viewMode}
              />
            )}
            
            {/* Invoices Tab */}
            {activeTab === 'invoices' && <BillingView />}
            
            {/* Account Tab */}
            {activeTab === 'account' && (
              <AccountView 
                customerData={customerData}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
                viewMode={viewMode}
              />
            )}
            
            {/* Billing Summary Tab - Admin Only */}
            {activeTab === 'billing-summary' && viewMode === 'admin' && (
              <AccountBillingSummary 
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            )}
          </div>

          {/* Payment Modal */}
          {showPaymentModal && <PaymentModal />}
        </>
      )}
    </div>
  );
};

export default CustomerPortal;
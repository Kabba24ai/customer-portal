import React, { useState, useMemo } from 'react';
import {
  Search, Filter, Eye, AlertTriangle, Clock, CheckCircle,
  CreditCard, DollarSign, Calendar, Phone, Building, User,
  ChevronDown, ChevronUp, Download, RefreshCw
} from 'lucide-react';

const AccountBillingSummary = ({ formatCurrency, formatDate }) => {
  const [customerSearch, setCustomerSearch] = useState('');
  const [companySearch, setCompanySearch] = useState('');
  const [phoneSearch, setPhoneSearch] = useState('');
  const [alertFilter, setAlertFilter] = useState('all');
  const [creditApprovedChecked, setCreditApprovedChecked] = useState(() => {
    const saved = localStorage.getItem('creditApprovedFilter');
    return saved ? JSON.parse(saved) : false;
  });
  const [creditNoneChecked, setCreditNoneChecked] = useState(() => {
    const saved = localStorage.getItem('creditNoneFilter');
    return saved ? JSON.parse(saved) : false;
  });
  const [balanceSort, setBalanceSort] = useState('highest');
  const [sortField, setSortField] = useState('daysAging');
  const [sortDirection, setSortDirection] = useState('desc');

  // Save credit filter preferences to localStorage
  const handleCreditApprovedChange = (checked) => {
    setCreditApprovedChecked(checked);
    localStorage.setItem('creditApprovedFilter', JSON.stringify(checked));
  };

  const handleCreditNoneChange = (checked) => {
    setCreditNoneChecked(checked);
    localStorage.setItem('creditNoneFilter', JSON.stringify(checked));
  };

  // Mock customer data - would come from API
  const mockCustomers = [
    {
      id: 1,
      customerName: 'John Doe',
      companyName: 'Acme Corp',
      phone: '(555) 012-3456',
      companyPhone: '(555) 012-0100',
      balance: 2750.00,
      lastPayment: 1250.00,
      lastPaymentDate: '2025-01-18',
      paymentDue: 875.50,
      daysAging: 15,
      creditApproved: true,
      status: 'Good Standing'
    },
    {
      id: 2,
      customerName: 'Sarah Johnson',
      companyName: 'Tech Solutions Inc',
      phone: '(555) 234-5678',
      companyPhone: '(555) 234-0200',
      balance: 4250.75,
      lastPayment: 800.00,
      lastPaymentDate: '2025-01-10',
      paymentDue: 1200.00,
      daysAging: 45,
      creditApproved: true,
      status: 'Good Standing'
    },
    {
      id: 3,
      customerName: 'Michael Chen',
      companyName: 'Global Manufacturing',
      phone: '(555) 345-6789',
      companyPhone: '(555) 345-0300',
      balance: 1850.25,
      lastPayment: 2100.00,
      lastPaymentDate: '2025-01-22',
      paymentDue: 0,
      daysAging: 8,
      creditApproved: true,
      status: 'Good Standing'
    },
    {
      id: 4,
      customerName: 'Emily Rodriguez',
      companyName: 'Creative Designs LLC',
      phone: '(555) 456-7890',
      companyPhone: '(555) 456-0400',
      balance: 6750.00,
      lastPayment: 500.00,
      lastPaymentDate: '2024-12-15',
      paymentDue: 3200.00,
      daysAging: 75,
      creditApproved: true,
      status: 'Past Due'
    },
    {
      id: 5,
      customerName: 'David Thompson',
      companyName: 'Thompson Enterprises',
      phone: '(555) 567-8901',
      companyPhone: '(555) 567-0500',
      balance: 950.00,
      lastPayment: 1500.00,
      lastPaymentDate: '2025-01-25',
      paymentDue: 0,
      daysAging: 5,
      creditApproved: false,
      status: 'Good Standing'
    },
    {
      id: 6,
      customerName: 'Jennifer Williams',
      companyName: 'Williams & Associates',
      phone: '(555) 678-9012',
      companyPhone: '(555) 678-0600',
      balance: 8950.50,
      lastPayment: 0,
      lastPaymentDate: null,
      paymentDue: 4500.00,
      daysAging: 90,
      creditApproved: true,
      status: 'Bad Debt'
    }
  ];

  // Filter and sort customers
  const filteredAndSortedCustomers = useMemo(() => {
    let filtered = mockCustomers.filter(customer => {
      // Search filters
      const customerMatch = customerSearch === '' || 
        customer.customerName.toLowerCase().includes(customerSearch.toLowerCase());
      
      const companyMatch = companySearch === '' || 
        customer.companyName.toLowerCase().includes(companySearch.toLowerCase());
      
      const phoneMatch = phoneSearch === '' || 
        customer.phone.includes(phoneSearch) ||
        customer.companyPhone.includes(phoneSearch);

      // Alert filter
      let alertMatch = true;
      if (alertFilter === '30-days') alertMatch = customer.daysAging >= 30 && customer.daysAging < 45;
      else if (alertFilter === '45-days') alertMatch = customer.daysAging >= 45 && customer.daysAging < 60;
      else if (alertFilter === '60-days') alertMatch = customer.daysAging >= 60;
      else if (alertFilter === 'bad-debt') alertMatch = customer.status === 'Bad Debt';

      // Credit filter
      let creditMatch = true;
      
      // If both checkboxes are unchecked or both are checked, show all
      if (!creditApprovedChecked && !creditNoneChecked) {
        creditMatch = true; // Show all
      } else if (creditApprovedChecked && !creditNoneChecked) {
        creditMatch = customer.creditApproved;
      } else if (!creditApprovedChecked && creditNoneChecked) {
        creditMatch = !customer.creditApproved;
      } else {
        creditMatch = true; // Both checked, show all
      }

      return customerMatch && companyMatch && phoneMatch && alertMatch && creditMatch;
    });

    // Sort customers
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'daysAging':
          aValue = a.daysAging;
          bValue = b.daysAging;
          break;
        case 'balance':
          aValue = a.balance;
          bValue = b.balance;
          break;
        case 'lastPaymentDate':
          aValue = a.lastPaymentDate ? new Date(a.lastPaymentDate).getTime() : 0;
          bValue = b.lastPaymentDate ? new Date(b.lastPaymentDate).getTime() : 0;
          break;
        case 'customerName':
          aValue = a.customerName.toLowerCase();
          bValue = b.customerName.toLowerCase();
          break;
        case 'companyName':
          aValue = a.companyName.toLowerCase();
          bValue = b.companyName.toLowerCase();
          break;
        default:
          aValue = a.daysAging;
          bValue = b.daysAging;
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [mockCustomers, customerSearch, companySearch, phoneSearch, alertFilter, creditApprovedChecked, creditNoneChecked, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
  };

  const getAlertColor = (daysAging, status) => {
    if (status === 'Bad Debt') return 'bg-red-100 text-red-800';
    if (daysAging >= 60) return 'bg-red-100 text-red-800';
    if (daysAging >= 45) return 'bg-orange-100 text-orange-800';
    if (daysAging >= 30) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getAlertIcon = (daysAging, status) => {
    if (status === 'Bad Debt') return <AlertTriangle className="w-4 h-4" />;
    if (daysAging >= 45) return <AlertTriangle className="w-4 h-4" />;
    if (daysAging >= 30) return <Clock className="w-4 h-4" />;
    return <CheckCircle className="w-4 h-4" />;
  };

  // Summary statistics
  const summaryStats = useMemo(() => {
    const totalBalance = filteredAndSortedCustomers.reduce((sum, customer) => sum + customer.balance, 0);
    const totalOverdue = filteredAndSortedCustomers.reduce((sum, customer) => sum + customer.paymentDue, 0);
    const badDebtCount = filteredAndSortedCustomers.filter(customer => customer.status === 'Bad Debt').length;
    const overdueCount = filteredAndSortedCustomers.filter(customer => customer.daysAging >= 30).length;

    return {
      totalBalance,
      totalOverdue,
      badDebtCount,
      overdueCount,
      totalCustomers: filteredAndSortedCustomers.length
    };
  }, [filteredAndSortedCustomers]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Account Billing Summary</h1>
            <p className="text-gray-600 mt-1">Consolidated view of all customer accounts and payment status</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Outstanding</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(summaryStats.totalBalance)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overdue Amount</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(summaryStats.totalOverdue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Overdue Accounts</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.overdueCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Customers</p>
              <p className="text-2xl font-bold text-gray-900">{summaryStats.totalCustomers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Customer Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Search customers..."
              />
            </div>
          </div>

          {/* Company Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Search companies..."
              />
            </div>
          </div>

          {/* Phone Search */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={phoneSearch}
                onChange={(e) => setPhoneSearch(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                placeholder="Search phone numbers..."
              />
            </div>
          </div>

          {/* Alerts Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Alerts</label>
            <select
              value={alertFilter}
              onChange={(e) => setAlertFilter(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="all">All Accounts</option>
              <option value="30-days">30-44 Days</option>
              <option value="45-days">45-59 Days</option>
              <option value="60-days">60+ Days</option>
              <option value="bad-debt">Bad Debt</option>
            </select>
          </div>

          {/* Credit Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Credit Type</label>
            <div className="space-y-2 pt-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={creditApprovedChecked}
                  onChange={(e) => handleCreditApprovedChange(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Credit - Approved</span>
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={creditNoneChecked}
                  onChange={(e) => handleCreditNoneChange(e.target.checked)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">Credit - None</span>
              </label>
              <div className="text-xs text-gray-500 mt-1">
                {!creditApprovedChecked && !creditNoneChecked ? 'Showing: All / Both' : 
                 creditApprovedChecked && creditNoneChecked ? 'Showing: All / Both' :
                 creditApprovedChecked ? 'Showing: Credit Approved Only' : 'Showing: No Credit Only'}
              </div>
            </div>
          </div>

          {/* Balance Sort */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Balance Sort</label>
            <select
              value={balanceSort}
              onChange={(e) => {
                setBalanceSort(e.target.value);
                setSortField('balance');
                setSortDirection(e.target.value === 'highest' ? 'desc' : 'asc');
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="highest">Highest to Lowest</option>
              <option value="lowest">Lowest to Highest</option>
              <option value="oldest">Oldest to Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Customer Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Customer Accounts ({filteredAndSortedCustomers.length})
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('customerName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Customer Name</span>
                    {getSortIcon('customerName')}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('companyName')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Company Name</span>
                    {getSortIcon('companyName')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone - Company</th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('balance')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Balance</span>
                    {getSortIcon('balance')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Payment</th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('lastPaymentDate')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Last Payment Date</span>
                    {getSortIcon('lastPaymentDate')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Due</th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('daysAging')}
                >
                  <div className="flex items-center space-x-1">
                    <span>Days Aging</span>
                    {getSortIcon('daysAging')}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm font-medium text-gray-900">{customer.customerName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{customer.companyName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{customer.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Building className="w-4 h-4 text-gray-400 mr-2" />
                      <div className="text-sm text-gray-900">{customer.companyPhone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">{formatCurrency(customer.balance)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.lastPayment > 0 ? formatCurrency(customer.lastPayment) : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {customer.lastPaymentDate ? formatDate(customer.lastPaymentDate) : 'No payments'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-red-600">
                      {customer.paymentDue > 0 ? formatCurrency(customer.paymentDue) : '-'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getAlertColor(customer.daysAging, customer.status)}`}>
                      {getAlertIcon(customer.daysAging, customer.status)}
                      <span className="ml-1">{customer.daysAging} days</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAndSortedCustomers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No customers found matching your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountBillingSummary;
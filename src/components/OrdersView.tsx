import React, { useState } from 'react';
import {
  Eye, Download, Edit, Truck, Globe, Plus, Trash2, FileText,
  Calendar, CheckCircle, AlertCircle, X
} from 'lucide-react';

const OrdersView = ({ customerData, formatDate, formatCurrency, getOrderStatusColor, viewMode = 'customer' }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');

  // Filter orders based on selected status
  const filteredOrders = customerData?.orders.filter(order => {
    if (statusFilter === 'all') return true;
    return order.payment_status === statusFilter;
  }) || [];

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const OrderDetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
            <button
              onClick={() => setShowOrderDetails(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Order Number</p>
                  <p className="text-lg font-semibold text-gray-900">{selectedOrder.order_number}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Order Date</p>
                  <p className="text-gray-900">{formatDate(selectedOrder.date)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getOrderStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Payment Method</p>
                  <p className="text-gray-900">{selectedOrder.payment_method}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Amount</p>
                  <p className="text-lg font-semibold text-gray-900">{formatCurrency(selectedOrder.total)}</p>
                </div>
                {selectedOrder.tracking_number && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Tracking Number</p>
                    <p className="text-gray-900 font-mono">{selectedOrder.tracking_number}</p>
                  </div>
                )}
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Primary Product</p>
                <p className="text-gray-900">{selectedOrder.primary_product}</p>
                <p className="text-sm text-gray-500 mt-1">+{selectedOrder.items_count - 1} additional items</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Standardized Admin Header - matches Dashboard */}
      {viewMode === 'admin' && (
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
                <ShieldCheck className="w-4 h-4 mr-1" />
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
      )}

      {/* Financial Info Modules - Admin Only */}
      {viewMode === 'admin' && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Paid Sales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    customerData?.orders
                      .filter(order => order.payment_status === 'paid')
                      .reduce((sum, order) => sum + order.total, 0) || 0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Sales</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    customerData?.orders
                      .filter(order => order.payment_status === 'pending')
                      .reduce((sum, order) => sum + order.total, 0) || 0
                  )}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Account Balance</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(customerData?.current_balance)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Open Invoices</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    customerData?.invoices
                      .filter(invoice => invoice.status !== 'paid')
                      .reduce((sum, invoice) => sum + invoice.amount, 0) || 0
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Customer Orders Header - Customer View Only */}
      {viewMode === 'customer' && (
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
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              {viewMode === 'admin' ? 'All Customer Orders' : 'Your Orders'}
            </h3>
            {viewMode === 'admin' && (
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Orders ({customerData?.orders.length || 0})</option>
                  <option value="paid">
                    Paid ({customerData?.orders.filter(order => order.payment_status === 'paid').length || 0})
                  </option>
                  <option value="pending">
                    Pending ({customerData?.orders.filter(order => order.payment_status === 'pending').length || 0})
                  </option>
                  <option value="refunded">
                    Refunded ({customerData?.orders.filter(order => order.payment_status === 'refunded').length || 0})
                  </option>
                  <option value="acct">
                    Account ({customerData?.orders.filter(order => order.payment_status === 'acct').length || 0})
                  </option>
                  <option value="failed">
                    Failed ({customerData?.orders.filter(order => order.payment_status === 'failed').length || 0})
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
              {filteredOrders.map((order) => (
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
                    <button 
                      onClick={() => handleViewOrder(order)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
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
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {statusFilter === 'all' 
                  ? 'No orders found.' 
                  : `No orders found with status "${statusFilter}".`
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && <OrderDetailsModal />}
    </div>
  );
};

export default OrdersView;
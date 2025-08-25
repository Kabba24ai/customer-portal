import React, { useState } from 'react';
import {
  ArrowLeft, Plus, Award, TrendingUp, FileText, DollarSign, Calendar,
  ShoppingCart, Eye, Trash2, Edit, Save, Package, Settings, X,
  Building, User, Mail, Phone, MapPin, ShieldCheck
} from 'lucide-react';

const InvoiceCreationView = ({ 
  customerData, 
  formatCurrency, 
  formatDate,
  onBack,
  onCreateInvoice 
}) => {
  const [invoiceData, setInvoiceData] = useState({
    invoice_number: `INV-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`,
    date: new Date().toISOString().split('T')[0],
    due_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: '',
    items: []
  });

  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [addItemType, setAddItemType] = useState('charge'); // 'charge', 'discount', 'refund', 'order'
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Mock order data with detailed product information
  const mockOrders = [
    {
      id: 1,
      order_number: 'ORD-2025-001',
      date: '2025-01-15',
      status: 'delivered',
      payment_status: 'paid',
      total: 1249.95,
      primary_product: 'Premium Widget Set',
      products: [
        {
          id: 1,
          name: 'Premium Widget Set',
          sku: 'PWS-001',
          quantity: 5,
          unit_price: 199.99,
          total: 999.95,
          options: [
            { name: 'Color', value: 'Blue' },
            { name: 'Size', value: 'Large' },
            { name: 'Material', value: 'Aluminum' }
          ]
        },
        {
          id: 2,
          name: 'Installation Service',
          sku: 'INST-001',
          quantity: 1,
          unit_price: 250.00,
          total: 250.00,
          options: [
            { name: 'Service Type', value: 'On-site Installation' },
            { name: 'Technician Level', value: 'Senior' }
          ]
        }
      ]
    },
    {
      id: 2,
      order_number: 'ORD-2025-002',
      date: '2025-01-20',
      status: 'shipped',
      payment_status: 'paid',
      total: 875.50,
      primary_product: 'Standard Widget Pack',
      products: [
        {
          id: 3,
          name: 'Standard Widget Pack',
          sku: 'SWP-001',
          quantity: 3,
          unit_price: 149.99,
          total: 449.97,
          options: [
            { name: 'Color', value: 'Red' },
            { name: 'Size', value: 'Medium' }
          ]
        },
        {
          id: 4,
          name: 'Express Shipping',
          sku: 'SHIP-EXP',
          quantity: 1,
          unit_price: 25.00,
          total: 25.00,
          options: []
        },
        {
          id: 5,
          name: 'Extended Warranty',
          sku: 'WARR-EXT',
          quantity: 3,
          unit_price: 133.51,
          total: 400.53,
          options: [
            { name: 'Duration', value: '2 Years' },
            { name: 'Coverage', value: 'Full Replacement' }
          ]
        }
      ]
    },
    {
      id: 3,
      order_number: 'ORD-2025-003',
      date: '2025-01-25',
      status: 'processing',
      payment_status: 'acct',
      total: 624.50,
      primary_product: 'Widget Accessories Kit',
      products: [
        {
          id: 6,
          name: 'Widget Accessories Kit',
          sku: 'WAK-001',
          quantity: 2,
          unit_price: 99.99,
          total: 199.98,
          options: [
            { name: 'Kit Type', value: 'Professional' },
            { name: 'Case Included', value: 'Yes' }
          ]
        },
        {
          id: 7,
          name: 'Monthly Maintenance',
          sku: 'MAINT-MON',
          quantity: 1,
          unit_price: 424.52,
          total: 424.52,
          options: [
            { name: 'Service Level', value: 'Premium' },
            { name: 'Response Time', value: '4 Hours' }
          ]
        }
      ]
    }
  ];

  const salesTaxRate = 0.0975; // 9.75%

  const calculateInvoiceTotal = () => {
    const subtotal = invoiceData.items.reduce((sum, item) => sum + item.total, 0);
    const taxAmount = customerData?.tax_exempt ? 0 : subtotal * salesTaxRate;
    return {
      subtotal,
      taxAmount,
      total: subtotal + taxAmount
    };
  };

  const handleAddItem = (itemData) => {
    const newItem = {
      id: Date.now(),
      ...itemData,
      created_at: new Date().toISOString()
    };

    setInvoiceData(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));

    setShowAddItemModal(false);
    setSelectedOrder(null);
  };

  const handleRemoveItem = (itemId) => {
    setInvoiceData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  const handleCreateInvoice = () => {
    const totals = calculateInvoiceTotal();
    const newInvoice = {
      ...invoiceData,
      ...totals,
      customer_id: customerData.id,
      status: 'pending'
    };

    onCreateInvoice(newInvoice);
    onBack();
  };

  // Add Item Modal Component
  const AddItemModal = () => {
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

    const handleSubmit = () => {
      const finalItem = {
        type: addItemType,
        description: getSelectedReasonText(),
        quantity: 1,
        unit_price: breakdown.amount,
        total: breakdown.total,
        baseAmount: breakdown.amount,
        salesTax: breakdown.salesTax,
        person: document.querySelector('select[name="person"]')?.value || '',
        reference: document.querySelector('input[name="reference"]')?.value || '',
        notes: document.querySelector('textarea[name="notes"]')?.value || ''
      };
      handleAddItem(finalItem);
    };

    const getSelectedReasonText = () => {
      const reasonSelect = document.querySelector('select[name="reason"]');
      const selectedOption = reasonSelect?.options[reasonSelect.selectedIndex];
      return selectedOption?.text || '';
    };

    const getReasonOptions = () => {
      switch (addItemType) {
        case 'charge':
          return [
            'New Rental',
            'Rental Extension',
            'Damages',
            'Fuel Charge',
            'Cleaning Charge',
            'Missing Items',
            'Product Purchase'
          ];
        case 'discount':
          return [
            'Volume Discount',
            'Repeat Customer Discount',
            'Damage Waiver Protection',
            'Misc. Management Discount'
          ];
        case 'refund':
          return [
            'Damaged Item',
            'Wrong Item Shipped',
            'Customer Cancellation',
            'Billing Overcharge',
            'Duplicate Charge',
            'Other'
          ];
        default:
          return [];
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 my-8 flex flex-col max-h-[calc(100vh-4rem)]">
          <div className="p-6 border-b border-gray-200 flex-shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                {addItemType === 'charge' && <Plus className="w-5 h-5 mr-2 text-red-600" />}
                {addItemType === 'discount' && <Award className="w-5 h-5 mr-2 text-purple-600" />}
                {addItemType === 'refund' && <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />}
                {addItemType === 'charge' ? 'New Charge' : 
                 addItemType === 'discount' ? 'Apply Discount' : 'Process Refund'}
              </h3>
              <button onClick={() => setShowAddItemModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto flex-1">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {addItemType === 'charge' ? 'Charge Amount' : 
                   addItemType === 'discount' ? 'Discount Amount' : 'Refund Amount'}
                </label>
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

              {!customerData?.tax_exempt && (
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
              )}

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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {addItemType === 'charge' ? 'Charge Reason' : 
                   addItemType === 'discount' ? 'Discount Reason' : 'Refund Reason'}
                </label>
                <select
                  name="reason"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select {addItemType} reason</option>
                  {getReasonOptions().map((reason, index) => (
                    <option key={index} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Person Responsible</label>
                <select
                  name="person"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select person responsible</option>
                  <option value="sarah-johnson">Sarah Johnson</option>
                  <option value="michael-chen">Michael Chen</option>
                  <option value="emily-rodriguez">Emily Rodriguez</option>
                  <option value="david-thompson">David Thompson</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reference (Optional)</label>
                <input
                  type="text"
                  name="reference"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter reference number or ID..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  name="notes"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder={`Describe the reason for this ${addItemType}...`}
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex-shrink-0">
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddItemModal(false)}
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {addItemType === 'charge' ? 'Add Charge' : 
                 addItemType === 'discount' ? 'Apply Discount' : 'Process Refund'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Order Selection Modal
  const OrderSelectionModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
              Select Order to Add to Invoice
            </h3>
            <button onClick={() => setShowAddItemModal(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Primary Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.order_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(order.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.primary_product}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatCurrency(order.total)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                        order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowOrderDetails(true);
                        }}
                        className="text-blue-600 hover:text-blue-900 inline-flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </button>
                      <button
                        onClick={() => {
                          // Add each product from the order as individual line items
                          order.products.forEach(product => {
                            const productItem = {
                              type: 'order_product',
                              description: product.name,
                              quantity: product.quantity,
                              unit_price: product.unit_price,
                              total: product.total,
                              baseAmount: product.total,
                              salesTax: 0,
                              order_id: order.id,
                              order_number: order.order_number,
                              order_date: order.date,
                              order_status: order.status,
                              payment_status: order.payment_status,
                              product_sku: product.sku,
                              product_options: product.options,
                              notes: `From Order ${order.order_number}`
                            };
                            handleAddItem(productItem);
                          });
                        }}
                        className="ml-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md text-sm inline-flex items-center"
                      >
                        <Plus className="w-4 h-4 mr-1" />
                        Add to Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  // Order Details Modal
  const OrderDetailsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Order Details - {selectedOrder?.order_number}
            </h3>
            <button onClick={() => setShowOrderDetails(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order Date</p>
                    <p className="text-gray-900">{formatDate(selectedOrder.date)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order Total</p>
                    <p className="text-lg font-semibold text-gray-900">{formatCurrency(selectedOrder.total)}</p>
                  </div>
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-4">Products in this Order</h4>
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-900">Add All Products from Order</p>
                      <p className="text-xs text-blue-700 mt-1">
                        This will add each product as individual line items to the invoice. Total: {formatCurrency(selectedOrder.total)}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        // Add each product from the order as individual line items
                        selectedOrder.products.forEach(product => {
                          const productItem = {
                            type: 'order_product',
                            description: product.name,
                            quantity: product.quantity,
                            unit_price: product.unit_price,
                            total: product.total,
                            baseAmount: product.total,
                            salesTax: 0,
                            order_id: selectedOrder.id,
                            order_number: selectedOrder.order_number,
                            order_date: selectedOrder.date,
                            order_status: selectedOrder.status,
                            payment_status: selectedOrder.payment_status,
                            product_sku: product.sku,
                            product_options: product.options,
                            notes: `From Order ${selectedOrder.order_number}`
                          };
                          handleAddItem(productItem);
                        });
                        setShowOrderDetails(false);
                      }}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add to Invoice</span>
                    </button>
                  </div>
                </div>
                <div className="space-y-4">
                  {selectedOrder.products.map((product) => (
                    <div key={product.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h5 className="font-medium text-gray-900">{product.name}</h5>
                          <p className="text-sm text-gray-500">SKU: {product.sku}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatCurrency(product.total)}</p>
                          <p className="text-sm text-gray-500">
                            {product.quantity} × {formatCurrency(product.unit_price)}
                          </p>
                        </div>
                      </div>

                      {product.options.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-2">Product Options:</p>
                          <div className="grid grid-cols-2 gap-2">
                            {product.options.map((option, index) => (
                              <div key={index} className="flex items-center space-x-2">
                                <Settings className="w-3 h-3 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                  <strong>{option.name}:</strong> {option.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const totals = calculateInvoiceTotal();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <button
                onClick={onBack}
                className="mr-4 p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Create New Invoice</h1>
                <p className="text-gray-600">Create and manage invoice for {customerData?.company_name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateInvoice}
                disabled={invoiceData.items.length === 0}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Create Invoice ({formatCurrency(totals.total)})
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Invoice Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Invoice Header */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Number</label>
                  <input
                    type="text"
                    value={invoiceData.invoice_number}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, invoice_number: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date</label>
                  <input
                    type="date"
                    value={invoiceData.date}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={invoiceData.due_date}
                    onChange={(e) => setInvoiceData(prev => ({ ...prev, due_date: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Add Items Section */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Invoice Items</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setAddItemType('charge');
                      setShowAddItemModal(true);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Charge</span>
                  </button>
                  <button
                    onClick={() => {
                      setAddItemType('discount');
                      setShowAddItemModal(true);
                    }}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm flex items-center space-x-2"
                  >
                    <Award className="w-4 h-4" />
                    <span>Discount</span>
                  </button>
                  <button
                    onClick={() => {
                      setAddItemType('refund');
                      setShowAddItemModal(true);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm flex items-center space-x-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Refund</span>
                  </button>
                  <button
                    onClick={() => {
                      setAddItemType('order');
                      setShowAddItemModal(true);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm flex items-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>From Order</span>
                  </button>
                </div>
              </div>

              {/* Items Table */}
              {invoiceData.items.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border border-gray-200 rounded-lg">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {invoiceData.items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div>
                              <p className="text-sm font-medium text-gray-900">{item.description}</p>
                              {item.type === 'order_product' && (
                                <div className="mt-1">
                                  <div className="flex items-center space-x-2 mt-1">
                                    <span className="text-xs text-gray-500">SKU: {item.product_sku}</span>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-xs text-gray-500">Order: {item.order_number}</span>
                                  </div>
                                  {item.product_options && item.product_options.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {item.product_options.map((option, index) => (
                                        <span key={index} className="inline-block bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded">
                                          {option.name}: {option.value}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              )}
                              {item.notes && (
                                <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatCurrency(item.unit_price)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                            {formatCurrency(item.total)}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                            <button
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12 border border-gray-200 rounded-lg bg-gray-50">
                  <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No items added to this invoice yet.</p>
                  <p className="text-sm text-gray-400 mt-1">Use the buttons above to add charges, discounts, refunds, or items from existing orders.</p>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Notes</h3>
              <textarea
                value={invoiceData.notes}
                onChange={(e) => setInvoiceData(prev => ({ ...prev, notes: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter any additional notes for this invoice..."
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Info */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2" />
                Bill To
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="font-medium text-gray-900">{customerData?.company_name}</p>
                  <p className="text-gray-700">{customerData?.first_name} {customerData?.last_name}</p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {customerData?.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {customerData?.phone}
                </div>
                <div className="flex items-start text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                  <div className="whitespace-pre-line">{customerData?.billing_address}</div>
                </div>
                {customerData?.tax_exempt && (
                  <div className="flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm font-medium text-green-600">Tax Exempt</span>
                  </div>
                )}
              </div>
            </div>

            {/* Invoice Totals */}
            {invoiceData.items.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="font-medium text-gray-900">{formatCurrency(totals.subtotal)}</span>
                  </div>
                  {!customerData?.tax_exempt && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Sales Tax (9.75%):</span>
                      <span className="font-medium text-gray-900">{formatCurrency(totals.taxAmount)}</span>
                    </div>
                  )}
                  {customerData?.tax_exempt && (
                    <div className="flex justify-between">
                      <span className="text-gray-700">Sales Tax:</span>
                      <span className="font-medium text-green-600">Tax Exempt</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-gray-300 pt-3">
                    <span className="text-lg font-semibold text-gray-900">Total:</span>
                    <span className="text-lg font-bold text-gray-900">{formatCurrency(totals.total)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sub-modals */}
      {showAddItemModal && addItemType !== 'order' && <AddItemModal />}
      {showAddItemModal && addItemType === 'order' && <OrderSelectionModal />}
      {showOrderDetails && <OrderDetailsModal />}
    </div>
  );
};

export default InvoiceCreationView;
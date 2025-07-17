import React, { useState } from 'react';
import { 
  User, Building, Phone, Mail, MapPin, Globe, Edit, Save, X, ShieldCheck,
  Upload, FileText, Calendar, Shield, CreditCard, AlertCircle, 
  CheckCircle, Clock, UserCheck, DollarSign, Users, Award
} from 'lucide-react';

const AccountView = ({ customerData, formatDate, formatCurrency, viewMode = 'customer' }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(customerData);
  const [billingAddress, setBillingAddress] = useState({
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [deliveryAddress, setDeliveryAddress] = useState({
    address: '',
    city: '',
    state: '',
    zip: ''
  });
  const [showTaxUpload, setShowTaxUpload] = useState(false);
  const [showCreditApproval, setShowCreditApproval] = useState(false);
  const [creditApprovalData, setCreditApprovalData] = useState({
    creditLimit: '',
    approvedBy: '',
    approvalReason: '',
    notes: ''
  });

  // US States dropdown options
  const usStates = [
    { value: '', label: 'Select State' },
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];

  // Parse address string into components
  const parseAddress = (addressString) => {
    if (!addressString) return { address: '', city: '', state: '', zip: '' };
    
    // Split by commas and clean up
    const parts = addressString.split(',').map(part => part.trim());
    
    if (parts.length >= 3) {
      const address = parts[0] || '';
      const city = parts[1] || '';
      
      // Parse the last part which should contain state and zip
      const lastPart = parts[2] || '';
      const stateZipMatch = lastPart.match(/^([A-Z]{2})\s+(\d{5}(?:-\d{4})?)$/);
      
      if (stateZipMatch) {
        return {
          address,
          city,
          state: stateZipMatch[1],
          zip: stateZipMatch[2]
        };
      }
    }
    
    // Fallback: return the original string in address field
    return { address: addressString, city: '', state: '', zip: '' };
  };

  // Combine address components into formatted string
  const combineAddress = (addressObj) => {
    const { address, city, state, zip } = addressObj;
    if (!address && !city && !state && !zip) return '';
    
    let result = address;
    if (city) result += `, ${city}`;
    if (state && zip) result += `, ${state} ${zip}`;
    else if (state) result += `, ${state}`;
    else if (zip) result += `, ${zip}`;
    
    return result;
  };

  // Initialize address components when editing starts
  const startEditing = () => {
    setIsEditing(true);
    setBillingAddress(parseAddress(customerData.billing_address));
    setDeliveryAddress(parseAddress(customerData.delivery_address));
  };

  const handleSave = () => {
    // Combine address components back into strings
    const updatedData = {
      ...editData,
      billing_address: combineAddress(billingAddress),
      delivery_address: combineAddress(deliveryAddress)
    };
    
    // Here you would make an API call to save the data
    setIsEditing(false);
    // Update customer data in parent component with updatedData
  };

  const handleCancel = () => {
    setEditData(customerData);
    setBillingAddress(parseAddress(customerData.billing_address));
    setDeliveryAddress(parseAddress(customerData.delivery_address));
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCreditApproval = () => {
    // Here you would make an API call to approve the credit account
    console.log('Approving credit account:', creditApprovalData);
    setShowCreditApproval(false);
    // Update customer data to reflect approval
  };

  const CreditApprovalModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <UserCheck className="w-5 h-5 mr-2 text-green-600" />
              Approve Customer Credit Account
            </h3>
            <button
              onClick={() => setShowCreditApproval(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center">
                <AlertCircle className="w-5 h-5 text-blue-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Credit Account Approval</p>
                  <p className="text-xs text-blue-700 mt-1">
                    You are about to approve this customer for a credit account. This will allow them to make purchases on credit terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Customer Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Customer Information</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-500">Company:</span>
                  <span className="ml-2 text-gray-900">{customerData.company_name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Contact:</span>
                  <span className="ml-2 text-gray-900">{customerData.first_name} {customerData.last_name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Customer ID:</span>
                  <span className="ml-2 text-gray-900 font-mono">{customerData.unique_id}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-500">Customer Since:</span>
                  <span className="ml-2 text-gray-900">{formatDate(customerData.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Credit Limit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Credit Limit <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="number"
                  value={creditApprovalData.creditLimit}
                  onChange={(e) => setCreditApprovalData(prev => ({ ...prev, creditLimit: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter credit limit amount"
                  min="0"
                  step="100"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Recommended range: $1,000 - $50,000 based on company size and history
              </p>
            </div>

            {/* Approved By */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approved By <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  value={creditApprovalData.approvedBy}
                  onChange={(e) => setCreditApprovalData(prev => ({ ...prev, approvedBy: e.target.value }))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select approving authority</option>
                  <option value="credit-manager">Credit Manager - Sarah Johnson</option>
                  <option value="sales-director">Sales Director - Michael Chen</option>
                  <option value="finance-director">Finance Director - Emily Rodriguez</option>
                  <option value="general-manager">General Manager - David Thompson</option>
                  <option value="ceo">CEO - Jennifer Williams</option>
                </select>
              </div>
            </div>

            {/* Approval Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Approval Reason <span className="text-red-500">*</span>
              </label>
              <select
                value={creditApprovalData.approvalReason}
                onChange={(e) => setCreditApprovalData(prev => ({ ...prev, approvalReason: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select approval reason</option>
                <option value="established-business">Established Business with Good Credit History</option>
                <option value="financial-statements">Strong Financial Statements Provided</option>
                <option value="trade-references">Positive Trade References Verified</option>
                <option value="bank-references">Bank References Confirmed</option>
                <option value="existing-relationship">Existing Business Relationship</option>
                <option value="credit-report">Favorable Credit Report</option>
                <option value="collateral-secured">Secured by Collateral</option>
                <option value="management-decision">Management Decision</option>
              </select>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                value={creditApprovalData.notes}
                onChange={(e) => setCreditApprovalData(prev => ({ ...prev, notes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Enter any additional notes about this approval..."
              />
            </div>

            {/* Terms and Conditions */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <Award className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-yellow-900">Credit Terms</p>
                  <ul className="text-xs text-yellow-800 mt-1 space-y-1">
                    <li>• Payment terms: Net 30 days from invoice date</li>
                    <li>• Late payment fee: 1.5% per month on overdue amounts</li>
                    <li>• Credit review: Annual or when limit increase requested</li>
                    <li>• Account suspension: Automatic if 60+ days overdue</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 mt-8">
            <button
              onClick={() => setShowCreditApproval(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              onClick={handleCreditApproval}
              disabled={!creditApprovalData.creditLimit || !creditApprovalData.approvedBy || !creditApprovalData.approvalReason}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Approve Credit Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  const TaxUploadModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Upload Tax Exempt Document</h3>
            <button
              onClick={() => setShowTaxUpload(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-gray-500">
                PDF, JPG, PNG files up to 10MB
              </p>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="tax-document-upload"
              />
              <label
                htmlFor="tax-document-upload"
                className="mt-3 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm cursor-pointer"
              >
                Choose File
              </label>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Document Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="tax-exempt-certificate">Tax Exempt Certificate</option>
              <option value="resale-certificate">Resale Certificate</option>
              <option value="non-profit-exemption">Non-Profit Exemption</option>
            </select>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={() => setShowTaxUpload(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700">
              Upload Document
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Account Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {viewMode === 'admin' ? 'Customer Account Management' : 'Account Settings'}
            </h2>
            <p className="text-gray-600 mt-1">
              {viewMode === 'admin' 
                ? 'Manage customer account information and administrative settings'
                : 'Manage your account information and preferences'
              }
            </p>
          </div>
          <div className="flex items-center space-x-3">
            {viewMode === 'admin' && (
              <div className="flex items-center space-x-2 mr-4">
                <span className="text-sm text-gray-500">Admin Actions:</span>
                <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs">
                  Suspend Account
                </button>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-xs">
                  Reset Password
                </button>
              </div>
            )}
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </>
            ) : (
              <button
                onClick={startEditing}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Information</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Account Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">First Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{customerData.first_name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Last Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-900">{customerData.last_name}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
              {isEditing ? (
                <input
                  type="email"
                  value={editData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  {customerData.email}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {customerData.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Company Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Company Name</label>
              {isEditing ? (
                <input
                  type="text"
                  value={editData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">{customerData.company_name}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Company Phone</label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editData.company_phone}
                  onChange={(e) => handleInputChange('company_phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  {customerData.company_phone}
                </p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Website</label>
              {isEditing ? (
                <input
                  type="url"
                  value={editData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-900">
                  {customerData.website ? (
                    <a href={customerData.website} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800">
                      <Globe className="w-4 h-4 mr-2" />
                      {customerData.website}
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">Not provided</span>
                  )}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Addresses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Billing Address */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Billing Address
          </h3>
          <div>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={billingAddress.address}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Street address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={billingAddress.city}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input
                      type="text"
                      value={billingAddress.zip}
                      onChange={(e) => setBillingAddress(prev => ({ ...prev, zip: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="12345"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select
                    value={billingAddress.state}
                    onChange={(e) => setBillingAddress(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {usStates.map(state => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <p className="text-gray-900 whitespace-pre-line">{customerData.billing_address}</p>
            )}
          </div>
        </div>

        {/* Delivery Address */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Delivery Address
          </h3>
          <div>
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    value={deliveryAddress.address}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, address: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Street address"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={deliveryAddress.city}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="City"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                    <input
                      type="text"
                      value={deliveryAddress.zip}
                      onChange={(e) => setDeliveryAddress(prev => ({ ...prev, zip: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="12345"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select
                    value={deliveryAddress.state}
                    onChange={(e) => setDeliveryAddress(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {usStates.map(state => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              <p className="text-gray-900 whitespace-pre-line">{customerData.delivery_address}</p>
            )}
          </div>
        </div>
      </div>

      {/* Account Status & Credit Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Status */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Account Status
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Account Status:</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                customerData.status === 'Good Standing' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {customerData.status}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Account Approved:</span>
              <span className="flex items-center">
                {customerData.account_approved ? (
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-yellow-500 mr-1" />
                )}
                <span className="text-sm text-gray-900">
                  {customerData.account_approved ? 'Approved' : 'Pending Approval'}
                </span>
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Customer Since:</span>
              <span className="text-sm text-gray-900">{formatDate(customerData.created_at)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Customer ID:</span>
              <span className="text-sm font-mono text-gray-900">{customerData.unique_id}</span>
            </div>
          </div>
        </div>

        {/* Credit Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Credit Information
            {viewMode === 'admin' && (
              <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Admin View</span>
            )}
          </h3>
          <div className="space-y-4">
          {/* Check if customer has approved credit account */}
          {!customerData.account_approved || !customerData.credit_limit ? (
            <div className="space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Credit Account Not Approved</p>
                    <p className="text-xs text-yellow-700 mt-1">
                      This customer does not have an approved credit account. They can only make cash/card purchases.
                    </p>
                  </div>
                </div>
              </div>
              
              {viewMode === 'admin' && (
                <div className="space-y-3">
                  <button
                    onClick={() => setShowCreditApproval(true)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg text-sm flex items-center justify-center space-x-2"
                  >
                    <UserCheck className="w-4 h-4" />
                    <span>Approve Credit Account</span>
                  </button>
                  
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Review customer's financial information</p>
                    <p>• Verify trade and bank references</p>
                    <p>• Set appropriate credit limit</p>
                    <p>• Document approval authority</p>
                  </div>
                </div>
              )}
              
              {viewMode === 'customer' && (
                <div className="text-center py-4">
                  <p className="text-sm text-gray-600 mb-3">
                    To apply for a credit account, please contact our sales team.
                  </p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm">
                    Contact Sales Team
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Existing approved credit account display */
            <>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Credit Limit:</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(customerData.credit_limit)}</span>
                {viewMode === 'admin' && (
                  <button className="text-blue-600 hover:text-blue-800 text-xs">
                    <Edit className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Current Balance:</span>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-semibold text-gray-900">{formatCurrency(customerData.current_balance)}</span>
                {viewMode === 'admin' && (
                  <button className="text-green-600 hover:text-green-800 text-xs">
                    Adjust
                  </button>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-500">Available Credit:</span>
              <span className="text-sm font-semibold text-green-600">{formatCurrency(customerData.available_credit)}</span>
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Credit Utilization</span>
                <span>{Math.round((customerData.current_balance / customerData.credit_limit) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(customerData.current_balance / customerData.credit_limit) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Credit Approval History - Admin Only */}
            {viewMode === 'admin' && customerData.credit_approval && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="text-sm font-medium text-gray-900 mb-3">Credit Approval History</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Approved By:</span>
                    <span className="text-gray-900">{customerData.credit_approval.approved_by}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Approval Date:</span>
                    <span className="text-gray-900">{formatDate(customerData.credit_approval.approval_date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Reason:</span>
                    <span className="text-gray-900">{customerData.credit_approval.reason}</span>
                  </div>
                  {customerData.credit_approval.notes && (
                    <div className="mt-2">
                      <span className="text-gray-500">Notes:</span>
                      <p className="text-gray-900 mt-1">{customerData.credit_approval.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            </>
          )}
        </div>
        </div>
      </div>

      {/* Tax Exempt Information */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <ShieldCheck className="w-5 h-5 mr-2" />
            Tax Exempt Status
            {viewMode === 'admin' && (
              <span className="ml-2 text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Admin Control</span>
            )}
          </h3>
          {(!customerData.tax_exempt || viewMode === 'admin') && (
            <button
              onClick={() => setShowTaxUpload(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>
                {viewMode === 'admin' ? 'Manage Tax Documents' : 'Upload Tax Document'}
              </span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-500">Tax Status:</span>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                customerData.tax_exempt ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {customerData.tax_exempt ? 'Tax Exempt' : 'Taxable'}
              </span>
            </div>

            {customerData.tax_exempt && (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-500">Valid Until:</span>
                  <span className="text-sm text-gray-900">{formatDate(customerData.tax_document.valid_until)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Uploaded:</span>
                  <span className="text-sm text-gray-900">{formatDate(customerData.tax_document.upload_date)}</span>
                </div>
              </>
            )}
          </div>

          {customerData.tax_document && (
            <div>
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{customerData.tax_document.filename}</p>
                      <p className="text-xs text-gray-500">
                        Status: <span className={`font-medium ${
                          customerData.tax_document.status === 'approved' ? 'text-green-600' : 
                          customerData.tax_document.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {customerData.tax_document.status === 'approved' ? 'Approved' :
                           customerData.tax_document.status === 'rejected' ? 'Rejected' : 'Pending Review'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      View
                    </button>
                    {viewMode === 'admin' ? (
                      <>
                        <button className="text-green-600 hover:text-green-800 text-sm">
                          Approve
                        </button>
                        <button className="text-red-600 hover:text-red-800 text-sm">
                          Reject
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setShowTaxUpload(true)}
                        className="text-green-600 hover:text-green-800 text-sm"
                      >
                        Replace
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tax Upload Modal */}
      {showTaxUpload && <TaxUploadModal />}
      
      {/* Credit Approval Modal */}
      {showCreditApproval && <CreditApprovalModal />}
    </div>
  );
};

export default AccountView;
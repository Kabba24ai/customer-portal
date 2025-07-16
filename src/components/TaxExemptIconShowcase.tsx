import React from 'react';
import { ShieldCheck, FileCheck, BadgeCheck, Receipt, FileText } from 'lucide-react';

const TaxExemptIconShowcase = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Exempt Icon Showcase</h1>
          <p className="text-gray-600">Comparing different icon options for tax exempt status in your Customer Portal</p>
        </div>

        {/* Icon Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ShieldCheck - Recommended */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">ShieldCheck (Recommended)</h3>
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">Recommended</span>
            </div>
            
            {/* Different sizes and contexts */}
            <div className="space-y-4">
              {/* In badge context (current usage) */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">In Tax Status Badge:</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  Tax Exempt
                </div>
              </div>

              {/* Different sizes */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Different Sizes:</p>
                <div className="flex items-center space-x-4">
                  <ShieldCheck className="w-3 h-3 text-green-600" />
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <ShieldCheck className="w-6 h-6 text-green-600" />
                  <ShieldCheck className="w-8 h-8 text-green-600" />
                </div>
              </div>

              {/* In different color contexts */}
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Color Variations:</p>
                <div className="space-y-2">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    Tax Exempt
                  </div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    Taxable
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FileCheck */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">FileCheck</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">In Tax Status Badge:</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <FileCheck className="w-4 h-4 mr-1" />
                  Tax Exempt
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Different Sizes:</p>
                <div className="flex items-center space-x-4">
                  <FileCheck className="w-3 h-3 text-green-600" />
                  <FileCheck className="w-4 h-4 text-green-600" />
                  <FileCheck className="w-5 h-5 text-green-600" />
                  <FileCheck className="w-6 h-6 text-green-600" />
                  <FileCheck className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* BadgeCheck */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">BadgeCheck</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">In Tax Status Badge:</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <BadgeCheck className="w-4 h-4 mr-1" />
                  Tax Exempt
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Different Sizes:</p>
                <div className="flex items-center space-x-4">
                  <BadgeCheck className="w-3 h-3 text-green-600" />
                  <BadgeCheck className="w-4 h-4 text-green-600" />
                  <BadgeCheck className="w-5 h-5 text-green-600" />
                  <BadgeCheck className="w-6 h-6 text-green-600" />
                  <BadgeCheck className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Receipt */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Receipt</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">In Tax Status Badge:</p>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <Receipt className="w-4 h-4 mr-1" />
                  Tax Exempt
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-500 mb-2">Different Sizes:</p>
                <div className="flex items-center space-x-4">
                  <Receipt className="w-3 h-3 text-green-600" />
                  <Receipt className="w-4 h-4 text-green-600" />
                  <Receipt className="w-5 h-5 text-green-600" />
                  <Receipt className="w-6 h-6 text-green-600" />
                  <Receipt className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current vs Recommended Comparison */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current vs Recommended</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Current */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Current (FileText)</h4>
              <div className="space-y-3">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <FileText className="w-4 h-4 mr-1" />
                  Tax Exempt
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  <FileText className="w-4 h-4 mr-1" />
                  Taxable
                </div>
              </div>
            </div>

            {/* Recommended */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Recommended (ShieldCheck)</h4>
              <div className="space-y-3">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  Tax Exempt
                </div>
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  <ShieldCheck className="w-4 h-4 mr-1" />
                  Taxable
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Real Application Context */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">In Your Application Context</h3>
          
          {/* Mock customer header with ShieldCheck */}
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-900">John Doe</h1>
                <p className="text-gray-600 mt-1">Account: CUST-001 • Acme Corp</p>
              </div>
              <div className="flex items-center">
                <div className="text-center mr-8">
                  <p className="text-sm font-medium text-gray-500 mb-1">Tax Status</p>
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    <ShieldCheck className="w-4 h-4 mr-1" />
                    Tax Exempt
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Valid until Dec 31, 2027</p>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  Good Standing
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pros and Cons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Why ShieldCheck is Recommended</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-md font-medium text-green-700 mb-3 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-2" />
                Advantages
              </h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Conveys "protected status" (tax exempt)</li>
                <li>• Professional and authoritative appearance</li>
                <li>• Checkmark indicates verified/approved status</li>
                <li>• Works well in both green and gray color schemes</li>
                <li>• Intuitive meaning for business users</li>
                <li>• Consistent with security/status theme</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-3">Other Options</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><strong>FileCheck:</strong> Good for document focus, but less about status</li>
                <li><strong>BadgeCheck:</strong> Clean but generic badge appearance</li>
                <li><strong>Receipt:</strong> Tax-specific but more transactional</li>
                <li><strong>FileText (current):</strong> Generic document icon</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxExemptIconShowcase;
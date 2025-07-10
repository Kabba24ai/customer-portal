@extends('layouts.app')

@section('content')
<div class="space-y-6">
    <!-- Customer Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
            <div>
                <h1 class="text-2xl font-bold text-gray-900">{{ $customer->full_name }}</h1>
                <p class="text-gray-600 mt-1">Account: {{ $customer->unique_id }} • {{ $customer->company_name }}</p>
            </div>
            <div class="flex items-center">
                <div class="text-center mr-8">
                    <p class="text-sm font-medium text-gray-500 mb-1">Tax Status</p>
                    <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium {{ $customer->tax_exempt ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800' }}">
                        @include('components.icon', ['name' => 'file-text', 'class' => 'w-4 h-4 mr-1'])
                        {{ $customer->tax_exempt ? 'Tax Exempt' : 'Taxable' }}
                    </div>
                    @if($customer->tax_exempt && $customer->taxDocument)
                        <p class="text-xs text-gray-500 mt-1">
                            Valid until {{ $customer->taxDocument->valid_until->format('M j, Y') }}
                        </p>
                    @endif
                </div>
            </div>
            <div class="text-right">
                <div class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-2 {{ $customer->status === 'Good Standing' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800' }}">
                    {{ $customer->status }}
                </div>
                <div>
                    @if($customer->website)
                        <a href="{{ $customer->website }}" target="_blank" 
                           class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
                            @include('components.icon', ['name' => 'globe', 'class' => 'w-4 h-4'])
                            <span>Visit Website</span>
                        </a>
                    @endif
                </div>
            </div>
        </div>
    </div>

    <!-- Account Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
                <div class="p-2 bg-blue-100 rounded-lg">
                    @include('components.icon', ['name' => 'dollar-sign', 'class' => 'w-6 h-6 text-blue-600'])
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Current Balance</p>
                    <p class="text-2xl font-bold text-gray-900">${{ number_format($customer->current_balance, 2) }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
                <div class="p-2 bg-green-100 rounded-lg">
                    @include('components.icon', ['name' => 'trending-up', 'class' => 'w-6 h-6 text-green-600'])
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Available Credit</p>
                    <p class="text-2xl font-bold text-gray-900">${{ number_format($customer->available_credit, 2) }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
                <div class="p-2 bg-yellow-100 rounded-lg">
                    @include('components.icon', ['name' => 'file-text', 'class' => 'w-6 h-6 text-yellow-600'])
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Open Invoices</p>
                    <p class="text-2xl font-bold text-gray-900">{{ $customer->invoices->where('status', '!=', 'paid')->count() }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
                <div class="p-2 bg-green-100 rounded-lg">
                    @include('components.icon', ['name' => 'calendar', 'class' => 'w-6 h-6 text-green-600'])
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Last Payment</p>
                    <p class="text-2xl font-bold text-gray-900">
                        @if($customer->payments->count() > 0)
                            {{ $customer->payments->sortByDesc('date')->first()->date->format('M j, Y') }}
                        @else
                            No payments
                        @endif
                    </p>
                </div>
            </div>
        </div>
    </div>

    <!-- Recent Orders -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <a href="{{ route('customer.orders', $customer) }}" 
                   class="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View All
                </a>
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @foreach($customer->orders->take(3) as $order)
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {{ $order->order_number }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ $order->primary_product }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                ${{ number_format($order->total, 2) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ $order->payment_method }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full {{ $order->payment_status_color }}">
                                    {{ $order->payment_status === 'acct' ? 'Acct.' : ucfirst($order->payment_status) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ $order->date->format('M j, Y') }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button class="text-blue-600 hover:text-blue-900 mr-3">
                                    @include('components.icon', ['name' => 'eye', 'class' => 'h-4 w-4'])
                                </button>
                                <button class="text-green-600 hover:text-green-900">
                                    @include('components.icon', ['name' => 'download', 'class' => 'h-4 w-4'])
                                </button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
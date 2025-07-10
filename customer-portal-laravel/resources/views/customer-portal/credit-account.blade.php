@extends('layouts.app')

@section('content')
<div class="space-y-6">
    <!-- Credit Account Header -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div class="flex items-center justify-between">
            <div>
                <h2 class="text-2xl font-bold text-gray-900">Credit Account</h2>
                <p class="text-gray-600 mt-1">View your credit account balance and transaction history</p>
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
                    @include('components.icon', ['name' => 'alert-circle', 'class' => 'w-6 h-6 text-yellow-600'])
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Credit Limit</p>
                    <p class="text-2xl font-bold text-gray-900">${{ number_format($customer->credit_limit, 2) }}</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div class="flex items-center">
                <div class="p-2 bg-purple-100 rounded-lg">
                    @include('components.icon', ['name' => 'calendar', 'class' => 'w-6 h-6 text-purple-600'])
                </div>
                <div class="ml-4">
                    <p class="text-sm font-medium text-gray-500">Credit Utilization</p>
                    <p class="text-2xl font-bold text-gray-900">{{ round($customer->credit_utilization) }}%</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Credit Utilization Bar -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Credit Utilization</h3>
        <div class="space-y-2">
            <div class="flex justify-between text-sm text-gray-600">
                <span>Used: ${{ number_format($customer->current_balance, 2) }}</span>
                <span>Available: ${{ number_format($customer->available_credit, 2) }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                     style="width: {{ $customer->credit_utilization }}%"></div>
            </div>
            <div class="text-center text-sm text-gray-500">
                Credit Limit: ${{ number_format($customer->credit_limit, 2) }}
            </div>
        </div>
    </div>

    <!-- Transactions Table -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-200">
        <div class="p-6 border-b border-gray-200">
            <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Transaction History</h3>
                <div class="flex items-center space-x-4">
                    <label class="text-sm font-medium text-gray-700">Filter by Type:</label>
                    <form method="GET" action="{{ route('customer.credit-account', $customer) }}">
                        <select name="type" onchange="this.form.submit()" 
                                class="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <option value="all" {{ $transactionFilter === 'all' ? 'selected' : '' }}>
                                All Transactions ({{ $customer->transactions->count() }})
                            </option>
                            <option value="charge" {{ $transactionFilter === 'charge' ? 'selected' : '' }}>
                                Charges ({{ $customer->transactions->where('type', 'charge')->count() }})
                            </option>
                            <option value="payment" {{ $transactionFilter === 'payment' ? 'selected' : '' }}>
                                Payments ({{ $customer->transactions->where('type', 'payment')->count() }})
                            </option>
                            <option value="refund" {{ $transactionFilter === 'refund' ? 'selected' : '' }}>
                                Refunds ({{ $customer->transactions->where('type', 'refund')->count() }})
                            </option>
                            <option value="discount" {{ $transactionFilter === 'discount' ? 'selected' : '' }}>
                                Discounts ({{ $customer->transactions->where('type', 'discount')->count() }})
                            </option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales Tax</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Balance Change</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Running Balance</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    @forelse($transactions as $transaction)
                        <tr class="hover:bg-gray-50">
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {{ $transaction->date->format('M j, Y') }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium {{ $transaction->type_color }}">
                                    @include('components.icon', ['name' => 'plus', 'class' => 'w-4 h-4 mr-1'])
                                    {{ ucfirst($transaction->type) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-900">
                                <div class="max-w-xs truncate">{{ $transaction->description }}</div>
                                @if($transaction->reference)
                                    <div class="text-xs text-gray-500">Ref: {{ $transaction->reference }}</div>
                                @endif
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                ${{ number_format(abs($transaction->amount), 2) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                ${{ number_format(abs($transaction->sales_tax), 2) }}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                                <span class="{{ $transaction->balance_change >= 0 ? 'text-red-600' : 'text-green-600' }}">
                                    {{ $transaction->balance_change >= 0 ? '+' : '' }}${{ number_format($transaction->balance_change, 2) }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                ${{ number_format($transaction->running_balance, 2) }}
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
                    @empty
                        <tr>
                            <td colspan="8" class="text-center py-12">
                                <p class="text-gray-500">
                                    {{ $transactionFilter === 'all' ? 'No transactions found.' : "No transactions found with type \"{$transactionFilter}\"." }}
                                </p>
                            </td>
                        </tr>
                    @endforelse
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\View\View;

class AdminPortalController extends Controller
{
    public function dashboard(Customer $customer): View
    {
        $customer->load(['invoices', 'orders', 'payments', 'transactions', 'taxDocument']);
        
        return view('admin-portal.dashboard', compact('customer'));
    }

    public function orders(Customer $customer, Request $request): View
    {
        $statusFilter = $request->get('status', 'all');
        
        $orders = $customer->orders();
        
        if ($statusFilter !== 'all') {
            $orders->where('payment_status', $statusFilter);
        }
        
        $orders = $orders->orderBy('date', 'desc')->get();
        
        return view('admin-portal.orders', compact('customer', 'orders', 'statusFilter'));
    }

    public function creditAccount(Customer $customer, Request $request): View
    {
        $transactionFilter = $request->get('type', 'all');
        
        $transactions = $customer->transactions();
        
        if ($transactionFilter !== 'all') {
            $transactions->where('type', $transactionFilter);
        }
        
        $transactions = $transactions->orderBy('date', 'desc')->get();
        
        return view('admin-portal.credit-account', compact('customer', 'transactions', 'transactionFilter'));
    }

    public function addTransaction(Customer $customer, Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:charge,payment,refund,discount',
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'sales_tax' => 'nullable|numeric|min:0',
            'person' => 'required|string|max:255',
            'reference' => 'nullable|string|max:255',
            'note' => 'nullable|string',
        ]);

        $balanceChange = $validated['amount'] + ($validated['sales_tax'] ?? 0);
        
        if (in_array($validated['type'], ['payment', 'refund', 'discount'])) {
            $balanceChange = -$balanceChange;
        }

        $newBalance = $customer->current_balance + $balanceChange;

        Transaction::create([
            'customer_id' => $customer->id,
            'date' => now(),
            'type' => $validated['type'],
            'description' => $validated['description'],
            'amount' => $validated['amount'],
            'sales_tax' => $validated['sales_tax'] ?? 0,
            'balance_change' => $balanceChange,
            'running_balance' => $newBalance,
            'person' => $validated['person'],
            'reference' => $validated['reference'],
            'note' => $validated['note'],
        ]);

        $customer->update([
            'current_balance' => $newBalance,
            'available_credit' => $customer->credit_limit - $newBalance,
        ]);

        return redirect()->back()->with('success', 'Transaction added successfully.');
    }

    public function invoices(Customer $customer, Request $request): View
    {
        $statusFilter = $request->get('status', 'all');
        
        $invoices = $customer->invoices();
        
        if ($statusFilter !== 'all') {
            $invoices->where('status', $statusFilter);
        }
        
        $invoices = $invoices->orderBy('date', 'desc')->get();
        
        return view('admin-portal.invoices', compact('customer', 'invoices', 'statusFilter'));
    }

    public function account(Customer $customer): View
    {
        $customer->load('taxDocument');
        
        return view('admin-portal.account', compact('customer'));
    }

    public function approveCreditAccount(Customer $customer, Request $request)
    {
        $validated = $request->validate([
            'credit_limit' => 'required|numeric|min:0',
            'approved_by' => 'required|string|max:255',
            'approval_reason' => 'required|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $customer->update([
            'account_approved' => true,
            'credit_limit' => $validated['credit_limit'],
            'available_credit' => $validated['credit_limit'] - $customer->current_balance,
        ]);

        return redirect()->back()->with('success', 'Credit account approved successfully.');
    }
}
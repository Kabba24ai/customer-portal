<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\View\View;

class CustomerPortalController extends Controller
{
    public function dashboard(Customer $customer): View
    {
        $customer->load(['invoices', 'orders', 'payments', 'transactions', 'taxDocument']);
        
        return view('customer-portal.dashboard', compact('customer'));
    }

    public function orders(Customer $customer, Request $request): View
    {
        $statusFilter = $request->get('status', 'all');
        
        $orders = $customer->orders();
        
        if ($statusFilter !== 'all') {
            $orders->where('payment_status', $statusFilter);
        }
        
        $orders = $orders->orderBy('date', 'desc')->get();
        
        return view('customer-portal.orders', compact('customer', 'orders', 'statusFilter'));
    }

    public function creditAccount(Customer $customer, Request $request): View
    {
        $transactionFilter = $request->get('type', 'all');
        
        $transactions = $customer->transactions();
        
        if ($transactionFilter !== 'all') {
            $transactions->where('type', $transactionFilter);
        }
        
        $transactions = $transactions->orderBy('date', 'desc')->get();
        
        return view('customer-portal.credit-account', compact('customer', 'transactions', 'transactionFilter'));
    }

    public function invoices(Customer $customer, Request $request): View
    {
        $statusFilter = $request->get('status', 'all');
        
        $invoices = $customer->invoices();
        
        if ($statusFilter !== 'all') {
            $invoices->where('status', $statusFilter);
        }
        
        $invoices = $invoices->orderBy('date', 'desc')->get();
        
        return view('customer-portal.invoices', compact('customer', 'invoices', 'statusFilter'));
    }

    public function account(Customer $customer): View
    {
        $customer->load('taxDocument');
        
        return view('customer-portal.account', compact('customer'));
    }

    public function updateAccount(Customer $customer, Request $request)
    {
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:255',
            'company_name' => 'required|string|max:255',
            'company_phone' => 'required|string|max:255',
            'website' => 'nullable|url|max:255',
            'billing_address' => 'required|string',
            'delivery_address' => 'required|string',
        ]);

        $customer->update($validated);

        return redirect()->back()->with('success', 'Account information updated successfully.');
    }
}
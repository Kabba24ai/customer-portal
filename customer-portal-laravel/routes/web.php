<?php

use App\Http\Controllers\AdminPortalController;
use App\Http\Controllers\CustomerPortalController;
use App\Models\Customer;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    // For demo purposes, redirect to the first customer
    $customer = Customer::first();
    if ($customer) {
        return redirect()->route('customer.dashboard', $customer);
    }
    return view('welcome');
});

// Customer Portal Routes
Route::prefix('customer/{customer}')->name('customer.')->group(function () {
    Route::get('dashboard', [CustomerPortalController::class, 'dashboard'])->name('dashboard');
    Route::get('orders', [CustomerPortalController::class, 'orders'])->name('orders');
    Route::get('credit-account', [CustomerPortalController::class, 'creditAccount'])->name('credit-account');
    Route::get('invoices', [CustomerPortalController::class, 'invoices'])->name('invoices');
    Route::get('account', [CustomerPortalController::class, 'account'])->name('account');
    Route::put('account', [CustomerPortalController::class, 'updateAccount'])->name('account.update');
});

// Admin Portal Routes
Route::prefix('admin/{customer}')->name('admin.')->group(function () {
    Route::get('dashboard', [AdminPortalController::class, 'dashboard'])->name('dashboard');
    Route::get('orders', [AdminPortalController::class, 'orders'])->name('orders');
    Route::get('credit-account', [AdminPortalController::class, 'creditAccount'])->name('credit-account');
    Route::post('credit-account/transaction', [AdminPortalController::class, 'addTransaction'])->name('credit-account.transaction');
    Route::get('invoices', [AdminPortalController::class, 'invoices'])->name('invoices');
    Route::get('account', [AdminPortalController::class, 'account'])->name('account');
    Route::post('account/approve-credit', [AdminPortalController::class, 'approveCreditAccount'])->name('account.approve-credit');
});
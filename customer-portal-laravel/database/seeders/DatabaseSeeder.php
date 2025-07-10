<?php

namespace Database\Seeders;

use App\Models\Customer;
use App\Models\Invoice;
use App\Models\Order;
use App\Models\TaxDocument;
use App\Models\Transaction;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create a sample customer
        $customer = Customer::create([
            'unique_id' => 'CUST-001',
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'john.doe@acmecorp.com',
            'phone' => '(555) 012-3456',
            'company_name' => 'Acme Corp',
            'company_phone' => '(555) 012-0100',
            'billing_address' => '123 Main St, New York, NY 10001',
            'delivery_address' => '456 Oak Ave, New York, NY 10002',
            'website' => 'https://acme-corp.com',
            'status' => 'Good Standing',
            'account_approved' => true,
            'credit_limit' => 15000.00,
            'current_balance' => 2750.00,
            'available_credit' => 12250.00,
            'tax_exempt' => true,
        ]);

        // Create tax document
        TaxDocument::create([
            'customer_id' => $customer->id,
            'filename' => 'acme_corp_tax_exempt_2025.pdf',
            'upload_date' => '2025-03-03',
            'status' => 'approved',
            'valid_until' => '2027-12-31',
        ]);

        // Create sample invoices
        Invoice::create([
            'customer_id' => $customer->id,
            'invoice_number' => 'INV-2025-001',
            'date' => '2025-01-15',
            'due_date' => '2025-02-14',
            'amount' => 1250.00,
            'status' => 'paid',
        ]);

        Invoice::create([
            'customer_id' => $customer->id,
            'invoice_number' => 'INV-2025-002',
            'date' => '2025-01-20',
            'due_date' => '2025-02-19',
            'amount' => 875.50,
            'status' => 'overdue',
        ]);

        Invoice::create([
            'customer_id' => $customer->id,
            'invoice_number' => 'INV-2025-003',
            'date' => '2025-01-25',
            'due_date' => '2025-02-24',
            'amount' => 624.50,
            'status' => 'pending',
        ]);

        // Create sample orders
        Order::create([
            'customer_id' => $customer->id,
            'order_number' => 'ORD-2025-001',
            'date' => '2025-01-15',
            'status' => 'delivered',
            'payment_status' => 'paid',
            'total' => 1249.95,
            'items_count' => 6,
            'tracking_number' => 'TRK123456789',
            'payment_method' => 'Credit / Debit',
            'primary_product' => 'Premium Widget Set',
        ]);

        Order::create([
            'customer_id' => $customer->id,
            'order_number' => 'ORD-2025-002',
            'date' => '2025-01-20',
            'status' => 'shipped',
            'payment_status' => 'paid',
            'total' => 875.50,
            'items_count' => 4,
            'tracking_number' => 'TRK987654321',
            'payment_method' => 'COD',
            'primary_product' => 'Standard Widget Pack',
        ]);

        Order::create([
            'customer_id' => $customer->id,
            'order_number' => 'ORD-2025-003',
            'date' => '2025-01-25',
            'status' => 'processing',
            'payment_status' => 'acct',
            'total' => 624.50,
            'items_count' => 2,
            'tracking_number' => null,
            'payment_method' => 'Account',
            'primary_product' => 'Widget Accessories Kit',
        ]);

        // Create sample transactions
        Transaction::create([
            'customer_id' => $customer->id,
            'date' => '2025-01-15',
            'type' => 'charge',
            'description' => 'Premium Widget Set - New Rental',
            'amount' => 999.95,
            'sales_tax' => 97.49,
            'balance_change' => 1097.44,
            'running_balance' => 2750.00,
            'person' => 'Sarah Johnson',
            'reference' => 'ORD-2025-001',
            'note' => 'Customer requested expedited processing due to urgent project deadline.',
        ]);

        Transaction::create([
            'customer_id' => $customer->id,
            'date' => '2025-01-18',
            'type' => 'payment',
            'description' => 'Credit Card Payment',
            'amount' => 1250.00,
            'sales_tax' => 0,
            'balance_change' => -1250.00,
            'running_balance' => 1500.00,
            'person' => 'System',
            'reference' => 'PAY-2025-001',
        ]);

        Transaction::create([
            'customer_id' => $customer->id,
            'date' => '2025-01-20',
            'type' => 'charge',
            'description' => 'Standard Widget Pack - Rental Extension',
            'amount' => 449.97,
            'sales_tax' => 43.87,
            'balance_change' => 493.84,
            'running_balance' => 1993.84,
            'person' => 'Michael Chen',
            'reference' => 'ORD-2025-002',
            'note' => 'Extension approved after customer called to extend rental period.',
        ]);
    }
}
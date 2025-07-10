<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();
            $table->string('unique_id')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email');
            $table->string('phone');
            $table->string('company_name');
            $table->string('company_phone');
            $table->text('billing_address');
            $table->text('delivery_address');
            $table->string('website')->nullable();
            $table->string('status')->default('Good Standing');
            $table->boolean('account_approved')->default(false);
            $table->decimal('credit_limit', 10, 2)->default(0);
            $table->decimal('current_balance', 10, 2)->default(0);
            $table->decimal('available_credit', 10, 2)->default(0);
            $table->boolean('tax_exempt')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
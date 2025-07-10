<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->date('date');
            $table->enum('type', ['charge', 'payment', 'refund', 'discount']);
            $table->string('description');
            $table->decimal('amount', 10, 2);
            $table->decimal('sales_tax', 10, 2)->default(0);
            $table->decimal('balance_change', 10, 2);
            $table->decimal('running_balance', 10, 2);
            $table->string('person')->nullable();
            $table->string('reference')->nullable();
            $table->text('note')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
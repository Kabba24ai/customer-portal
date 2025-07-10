<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('customer_id')->constrained()->onDelete('cascade');
            $table->string('order_number')->unique();
            $table->date('date');
            $table->enum('status', ['delivered', 'shipped', 'processing', 'cancelled'])->default('processing');
            $table->enum('payment_status', ['paid', 'pending', 'acct', 'failed', 'refunded'])->default('pending');
            $table->decimal('total', 10, 2);
            $table->integer('items_count')->default(1);
            $table->string('tracking_number')->nullable();
            $table->string('payment_method');
            $table->string('primary_product');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
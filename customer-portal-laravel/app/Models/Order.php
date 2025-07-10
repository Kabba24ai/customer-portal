<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'order_number',
        'date',
        'status',
        'payment_status',
        'total',
        'items_count',
        'tracking_number',
        'payment_method',
        'primary_product',
    ];

    protected $casts = [
        'date' => 'date',
        'total' => 'decimal:2',
        'items_count' => 'integer',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function getStatusColorAttribute(): string
    {
        return match($this->status) {
            'delivered' => 'bg-green-100 text-green-800',
            'shipped' => 'bg-blue-100 text-blue-800',
            'processing' => 'bg-yellow-100 text-yellow-800',
            'cancelled' => 'bg-red-100 text-red-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }

    public function getPaymentStatusColorAttribute(): string
    {
        return match($this->payment_status) {
            'paid' => 'bg-green-100 text-green-800',
            'pending' => 'bg-yellow-100 text-yellow-800',
            'acct' => 'bg-blue-100 text-blue-800',
            'failed' => 'bg-red-100 text-red-800',
            'refunded' => 'bg-purple-100 text-purple-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }
}
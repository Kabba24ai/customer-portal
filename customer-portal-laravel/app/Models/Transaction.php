<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Transaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'date',
        'type',
        'description',
        'amount',
        'sales_tax',
        'balance_change',
        'running_balance',
        'person',
        'reference',
        'note',
    ];

    protected $casts = [
        'date' => 'date',
        'amount' => 'decimal:2',
        'sales_tax' => 'decimal:2',
        'balance_change' => 'decimal:2',
        'running_balance' => 'decimal:2',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }

    public function getTypeColorAttribute(): string
    {
        return match($this->type) {
            'charge' => 'bg-red-100 text-red-800',
            'payment' => 'bg-green-100 text-green-800',
            'refund' => 'bg-blue-100 text-blue-800',
            'discount' => 'bg-purple-100 text-purple-800',
            default => 'bg-gray-100 text-gray-800',
        };
    }
}
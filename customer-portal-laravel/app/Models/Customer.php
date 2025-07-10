<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'unique_id',
        'first_name',
        'last_name',
        'email',
        'phone',
        'company_name',
        'company_phone',
        'billing_address',
        'delivery_address',
        'website',
        'status',
        'account_approved',
        'credit_limit',
        'current_balance',
        'available_credit',
        'tax_exempt',
    ];

    protected $casts = [
        'account_approved' => 'boolean',
        'tax_exempt' => 'boolean',
        'credit_limit' => 'decimal:2',
        'current_balance' => 'decimal:2',
        'available_credit' => 'decimal:2',
    ];

    public function invoices(): HasMany
    {
        return $this->hasMany(Invoice::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    public function transactions(): HasMany
    {
        return $this->hasMany(Transaction::class);
    }

    public function taxDocument()
    {
        return $this->hasOne(TaxDocument::class);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function getCreditUtilizationAttribute(): float
    {
        if ($this->credit_limit <= 0) {
            return 0;
        }
        return ($this->current_balance / $this->credit_limit) * 100;
    }
}
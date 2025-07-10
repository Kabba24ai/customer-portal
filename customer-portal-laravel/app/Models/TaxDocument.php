<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TaxDocument extends Model
{
    use HasFactory;

    protected $fillable = [
        'customer_id',
        'filename',
        'upload_date',
        'status',
        'valid_until',
    ];

    protected $casts = [
        'upload_date' => 'date',
        'valid_until' => 'date',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(Customer::class);
    }
}
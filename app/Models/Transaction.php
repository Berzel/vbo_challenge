<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $fillable = [
        'id' ,
        'amount' ,
        'fee',
        'product' ,
        'reference' ,
        'response_code',
        'gateway_reference',
        'amount_confirmed' ,
        'indicator' ,
        'status',
        'response_message',
        'currency'
    ];

    public function TransactionReference() : Attribute
    {
        return Attribute::make(
            set: fn($value) => [
                'gateway_reference' => $value,
                'transaction_reference' => $value
            ]
        );
    }

    public function GatewayReference() : Attribute
    {
        return Attribute::make(
            set: fn($value) => [
                'gateway_reference' => $value,
                'transaction_reference' => $value
            ]
        );
    }
}

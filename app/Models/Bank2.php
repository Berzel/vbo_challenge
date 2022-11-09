<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Bank2 extends Transaction
{
    use HasFactory;

    protected $table = 'bank2';

    protected $fillable = [
        'id' ,
        'amount' ,
        'fee',
        'product' ,
        'reference' ,
        'response_code',
        'transaction_reference',
        'amount_confirmed' ,
        'indicator' ,
        'status',
        'response_message',
        'currency'
    ];
}

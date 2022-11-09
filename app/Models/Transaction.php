<?php

namespace App\Models;

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
}

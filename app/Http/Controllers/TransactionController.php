<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTransactionRequest;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function store(CreateTransactionRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $transactionId = 1;
            $amount = $request->amount;
            $fee = 0;
            $product = $request->type;
            $reference = '123kj9856';
            $responseCode = '';
            $gatewayReference = '';
            $amountConfirmed = 45;
            $indicator = 'CF';
            $status = 'failed';
            $responseMessage = 'Yay';
            $currency = $request->currency;

            $transaction = DB::insert('INSERT INTO `transactions` VALUES (?,?,?,?,?)', [
                $transactionId,
            ]);

            return back();
        });
    }
}

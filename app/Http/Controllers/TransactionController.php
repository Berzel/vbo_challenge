<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTransactionRequest;
use App\Models\Bank1;
use App\Models\Bank2;
use App\Models\Bank3;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    public function store(CreateTransactionRequest $request)
    {
        return DB::transaction(function () use ($request) {
            $commonAttributes = [
                'amount' => $request->amount,
                'fee' => 0,
                'product' => $request->type === 'credit' ? 'Card Transactions (Credit)' : 'Card Funding Debit',
                'reference' => 'CF-BARTER-' . now()->format('Ymd') . now()->timestamp . Transaction::count() + 1,
                'response_code' => 5,
                'amount_confirmed' => $request->amount,
                'indicator' => 'D',
                'status' => 'Successful',
                'response_message' => 'Transaction was Successful',
                'currency' => strtoupper($request->currency)
            ];

            Transaction::create(array_merge($commonAttributes, [
                'id' => Transaction::latest()->first()->id + 1,
                'gateway_reference' => User::find($request->user)->name,
            ]));

            $bank1Data = array_merge($commonAttributes, [
                'id' => Bank1::latest()->first()->id + 1,
                'transaction_reference' => User::find($request->user)->name,
            ]);

            $bank2Data = array_merge($commonAttributes, [
                'id' => Bank2::latest()->first()->id + 1,
                'transaction_reference' => User::find($request->user)->name,
            ]);

            $bank3Data = array_merge($commonAttributes, [
                'id' => Bank3::latest()->first()->id + 1,
                'gateway_reference' => User::find($request->user)->name,
            ]);

            $bankOptions = [
                'bank1' => fn() => Bank1::create($bank1Data),
                'bank2' => fn() => Bank2::create($bank2Data),
                'bank3' => fn() => Bank3::create($bank3Data),
            ][$request->bank]();

            return back();
        });
    }
}

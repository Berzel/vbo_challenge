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
            $transaction = Transaction::create([
                'id' => Transaction::latest()->first()->id + 1,
                'amount' => $request->amount,
                'fee' => 0,
                'product' => $request->type === 'credit' ? 'Card Transactions (Credit)' : 'Card Funding Debit',
                'reference' => 'CF-BARTER-' . now()->format('Ymd') . now()->timestamp . Transaction::count() + 1,
                'response_code' => 5,
                'gateway_reference' => User::find($request->user)->name,
                'amount_confirmed' => $request->amount,
                'indicator' => 'D',
                'status' => 'Successful',
                'response_message' => 'Transaction was Successful',
                'currency' => strtoupper($request->currency)
            ]);

            $bankOptions = [
                'bank1' => fn() => Bank1::create($transaction::all()),
                'bank2' => fn() => Bank2::create($transaction::all()),
                'bank3' => fn() => Bank3::create($transaction::all()),
            ];

            $bankOptions[$request->bank]();

            return back();
        });
    }
}

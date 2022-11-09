<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'user' => ['required', 'exists:users,id'],
            'bank' => ['required', 'in:bank1,bank2,bank3'],
            'type' => ['required', 'in:credit,debit'],
            'currency' => ['required', 'in:usd,eur,gbp'],
            'amount' => ['required', 'numeric', 'min:1']
        ];
    }
}

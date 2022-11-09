<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Models\User;
use Illuminate\Support\Str;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Welcome', [
            'users' => User::all()
        ]);
    }

    public function store(CreateUserRequest $request)
    {
        User::create(array_merge(
            $request->validated(),
            ['password' => Str::random(32)]
        ));

        return redirect()->route('home');
    }
}

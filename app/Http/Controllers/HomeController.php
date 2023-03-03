<?php

namespace App\Http\Controllers;

class HomeController extends Controller
{
    public function show()
    {
        if (auth()->check()) {
            return redirect()->route('my-records');
        }
        return inertia('Home');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MyRecordsController extends Controller
{
    public function show()
    {
        if (!auth()->check()) {
            return redirect()->route('home');
        }
        return inertia('MyRecords', [
            'records' => auth()->user()->records,
        ]);
    }
}

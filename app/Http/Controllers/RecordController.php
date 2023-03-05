<?php

namespace App\Http\Controllers;

use App\Models\Record;
use App\Http\Requests\UpdateRecordRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RecordController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $records = $user->records;

        return response()->json($records);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function store(Request $request)
    {
        $record = Record::create($request->all());

        return response()->json($record, 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRecordRequest $request, Record $record)
    {
        $record->update($request->all());

        return response()->json($record);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Record $record)
    {
        $record->delete();

        return response()->json(null, 204);
    }
}

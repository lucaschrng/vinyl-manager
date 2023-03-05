<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MyRecordsController;
use App\Http\Controllers\RecordController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [HomeController::class, 'show'])->name('home');
Route::get('my-records', [MyRecordsController::class, 'show'])->name('my-records');

Route::get('records', [RecordController::class, 'index']);
Route::get('records/{record}', [RecordController::class, 'show']);
Route::post('records', [RecordController::class, 'store']);
Route::put('records/{record}', [RecordController::class, 'update']);
Route::delete('records/{record}', [RecordController::class, 'destroy']);

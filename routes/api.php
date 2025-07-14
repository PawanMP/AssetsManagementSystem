<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\AssetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\DashboardController;

// Authentication routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
    Route::post('/reset-password', [AuthController::class, 'resetPassword']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::get('/user', [AuthController::class, 'user']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::put('/profile', [AuthController::class, 'updateProfile']);
        Route::put('/change-password', [AuthController::class, 'changePassword']);
        
        // Added refresh route (optional)
        Route::get('/refresh', function (Request $request) {
            return response()->json([
                'user' => $request->user()
            ]);
        });
    });
});

// Protected API routes
Route::middleware('auth:sanctum')->group(function () {
    // Dashboard routes
    Route::prefix('dashboard')->group(function () {
        Route::get('/overview', [DashboardController::class, 'overview']);
        Route::get('/activities', [DashboardController::class, 'activities']);
        Route::get('/asset-statistics', [DashboardController::class, 'assetStatistics']);
        Route::get('/financial-summary', [DashboardController::class, 'financialSummary']);
        Route::get('/user-statistics', [DashboardController::class, 'userStatistics']);
        Route::get('/alerts', [DashboardController::class, 'alerts']);
    });
    
    // Asset routes
    Route::apiResource('assets', AssetController::class);
    Route::get('assets/search', [AssetController::class, 'search']);
    Route::get('assets/statistics', [AssetController::class, 'statistics']);
    Route::get('assets/{id}/activity', [AssetController::class, 'activity']);
    Route::post('assets/{id}/assign', [AssetController::class, 'assign']);
    Route::post('assets/{id}/return', [AssetController::class, 'return']);
    Route::get('asset-categories', [AssetController::class, 'categories']);
    
    // User management routes
    Route::apiResource('users', UserController::class);
    Route::get('user-roles', [UserController::class, 'roles']);
    Route::post('users/{user}/roles', [UserController::class, 'assignRole']);
    Route::delete('users/{user}/roles/{role}', [UserController::class, 'removeRole']);
    Route::get('users/{user}/permissions', [UserController::class, 'permissions']);
    
    // Supplier routes
    Route::apiResource('suppliers', SupplierController::class);
    Route::get('suppliers/{id}/assets', [SupplierController::class, 'assets']);
    Route::get('suppliers/{id}/invoices', [SupplierController::class, 'invoices']);
    
    // Invoice routes
    Route::apiResource('invoices', InvoiceController::class);
    Route::get('invoices/{id}/pdf', [InvoiceController::class, 'generatePDF']);
    Route::post('invoices/{id}/send-email', [InvoiceController::class, 'sendEmail']);
    Route::post('invoices/{id}/mark-paid', [InvoiceController::class, 'markAsPaid']);
    
    // Report routes
    Route::prefix('reports')->group(function () {
        Route::get('dashboard', [ReportController::class, 'dashboard']);
        Route::get('assets', [ReportController::class, 'assets']);
        Route::get('financial', [ReportController::class, 'financial']);
        Route::get('inventory', [ReportController::class, 'inventory']);
        Route::get('user-activity', [ReportController::class, 'userActivity']);
        Route::get('{type}/export/pdf', [ReportController::class, 'exportPDF']);
        Route::get('{type}/export/excel', [ReportController::class, 'exportExcel']);
    });
});

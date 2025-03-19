<?php

use App\Http\Controllers\Api\BackupController;
use App\Http\Controllers\Api\ServerController;
use App\Http\Controllers\Api\SiteController;
use App\Http\Controllers\Api\SiteActionController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\Api\TimelineController;
use App\Http\Controllers\BackupsLicenseStatusController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('actions', SiteActionController::class);

Route::apiResource('sites', SiteController::class)
    ->except(['update']);
Route::post('sites/{site}/resume-auth-wp', [SiteController::class, 'resumeAuthWp'])
    ->name('sites.resume_auth_wp');
Route::put('sites/{site}', [SiteController::class, 'update'])->withTrashed()
    ->name('sites.update');
Route::patch('sites/{site}', [SiteController::class, 'patch'])
    ->name('sites.patch');
Route::post('sites/refresh', [SiteController::class, 'refresh'])
    ->name('sites.refresh');

Route::apiResource('tag', TagController::class)
    ->except(['index', 'update']);
Route::put('tag/{tag}', [TagController::class, 'update'])
    ->name('tag.update');
Route::patch('tag/{tag}', [TagController::class, 'patch'])
    ->name('tag.patch');

Route::apiResource('timeline', TimelineController::class);

Route::post('site/{siteId}/backup-controllers/backup', [BackupController::class, 'startManualBackup'])
    ->name('backups.start');
Route::post('site/{siteId}/backup-controllers/activate', [BackupController::class, 'activateBackups'])
    ->name('backups.activate');
Route::post('site/{siteId}/backup-controllers/deactivate', [BackupController::class, 'deactivateBackups'])
    ->name('backups.deactivate');
Route::post('site/{siteId}/backup-controllers/archive', [BackupController::class, 'generateArchive'])
    ->name('backups.archive');
Route::post('site/{siteId}/backup-controllers/restore', [BackupController::class, 'startRestore'])
    ->name('backups.restore');

Route::get('site/{siteId}/backup-controllers/license-status', BackupsLicenseStatusController::class)
    ->name('backups.license_status');

Route::apiResource('server', ServerController::class);

<?php

use app\http\middleware\ApiSecrectMiddleware;
use think\facade\Route;
Route::group('api', function () {
    Route::group('openapi', function () {
        Route::get('getCustomerServiceList', 'Service/getCustomerServiceList');
    })->prefix('openapi.');



})->middleware(ApiSecrectMiddleware::class);

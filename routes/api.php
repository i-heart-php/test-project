<?php

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

Route::get('/', function () {
    return [
        'app' => 'Laravel 6 API Boilerplate',
        'version' => '1.0.0',
    ];
});

Route::group(['namespace' => 'Auth'], function () {
    Route::post('auth/login', ['as' => 'login', 'uses' => 'AuthController@login']);
});

Route::group(['middleware' => ['jwt', 'jwt.auth']], function () {

    Route::get('servers', ['uses' => 'ServerController@index']);

    Route::post('server', ['uses' => 'ServerController@store']);
    Route::patch('server', ['uses' => 'ServerController@update']);
    Route::delete('server', ['uses' => 'ServerController@destroy']);

    Route::group(['namespace' => 'Profile'], function () {
        Route::get('profile', ['as' => 'profile', 'uses' => 'ProfileController@me']);
        //Route::put('profile', ['as' => 'profile', 'uses' => 'ProfileController@update']);
        //Route::put('profile/password', ['as' => 'profile', 'uses' => 'ProfileController@updatePassword']);
    });

    Route::group(['namespace' => 'Auth'], function () {
        Route::post('logout', ['as' => 'logout', 'uses' => 'LogoutController@logout']);
    });

});
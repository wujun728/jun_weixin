<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::any('/wechat', 'formController@serve');
Route::post('/signin', 'formController@signin');
Route::any('/detail/{id}', 'formController@detail');

Route::group(['middleware' => ['web', 'wechat.oauth']], function () {


    Route::get('/user', 'formController@user');
    Route::get('/form', 'formController@form');
    Route::get('/oauth', 'formController@oauth');
});
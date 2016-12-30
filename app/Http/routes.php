<?php


Route::get('/', function () {
    $environment = App::environment();
    dd($environment);
//    return view('welcome');
});

Route::resource('users','UsersController');

Route::resource('test','TestController');

<?php


Route::get('/', function () {
//    $environment = App::environment();
//    dd($environment);
    return view('welcome');
});

Route::resource('users','UsersController');

Route::resource('test','TestController');

$router->get('profile/{user}', function(App\User $user) {
    dd($user);
});


Route::controller('photo', 'PhotoController',[
    'getShow'=>'user.show',
]);
<?php

// use Illuminate\Http\Response;
Route::get('/', function () {
    // return view('welcome');
    return view('profile');
    // return view('welcome')->with('name', 'Victoria');
    // return (new Response('assssdf', 200))->header('Content-Type', 'text/html')->withCookie('sss', 'value');
    // return response()->view('users.create')->header('Content-Type', 'text/html');
    // return response()->json(['name' => 'Abigail', 'state' => 'CA']);
    // return response()->json(['name' => 'Abigail', 'state' => 'CA'])->setCallback($request->input('callback'));
    // return response()->download(realpath(base_path('public/vendor/project/images')).'/1483583973.png','aaa.jpg');
    // return redirect(route('users.index'));
});

Route::resource('users','UsersController');
Route::get('destroyd/{id}','UsersController@destroyd')->name('users.destroyd')->where('id', '[0-9]+');
Route::resource('test','TestController');

//$router->get('profile/{user}', function(App\User $user) {
//    dd($user);
//});


Route::controller('photo', 'PhotoController',[
    'getShow'=>'user.show',
]);
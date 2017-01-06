<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Http\Requests\UserRequest;
use App\Http\Controllers\Controller;

class UsersController extends Controller
{
//    protected $users;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
        // view()->share('share', 'value');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //  $response = new \Illuminate\Http\Response('Hello World');
        // $response->withCookie(cookie('name', 'value', 3600));
        // dd($response);
        $users = $this->repository->get();
        return view('users.index',compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //

        return view('users/create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(UserRequest $request)
    {
        //
        $request->flash();
//        $url = $request->url();
//        $uri = $request->path();
//        $method = $request->method();
//        if ($request->is('users')) {
//            echo 'yes'.'<br>';
//        }
//
//        var_dump($url);
//        echo '<br>';
//        var_dump($uri);
//        echo '<br>';
//        var_dump($method);
//        echo '<br>';
//        print_r($request->input('name','default_name'));
//        echo '<br>';
//        var_dump( $request->all());
//        echo '<br>';
//        var_dump($request->except(['username', 'password']));
//        echo '<br>';
        if ($request->hasFile('file')) {
            if ($request->file('file')->isValid()) {
                //
                // dd($request->file('file'));
                $request->file('file')->move('./vendor/project/images/', time().'.png');
            }
        }else{
            return back()->withInput();
        }
        dd($request->input());
        return redirect(route('users.create'));
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
        $user = $this->repository->find($id);
        return view('users.show',compact('user'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
        $user = $this->repository->find($id);
        return view('users.edit',compact('user'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(UserRequest $request, $id)
    {
//        $this->validate($request, [
//            'username' => 'required|max:255',
//            'email' => 'required',
//            'password' => 'required|min:8',
//        ]);
        $this->repository->update($request->input(),$id);
        return redirect(route('users.index'))->with('status', 'Success updated!');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}

<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Repositories\UserRepositoryInterface;

class UsersController extends Controller
{

    public function __construct(UserRepositoryInterface $repository)
    {
        // parent::__construct();
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
        // $users = $this->repository->get();
        // $users = User::all();
        $users = $this->repository->selectAll();
        // dd($users);
        return view('users.index',compact('users'));
        // return view('users.index',compact('users'));
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
        // dd($request->input());
        $this->repository->create($request->input());
        return redirect(route('users.index'));
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
    public function destroyd($id)
    {
        $this->repository->destroy($id);
        return redirect(route('users.index'));
    }
}

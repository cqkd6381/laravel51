<?php

namespace App\Repositories;

use App\Models\User;
use App\Http\Requests\UserRequest;
use Illuminate\Database\Eloquent\Model;

class UserRepository implements UserRepositoryInterface
{
    // public $model;

    // public function __consturct(User $user)
    // {
    //     $this->model = $user;
    //     var_dump($this->model);
    // }

    public function find($id)
    {
        return User::find($id);
    }

    public function selectAll()
    {
        return User::all();
        // return $this->model->get();
    }

    public function update($data,$id)
    {
        return User::where('id','=',$id)->update([
            'username'=>$data['username'],
            'email'=>$data['email'],
            'password'=>$data['password']
        ]);
    }

    public function destroy($id)
    {
        User::destroy($id);
    }

    public function create($data)
    {
        return User::insert([
            'username'=>$data['username'],
            'email'=>$data['email'],
            'password'=>$data['password'],
        ]);
    }

}
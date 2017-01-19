<?php

namespace App\Repositories;

use App\Models\User;
use App\Http\Requests\UserRequest;
use Illuminate\Database\Eloquent\Model;

class UserRepository implements UserRepositoryInterface
{

    public function __consturct(User $user)
    {
        $this->model = $user;
    }

    public function find($id)
    {
        return User::find($id);
    }

    public function selectAll()
    {
        return User::all();
    }

    public function update($data,$id)
    {
        return User::where('id','=',$id)->update([
            'name'=>$data['name'],
            'description'=>$data['description']
        ]);
    }

}
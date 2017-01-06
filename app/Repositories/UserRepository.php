<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class UserRepository
{
    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function get()
    {
        return $this->model->get();
    }

    public function find($id)
    {
        return $this->model->find($id);
    }

    public function update(array $data,int $id)
    {
        return $this->model->where('id',$id)->update([
            'username'=>$data['username'],
            'email'=>$data['email'],
            'password'=>$data['password']
        ]);
    }

    public function count()
    {
        return $this->model->count();
    }

}
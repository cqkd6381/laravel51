@extends('layouts.index')

@section('title', '用户编辑')

@section('content')
    <h2>用户编辑</h2>
    <form class="form-horizontal" role="form" method="post" action="{{route('users.update',['users'=>$user->id])}}">
        {{ csrf_field() }}
        {{ method_field('PUT') }}
        <div class="form-group">
            <label for="inputUsername3" class="col-sm-2 control-label">Username</label>
            <div class="col-sm-10">
                <input type="username" class="form-control" id="inputUsername3" value="{{$user->username}}" name="username">
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail3" value="{{$user->email}}" name="email">
            </div>
        </div>
        <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword3" value="{{$user->password}}" name="password">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-10 col-sm-offset-2">
                <button type="submit" class="btn btn-primary">Sign in</button>
            </div>
        </div>
    </form>
@endsection
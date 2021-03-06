@extends('layouts.index')

@section('title', '添加用户')

@section('content')
    <h2>添加用户</h2>
    <form class="form-horizontal" role="form" action="{{route('users.store')}}" method="post">
        {{ csrf_field() }}
        <div class="form-group">
            <label for="inputUsername3" class="col-sm-2 control-label">Username</label>
            <div class="col-sm-10">
                <input type="username" class="form-control" id="inputUsername3" placeholder="Username" name="username" value="{{ old('username') }}">
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail3" placeholder="Email" name="email" value="{{ old('email') }}">
            </div>
        </div>
        <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword3" placeholder="Password" name="password" value="{{ old('password') }}">
            </div>
        </div>
        <!-- <div class="form-group">
            <label for="inputPassword4" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
                <input type="file" class="form-control" id="inputPassword4" name="file" value="{{ old('file') }}">
            </div>
        </div> -->
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" name="remember"> Remember me
                    </label>
                </div>
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-default">Sign in</button>
            </div>
        </div>
    </form>
@endsection
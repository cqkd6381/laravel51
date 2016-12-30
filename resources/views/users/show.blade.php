@extends('layouts.index')

@section('title', '用户详情')

@section('content')
    <h2>用户详情</h2>
    <form class="form-horizontal" role="form">
        <div class="form-group">
            <label for="inputUsername3" class="col-sm-2 control-label">Username</label>
            <div class="col-sm-10">
                <input type="username" class="form-control" id="inputUsername3" value="username" readonly>
            </div>
        </div>
        <div class="form-group">
            <label for="inputEmail3" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-10">
                <input type="email" class="form-control" id="inputEmail3" value="email" readonly>
            </div>
        </div>
        <div class="form-group">
            <label for="inputPassword3" class="col-sm-2 control-label">Password</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword3" value="password" readonly>
            </div>
        </div>
    </form>
@endsection
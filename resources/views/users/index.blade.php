@extends('layouts.index')

@section('title', '用户列表')

@section('content')
    <h2>用户列表</h2>
    <a class="btn btn-primary" href="{{route('users.create')}}">新增</a>
    <br>
    <table class="table table-striped">
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>操作</th>
        </tr>
        @foreach($users as $user)
            <tr>
                <td>{{$user->id}}</td>
                <td>{{$user->username}}</td>
                <td>{{$user->email}}</td>
                <td>
                    <a href="{{route('users.show',['id'=>$user->id])}}">详情</a>
                    <a href="{{route('users.edit',['id'=>$user->id])}}">编辑</a>
                    <a href="{{route('users.destroy',['id'=>$user->id])}}">删除</a>
                </td>
            </tr>
        @endforeach
    </table>
@endsection
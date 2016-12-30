@extends('layouts.index')

@section('title', '用户列表')

@section('content')
    <h2>用户列表</h2>
    <table class="table table-striped">
        <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>操作</th>
        </tr>
        <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>
                <a href="{{Route('users.show',['id'=>1])}}">详情</a>
                <a href="{{Route('users.edit',['id'=>1])}}">编辑</a>
                <a href="{{Route('users.destroy',['id'=>1])}}">删除</a>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>2</td>
            <td>2</td>
            <td>
                <a href="{{Route('users.show',['id'=>2])}}">详情</a>
                <a href="{{Route('users.edit',['id'=>2])}}">编辑</a>
                <a href="{{Route('users.destroy',['id'=>2])}}">删除</a>
            </td>
        </tr>
    </table>
@endsection
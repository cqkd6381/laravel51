<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class UserRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => 'required|max:255|min:3',
            'email' => 'required|email|unique:users,email,'.$this->route('users'),
            'password' => 'required|min:8',
        ];
    }

    /**
     * 获取已定义验证规则的错误消息。
     *
     * @return array
     */
    public function messages()
    {
        return [
            'username.required' => '用户名是必填的',
            'username.min' => '用户名不得少于3位',
            'email.required'  => '邮箱是必填的',
            'email.email'=>'邮箱格式错误',
            'password.required'  => '密码是必填的',
            'password.min'=>'密码不得少于8位',
        ];
    }
}

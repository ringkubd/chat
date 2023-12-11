<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\AppBaseController;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;

class AuthController extends AppBaseController
{
    public function login(Request $request){
        $validate = Validator::make($request->all(), [
            'email' => 'email:dns|required',
            'password' => 'required'
        ]);
        if ($validate->failed()){
            return $this->sendError($validate->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $user = User::where('email', $request->email)->first();
        if (!$user){
            return $this->sendError('Invalid email.', 404);
        }
        if (Hash::check($request->password, $user->password)){
            $token = $user->createToken($user->name)->plainTextToken;
            return $this->sendResponse([
                'token' => $token,
                'user' => $user
            ], 'Logged in successfully.');
        }else{
            return $this->sendError('Wrong password', Response::HTTP_FAILED_DEPENDENCY);
        }
    }

    public function register(Request $request){
        $validate = Validator::make($request->all(), [
            'email' => 'email:dns|required',
            'password' => 'required'
        ]);
        if ($validate->failed()){
            return $this->sendError($validate->errors(), Response::HTTP_UNPROCESSABLE_ENTITY);
        }
        $user = User::create($request->all());
        $token = $user->createToken($user->name)->plainTextToken;
        return $this->sendResponse([
            'token' => $token,
            'user' => $user
        ], 'Register and Logged in successfully.');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Fruit;

class FruitsController extends Controller
{
    //
    public function list()
    {
        return Fruit::orderBy('id')->get();
    }

    public function update(Request $request,Fruit $fruit)
    {
        $fruit->update($request->all());

        return $fruit;
    }

    public function create(Request $request)
    {
        return Fruit::create($request->all());
    }

    public function delete(Fruit $fruit)
    {
        $fruit->delete();
        return $fruit;
    }

}
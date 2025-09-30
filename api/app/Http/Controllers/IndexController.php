<?php

namespace App\Http\Controllers;

// use Illuminate\Http\Request;

class IndexController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function version()
    {
        return [
            'version' => '0.1'
        ];
    }
}

<?php 
namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use DB;
class AuthController extends Controller
{

    public function create(){
        return Inertia::render('Member/Auth/Login');
    }

    public function store(Request $request){
        
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);


        if (Auth::guard('member')->attempt($credentials, $request->remember)) {
            $request->session()->regenerate();
            return redirect()->route('member.dashboard');
        }


        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function destroy(Request $request){
        Auth::guard('member')->logout();
        return redirect()->route('member.login');
    }
}
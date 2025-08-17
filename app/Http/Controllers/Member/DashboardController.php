<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $member = auth('member')->user();
        $posts = Post::where('member_id', $member->id)->latest()->paginate(5);
        
        return Inertia::render('Member/Dashboard', [
            'posts' => $posts,
            'stats' => [
                'total_posts' => Post::where('member_id', $member->id)->count(),
                'published_posts' => Post::where('member_id', $member->id)->where('status', 'published')->count(),
                'draft_posts' => Post::where('member_id', $member->id)->where('status', 'draft')->count(),
            ]
        ]);
    }
}
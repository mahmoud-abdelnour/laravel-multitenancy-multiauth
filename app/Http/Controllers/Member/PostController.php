<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        $member = auth('member')->user();
        $posts = Post::where('member_id', $member->id)
                    ->latest()
                    ->paginate(10);
        
        return Inertia::render('Member/Posts/Index', [
            'posts' => $posts
        ]);
    }

    public function create()
    {
        return Inertia::render('Member/Posts/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'required|in:draft,published',
            'excerpt' => 'nullable|string|max:500',
        ]);

        $member = auth('member')->user();
        
        Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'excerpt' => $request->excerpt,
            'status' => $request->status,
            'member_id' => $member->id,
            'slug' => \Str::slug($request->title),
        ]);

        return redirect()->route('member.posts.index')
                        ->with('success', 'Post created successfully!');
    }

    public function show(Post $post)
    {
        //$this->authorize('view', $post);
        
        return Inertia::render('Member/Posts/Show', [
            'post' => $post
        ]);
    }

    public function edit(Post $post)
    {
        //$this->authorize('update', $post);
        
        return Inertia::render('Member/Posts/Edit', [
            'post' => $post
        ]);
    }

    public function update(Request $request, Post $post)
    {
        //$this->authorize('update', $post);
        
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'status' => 'required|in:draft,published',
            'excerpt' => 'nullable|string|max:500',
        ]);

        $post->update([
            'title' => $request->title,
            'content' => $request->content,
            'excerpt' => $request->excerpt,
            'status' => $request->status,
            'slug' => \Str::slug($request->title),
        ]);

        return redirect()->route('member.posts.index')
                        ->with('success', 'Post updated successfully!');
    }

    public function destroy(Post $post)
    {
        //$this->authorize('delete', $post);
        
        $post->delete();

        return redirect()->route('member.posts.index')
                        ->with('success', 'Post deleted successfully!');
    }
}
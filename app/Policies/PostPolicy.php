<?php

namespace App\Policies;

use App\Models\Member;
use App\Models\Post;

class PostPolicy
{
    public function view(Member $member, Post $post)
    {
        return $member->id === $post->member_id;
    }

    public function update(Member $member, Post $post)
    {
        return $member->id === $post->member_id;
    }

    public function delete(Member $member, Post $post)
    {
        return $member->id === $post->member_id;
    }
}

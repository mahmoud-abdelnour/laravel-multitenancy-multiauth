<?php

namespace App\Http\Controllers;

use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function index()
    {
        $members = Member::all();
        return Inertia::render('Members/Index', ['members' => $members]);
    }

    public function create()
    {
        return Inertia::render('Members/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members,email',
            'password' => 'required|string|min:8',
        ]);

        $validated['password'] = Hash::make($validated['password']);

        Member::create($validated);

        return redirect()->route('members.index')->with('success', 'Member created.');
    }

    public function edit(Member $member)
    {
        return Inertia::render('Members/Edit', ['member' => $member]);
    }

    public function update(Request $request, Member $member)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:members,email,'.$member->id,
            'password' => 'nullable|string|min:8',
        ]);

        if ($validated['password']) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $member->update($validated);

        return redirect()->route('members.index')->with('success', 'Member updated.');
    }

    public function destroy(Member $member)
    {
        $member->delete();
        return redirect()->route('members.index')->with('success', 'Member deleted.');
    }
}
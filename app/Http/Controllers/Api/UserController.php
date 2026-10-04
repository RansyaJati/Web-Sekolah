<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

/**
 * Read-only user/role listing. Only super_admin may access.
 * Role enforcement happens here (backend), never only in the frontend.
 */
class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if (! $user || ! in_array($user->role, ['super_admin', 'Super Admin'], true)) {
            return response()->json(['message' => 'Forbidden.'], 403);
        }

        $users = User::query()
            ->select(['id', 'name', 'email', 'role', 'is_active', 'created_at'])
            ->orderBy('name')
            ->limit(100)
            ->get();

        return response()->json($users);
    }
}

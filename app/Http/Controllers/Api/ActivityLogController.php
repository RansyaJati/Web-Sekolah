<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function index(Request $request)
    {
        $perPage = min((int) $request->query('per_page', 20), 100);

        $query = ActivityLog::query()
            ->when($request->query('module'), fn ($q, $m) => $q->where('module', $m))
            ->orderBy('created_at', 'desc');

        return response()->json($query->paginate($perPage));
    }
}

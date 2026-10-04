<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

/**
 * Single lightweight endpoint for the admin dashboard.
 * Replaces 6+ parallel count requests with indexed COUNT(*) queries.
 */
class StatsController extends Controller
{
    public function index(Request $request)
    {
        $recentNews = DB::table('news')
            ->select(['id', 'title', 'category', 'status', 'published_at'])
            ->orderBy('published_at', 'desc')
            ->limit(3)
            ->get();

        $recentActivity = DB::table('activity_logs')
            ->select(['id', 'user_name', 'action', 'module', 'target', 'created_at'])
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        $ppdbInfo = DB::table('settings')->where('key', 'ppdb_info')->value('value');

        return response()->json([
            'counts' => [
                'news' => DB::table('news')->count(),
                'achievements' => DB::table('achievements')->count(),
                'programs' => DB::table('programs')->where('is_active', true)->count(),
                'products' => DB::table('products')->where('is_available', true)->count(),
                'jobs' => DB::table('job_vacancies')->where('is_active', true)->count(),
                'partners' => DB::table('industry_partners')->where('is_active', true)->count(),
                'alumni' => DB::table('alumni')->count(),
                'knowledge' => DB::table('knowledge_bases')->where('is_active', true)->count(),
            ],
            'recent_news' => $recentNews,
            'recent_activity' => $recentActivity,
            'ppdb_info' => $ppdbInfo ? json_decode($ppdbInfo, true) : null,
        ]);
    }
}

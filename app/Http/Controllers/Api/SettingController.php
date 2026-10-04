<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index(Request $request)
    {
        // Batch fetch to avoid N+1 settings requests (e.g. PPDB needs 5 keys).
        // Usage: GET /api/settings?keys=ppdb_info,ppdb_jalur,ppdb_jadwal
        if ($request->has('keys')) {
            $keys = array_filter(array_map('trim', explode(',', (string) $request->query('keys'))));
            $settings = Setting::whereIn('key', $keys)->pluck('value', 'key');
            return response()->json($settings);
        }

        $settings = Setting::pluck('value', 'key');
        return response()->json($settings);
    }

    public function show($key)
    {
        $setting = Setting::where('key', $key)->first();
        if (!$setting) {
            return response()->json(['message' => 'Not found'], 404);
        }
        return response()->json($setting->value);
    }

    public function update(Request $request, $key)
    {
        $validated = $request->validate([
            'value' => 'required' // can be array or string
        ]);

        $setting = Setting::updateOrCreate(
            ['key' => $key],
            ['value' => $validated['value']]
        );

        return response()->json($setting);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index()
    {
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

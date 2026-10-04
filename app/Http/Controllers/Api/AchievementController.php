<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;

class AchievementController extends Controller
{
    public function index()
    {
        return response()->json(Achievement::orderBy('year', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'student_name' => 'required|string|max:255',
            'competition'  => 'required|string|max:255',
            'level'        => 'required|in:Kota,Provinsi,Nasional,Internasional',
            'year'         => 'required|string|size:4',
            'rank'         => 'required|string|max:50',
            'photo'        => 'nullable|string',
            'description'  => 'nullable|string',
            'is_featured'  => 'boolean',
        ]);

        $achievement = Achievement::create($validated);
        return response()->json($achievement, 201);
    }

    public function update(Request $request, $id)
    {
        $achievement = Achievement::findOrFail($id);

        $validated = $request->validate([
            'title'        => 'sometimes|string|max:255',
            'student_name' => 'sometimes|string|max:255',
            'competition'  => 'sometimes|string|max:255',
            'level'        => 'sometimes|in:Kota,Provinsi,Nasional,Internasional',
            'year'         => 'sometimes|string|size:4',
            'rank'         => 'sometimes|string|max:50',
            'photo'        => 'nullable|string',
            'description'  => 'nullable|string',
            'is_featured'  => 'boolean',
        ]);

        $achievement->update($validated);
        return response()->json($achievement);
    }

    public function destroy($id)
    {
        Achievement::findOrFail($id)->delete();
        return response()->json(['message' => 'Prestasi berhasil dihapus.']);
    }
}

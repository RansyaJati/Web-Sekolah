<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\Request;

class AchievementController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) $request->query('per_page', 0);
        $limit = min((int) $request->query('limit', 24), 100);

        $query = Achievement::query()
            ->when($request->has('featured'), fn ($q) => $q->where('is_featured', $request->boolean('featured')))
            ->when($request->query('year'), fn ($q, $y) => $q->where('year', $y))
            ->when($request->query('level'), fn ($q, $l) => $q->where('level', $l))
            ->orderBy('year', 'desc');

        if ($perPage > 0) {
            return response()->json($query->paginate(min($perPage, 50)));
        }

        return response()->json($query->limit($limit)->get());
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

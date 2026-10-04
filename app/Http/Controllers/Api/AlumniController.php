<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Alumni;
use Illuminate\Http\Request;

class AlumniController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) $request->query('per_page', 0);
        $limit = min((int) $request->query('limit', 24), 100);

        $query = Alumni::query()
            ->when($request->has('featured'), fn ($q) => $q->where('is_featured', $request->boolean('featured')))
            ->orderBy('graduation_year', 'desc');

        if ($perPage > 0) {
            return response()->json($query->paginate(min($perPage, 50)));
        }

        return response()->json($query->limit($limit)->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'                 => 'required|string|max:255',
            'graduation_year'      => 'required|string|size:4',
            'program'              => 'required|string|max:255',
            'current_affiliation'  => 'required|string|max:255',
            'achievement'          => 'nullable|string',
            'testimonial'          => 'required|string',
            'photo'                => 'nullable|string',
            'is_featured'          => 'boolean',
        ]);

        $alumni = Alumni::create($validated);
        return response()->json($alumni, 201);
    }

    public function update(Request $request, $id)
    {
        $alumni = Alumni::findOrFail($id);

        $validated = $request->validate([
            'name'                => 'sometimes|string|max:255',
            'graduation_year'     => 'sometimes|string|size:4',
            'program'             => 'sometimes|string|max:255',
            'current_affiliation' => 'sometimes|string|max:255',
            'achievement'         => 'nullable|string',
            'testimonial'         => 'sometimes|string',
            'photo'               => 'nullable|string',
            'is_featured'         => 'boolean',
        ]);

        $alumni->update($validated);
        return response()->json($alumni);
    }

    public function destroy($id)
    {
        Alumni::findOrFail($id)->delete();
        return response()->json(['message' => 'Alumni berhasil dihapus.']);
    }
}

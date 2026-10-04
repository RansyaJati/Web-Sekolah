<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Program;
use Illuminate\Http\Request;

class ProgramController extends Controller
{
    public function index()
    {
        return response()->json(Program::orderBy('name')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'             => 'required|string|max:255',
            'code'             => 'required|string|max:20|unique:programs,code',
            'duration'         => 'required|string',
            'description'      => 'required|string',
            'competencies'     => 'nullable|array',
            'career_prospects' => 'nullable|array',
            'image'            => 'nullable|string',
            'is_active'        => 'boolean',
            'is_featured'      => 'boolean',
        ]);

        $program = Program::create($validated);
        return response()->json($program, 201);
    }

    public function update(Request $request, $id)
    {
        $program = Program::findOrFail($id);

        $validated = $request->validate([
            'name'             => 'sometimes|string|max:255',
            'code'             => 'sometimes|string|max:20|unique:programs,code,' . $id,
            'duration'         => 'sometimes|string',
            'description'      => 'sometimes|string',
            'competencies'     => 'nullable|array',
            'career_prospects' => 'nullable|array',
            'image'            => 'nullable|string',
            'is_active'        => 'boolean',
            'is_featured'      => 'boolean',
        ]);

        $program->update($validated);
        return response()->json($program);
    }

    public function destroy($id)
    {
        Program::findOrFail($id)->delete();
        return response()->json(['message' => 'Program keahlian berhasil dihapus.']);
    }
}

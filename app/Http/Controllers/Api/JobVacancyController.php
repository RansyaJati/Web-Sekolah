<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobVacancy;
use Illuminate\Http\Request;

class JobVacancyController extends Controller
{
    public function index()
    {
        return response()->json(JobVacancy::orderBy('posted_date', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'         => 'required|string|max:255',
            'company'       => 'required|string|max:255',
            'location'      => 'required|string|max:255',
            'type'          => 'required|in:Full-time,Part-time,Magang,PKL',
            'category'      => 'required|string|max:100',
            'description'   => 'required|string',
            'requirements'  => 'nullable|array',
            'posted_date'   => 'required|date',
            'deadline_date' => 'nullable|date',
            'apply_link'    => 'nullable|string|max:500',
            'is_active'     => 'boolean',
        ]);

        $vacancy = JobVacancy::create($validated);
        return response()->json($vacancy, 201);
    }

    public function update(Request $request, $id)
    {
        $vacancy = JobVacancy::findOrFail($id);

        $validated = $request->validate([
            'title'         => 'sometimes|string|max:255',
            'company'       => 'sometimes|string|max:255',
            'location'      => 'sometimes|string|max:255',
            'type'          => 'sometimes|in:Full-time,Part-time,Magang,PKL',
            'category'      => 'sometimes|string|max:100',
            'description'   => 'sometimes|string',
            'requirements'  => 'nullable|array',
            'posted_date'   => 'sometimes|date',
            'deadline_date' => 'nullable|date',
            'apply_link'    => 'nullable|string|max:500',
            'is_active'     => 'boolean',
        ]);

        $vacancy->update($validated);
        return response()->json($vacancy);
    }

    public function destroy($id)
    {
        JobVacancy::findOrFail($id)->delete();
        return response()->json(['message' => 'Lowongan berhasil dihapus.']);
    }
}

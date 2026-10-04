<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\JobVacancy;
use Illuminate\Http\Request;

class JobVacancyController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) $request->query('per_page', 0);
        $limit = min((int) $request->query('limit', 24), 100);

        $query = JobVacancy::query()
            ->when($request->has('active'), fn ($q) => $q->where('is_active', $request->boolean('active')))
            ->when($request->query('category'), fn ($q, $c) => $q->where('category', $c))
            ->when($request->query('type'), fn ($q, $t) => $q->where('type', $t))
            // Hide expired vacancies at DB layer when requested (default for public).
            ->when($request->boolean('hide_expired', true), fn ($q) => $q->where(function ($w) {
                $w->whereNull('deadline_date')->orWhere('deadline_date', '>=', now()->toDateString());
            }))
            ->when($request->query('search'), fn ($q, $s) => $q->where(function ($w) use ($s) {
                $w->where('title', 'like', "%{$s}%")
                  ->orWhere('company', 'like', "%{$s}%")
                  ->orWhere('description', 'like', "%{$s}%");
            }))
            ->orderBy('posted_date', 'desc');

        if ($perPage > 0) {
            return response()->json($query->paginate(min($perPage, 50)));
        }

        return response()->json($query->limit($limit)->get());
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

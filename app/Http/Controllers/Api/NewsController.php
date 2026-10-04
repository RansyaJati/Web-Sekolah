<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    public function index(Request $request)
    {
        // Pagination & filtering at query layer (never fetch-all then slice in browser).
        $perPage = (int) $request->query('per_page', 0);
        $limit = min((int) $request->query('limit', 50), 100);

        $query = News::query()
            ->when($request->query('status'), fn ($q, $s) => $q->where('status', $s))
            ->when($request->query('category'), fn ($q, $c) => $q->where('category', $c))
            ->when($request->has('featured'), fn ($q) => $q->where('is_featured', $request->boolean('featured')))
            ->when($request->query('search'), fn ($q, $s) => $q->where(function ($w) use ($s) {
                $w->where('title', 'like', "%{$s}%")->orWhere('summary', 'like', "%{$s}%");
            }))
            ->orderBy('published_at', 'desc');

        if ($perPage > 0) {
            return response()->json($query->paginate(min($perPage, 50)));
        }

        // Select only columns needed by listings; content fetched via show().
        return response()->json($query->limit($limit)->get([
            'id', 'title', 'slug', 'category', 'thumbnail', 'summary',
            'status', 'is_featured', 'published_at', 'author',
        ]));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'        => 'required|string|max:255',
            'category'     => 'required|in:Prestasi,Kegiatan,Pengumuman,Akademik',
            'summary'      => 'required|string',
            'content'      => 'required|string',
            'status'       => 'required|in:Published,Draft,Archived',
            'is_featured'  => 'boolean',
            'published_at' => 'required|date',
            'author'       => 'nullable|string|max:100',
            'thumbnail'    => 'nullable|string',
        ]);

        $validated['slug'] = Str::slug($validated['title']) . '-' . time();

        $news = News::create($validated);
        return response()->json($news, 201);
    }

    public function show($id)
    {
        $news = News::findOrFail($id);
        return response()->json($news);
    }

    public function update(Request $request, $id)
    {
        $news = News::findOrFail($id);

        $validated = $request->validate([
            'title'        => 'sometimes|string|max:255',
            'category'     => 'sometimes|in:Prestasi,Kegiatan,Pengumuman,Akademik',
            'summary'      => 'sometimes|string',
            'content'      => 'sometimes|string',
            'status'       => 'sometimes|in:Published,Draft,Archived',
            'is_featured'  => 'boolean',
            'published_at' => 'sometimes|date',
            'author'       => 'nullable|string|max:100',
            'thumbnail'    => 'nullable|string',
        ]);

        $news->update($validated);
        return response()->json($news);
    }

    public function destroy($id)
    {
        News::findOrFail($id)->delete();
        return response()->json(['message' => 'Berita berhasil dihapus.']);
    }
}

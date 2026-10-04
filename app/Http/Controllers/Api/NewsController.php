<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NewsController extends Controller
{
    public function index()
    {
        $news = News::orderBy('published_at', 'desc')->get();
        return response()->json($news);
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

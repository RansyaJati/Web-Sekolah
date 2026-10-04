<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $perPage = min((int) $request->query('per_page', 24), 100);

        $query = Media::query()
            ->when($request->query('search'), fn ($q, $s) => $q->where('name', 'like', "%{$s}%"))
            ->orderBy('created_at', 'desc');

        return response()->json($query->paginate($perPage));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'file' => 'required|file|image|max:4096',
            'alt' => 'nullable|string|max:255',
        ]);

        $file = $validated['file'];
        $path = $file->store('uploads', 'public');

        $size = @getimagesize($file->getRealPath());

        $media = Media::create([
            'name' => $file->getClientOriginalName(),
            'path' => '/storage/' . $path,
            'mime' => $file->getMimeType(),
            'size' => $file->getSize(),
            'width' => $size[0] ?? null,
            'height' => $size[1] ?? null,
            'alt' => $validated['alt'] ?? null,
        ]);

        return response()->json($media, 201);
    }

    public function destroy($id)
    {
        $media = Media::findOrFail($id);

        // Only delete files we own under /storage/uploads.
        if (str_starts_with($media->path, '/storage/uploads/')) {
            Storage::disk('public')->delete(str_replace('/storage/', '', $media->path));
        }

        $media->delete();

        return response()->json(['message' => 'File berhasil dihapus.']);
    }
}

<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KnowledgeBase;
use Illuminate\Http\Request;

class KnowledgeBaseController extends Controller
{
    public function index(Request $request)
    {
        // Chatbot retrieval: never dump full KB. Require ?limit and support ?category/?search.
        $limit = min((int) $request->query('limit', 20), 50);

        $query = KnowledgeBase::query()
            ->when($request->has('active'), fn ($q) => $q->where('is_active', $request->boolean('active', true)))
            ->when($request->query('category'), fn ($q, $c) => $q->where('category', $c))
            ->when($request->query('search'), fn ($q, $s) => $q->where(function ($w) use ($s) {
                $w->where('topic', 'like', "%{$s}%")->orWhere('content', 'like', "%{$s}%");
            }))
            ->orderBy('topic');

        // Default to active-only when no explicit active filter given.
        if (! $request->has('active')) {
            $query->where('is_active', true);
        }

        return response()->json($query->limit($limit)->get(['id', 'topic', 'category', 'content']));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'topic'     => 'required|string|max:255',
            'category'  => 'required|string|max:100',
            'content'   => 'required|string',
            'is_active' => 'boolean',
        ]);

        $kb = KnowledgeBase::create($validated);
        return response()->json($kb, 201);
    }

    public function update(Request $request, $id)
    {
        $kb = KnowledgeBase::findOrFail($id);

        $validated = $request->validate([
            'topic'     => 'sometimes|string|max:255',
            'category'  => 'sometimes|string|max:100',
            'content'   => 'sometimes|string',
            'is_active' => 'boolean',
        ]);

        $kb->update($validated);
        return response()->json($kb);
    }

    public function destroy($id)
    {
        KnowledgeBase::findOrFail($id)->delete();
        return response()->json(['message' => 'Data knowledge base berhasil dihapus.']);
    }
}

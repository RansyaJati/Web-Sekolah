<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\KnowledgeBase;
use Illuminate\Http\Request;

class KnowledgeBaseController extends Controller
{
    public function index()
    {
        return response()->json(KnowledgeBase::where('is_active', true)->orderBy('topic')->get());
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

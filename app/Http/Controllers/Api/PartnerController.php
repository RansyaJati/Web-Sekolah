<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\IndustryPartner;
use Illuminate\Http\Request;

class PartnerController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) $request->query('per_page', 0);
        $limit = min((int) $request->query('limit', 24), 100);

        $query = IndustryPartner::query()
            ->when($request->has('active'), fn ($q) => $q->where('is_active', $request->boolean('active')))
            ->orderBy('partner_since');

        if ($perPage > 0) {
            return response()->json($query->paginate(min($perPage, 50)));
        }

        return response()->json($query->limit($limit)->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'sector'        => 'required|string|max:100',
            'description'   => 'required|string',
            'logo'          => 'nullable|string',
            'partner_since' => 'nullable|string|max:4',
            'is_active'     => 'boolean',
        ]);

        $partner = IndustryPartner::create($validated);
        return response()->json($partner, 201);
    }

    public function update(Request $request, $id)
    {
        $partner = IndustryPartner::findOrFail($id);

        $validated = $request->validate([
            'name'          => 'sometimes|string|max:255',
            'sector'        => 'sometimes|string|max:100',
            'description'   => 'sometimes|string',
            'logo'          => 'nullable|string',
            'partner_since' => 'nullable|string|max:4',
            'is_active'     => 'boolean',
        ]);

        $partner->update($validated);
        return response()->json($partner);
    }

    public function destroy($id)
    {
        IndustryPartner::findOrFail($id)->delete();
        return response()->json(['message' => 'Mitra berhasil dihapus.']);
    }
}

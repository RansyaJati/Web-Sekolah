<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'category'     => 'required|string|max:100',
            'description'  => 'required|string',
            'image'        => 'nullable|string',
            'features'     => 'nullable|array',
            'price'        => 'nullable|string|max:100',
            'contact'      => 'nullable|string|max:100',
            'is_available' => 'boolean',
        ]);

        $product = Product::create($validated);
        return response()->json($product, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'name'         => 'sometimes|string|max:255',
            'category'     => 'sometimes|string|max:100',
            'description'  => 'sometimes|string',
            'image'        => 'nullable|string',
            'features'     => 'nullable|array',
            'price'        => 'nullable|string|max:100',
            'contact'      => 'nullable|string|max:100',
            'is_available' => 'boolean',
        ]);

        $product->update($validated);
        return response()->json($product);
    }

    public function destroy($id)
    {
        Product::findOrFail($id)->delete();
        return response()->json(['message' => 'Produk berhasil dihapus.']);
    }
}

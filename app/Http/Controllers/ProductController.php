<?php 
namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('products/index', [
            'products' => Product::all(),
            'flash' => session('flash'),
        ]);
    }

    public function create()
    {
        return Inertia::render('products/create', [
            'flash' => session('flash'),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
        ]);
        Product::create($request->only('name', 'price'));
        return redirect()->route('products.index')->with('flash', ['type' => 'success', 'message' => 'Product created successfully!']);
    }

    public function edit(Product $product)
    {
        return Inertia::render('products/Edit', [
            'product' => $product,
            'flash' => session('flash'),
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
        ]);
        $product->update($request->only('name', 'price'));
        return redirect()->route('products.index')->with('flash', ['type' => 'success', 'message' => 'Product updated successfully!']);
    }
    
}
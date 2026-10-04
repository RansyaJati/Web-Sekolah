<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'category', 'description', 'image',
        'features', 'price', 'contact', 'is_available',
    ];

    protected $casts = [
        'features'     => 'array',
        'is_available' => 'boolean',
    ];
}

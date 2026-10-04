<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $fillable = [
        'name', 'code', 'duration', 'description',
        'competencies', 'career_prospects', 'image', 'is_active', 'is_featured',
    ];

    protected $casts = [
        'competencies'    => 'array',
        'career_prospects' => 'array',
        'is_active'       => 'boolean',
        'is_featured'     => 'boolean',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alumni extends Model
{
    protected $fillable = [
        'name', 'graduation_year', 'program', 'current_affiliation',
        'achievement', 'testimonial', 'photo', 'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];
}

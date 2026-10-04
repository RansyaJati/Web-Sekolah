<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Achievement extends Model
{
    protected $fillable = [
        'title', 'student_name', 'competition', 'level',
        'year', 'rank', 'photo', 'description', 'is_featured',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
    ];
}

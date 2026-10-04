<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KnowledgeBase extends Model
{
    protected $table = 'knowledge_bases';

    protected $fillable = [
        'topic', 'category', 'content', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}

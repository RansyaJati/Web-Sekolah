<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class News extends Model
{
    protected $fillable = [
        'title', 'slug', 'category', 'thumbnail', 'summary',
        'content', 'status', 'is_featured', 'published_at', 'author',
    ];

    protected $casts = [
        'is_featured' => 'boolean',
        'published_at' => 'date:Y-m-d',
    ];

    protected static function boot()
    {
        parent::boot();
        static::creating(function ($news) {
            if (empty($news->slug)) {
                $news->slug = Str::slug($news->title) . '-' . time();
            }
        });
    }
}

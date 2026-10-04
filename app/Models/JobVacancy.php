<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobVacancy extends Model
{
    protected $table = 'job_vacancies';

    protected $fillable = [
        'title', 'company', 'location', 'type', 'category',
        'description', 'requirements', 'posted_date', 'deadline_date',
        'apply_link', 'is_active',
    ];

    protected $casts = [
        'requirements'  => 'array',
        'posted_date'   => 'date:Y-m-d',
        'deadline_date' => 'date:Y-m-d',
        'is_active'     => 'boolean',
    ];
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IndustryPartner extends Model
{
    protected $table = 'industry_partners';

    protected $fillable = [
        'name', 'sector', 'description', 'logo', 'partner_since', 'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}

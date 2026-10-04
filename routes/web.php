<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\AchievementController;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\AlumniController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\JobVacancyController;
use App\Http\Controllers\Api\PartnerController;
use App\Http\Controllers\Api\KnowledgeBaseController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\StatsController;
use App\Http\Controllers\Api\ActivityLogController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\MediaController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/ppdb', function () {
    return Inertia::render('PPDB');
})->name('ppdb');

Route::get('/produk-unggulan', function () {
    return Inertia::render('ProdukUnggulan');
})->name('produk-unggulan');

Route::get('/career-center', function () {
    return Inertia::render('CareerCenter');
})->name('career-center');

Route::get('/tentang', function () {
    return Inertia::render('Tentang');
})->name('tentang');

Route::get('/informasi', function () {
    return Inertia::render('Informasi');
})->name('informasi');

Route::get('/berita/{id}', function () {
    return Inertia::render('BeritaDetail');
})->name('berita.detail');

Route::get('/program-keahlian', function () {
    return Inertia::render('ProgramKeahlian');
})->name('program-keahlian');

Route::get('/program-keahlian/{id}', function () {
    return Inertia::render('ProgramDetail');
})->name('program-keahlian.detail');

Route::get('/kontak', function () {
    return Inertia::render('Kontak');
})->name('kontak');

Route::post('/api/chat', [ChatController::class, 'chat'])
    ->middleware('throttle:20,1')
    ->name('api.chat');

/*
|--------------------------------------------------------------------------
| CMS REST API Routes
|--------------------------------------------------------------------------
| Public GET endpoints serve the website. All mutations require an
| authenticated session; successful mutations are recorded to activity_logs.
*/
Route::prefix('api')->group(function () {
    // Public reads (used by the website; paginated/limited at query layer)
    Route::get('/news',           [NewsController::class, 'index']);
    Route::get('/news/{id}',      [NewsController::class, 'show']);
    Route::get('/achievements',          [AchievementController::class, 'index']);
    Route::get('/programs',          [ProgramController::class, 'index']);
    Route::get('/programs/{id}',      [ProgramController::class, 'show']);
    Route::get('/alumni',          [AlumniController::class, 'index']);
    Route::get('/products',          [ProductController::class, 'index']);
    Route::get('/jobs',          [JobVacancyController::class, 'index']);
    Route::get('/partners',          [PartnerController::class, 'index']);
    Route::get('/knowledge-base',          [KnowledgeBaseController::class, 'index']);
    Route::get('/settings',                [SettingController::class, 'index']);
    Route::get('/settings/{key}',          [SettingController::class, 'show']);

    // Authenticated CMS endpoints (admin panel; session cookie, same-origin).
    Route::middleware(['auth', 'log.activity'])->group(function () {
        Route::post('/news',          [NewsController::class, 'store']);
        Route::put('/news/{id}',      [NewsController::class, 'update']);
        Route::delete('/news/{id}',   [NewsController::class, 'destroy']);

        Route::post('/achievements',         [AchievementController::class, 'store']);
        Route::put('/achievements/{id}',     [AchievementController::class, 'update']);
        Route::delete('/achievements/{id}',  [AchievementController::class, 'destroy']);

        Route::post('/programs',         [ProgramController::class, 'store']);
        Route::put('/programs/{id}',     [ProgramController::class, 'update']);
        Route::delete('/programs/{id}',  [ProgramController::class, 'destroy']);

        Route::post('/alumni',         [AlumniController::class, 'store']);
        Route::put('/alumni/{id}',     [AlumniController::class, 'update']);
        Route::delete('/alumni/{id}',  [AlumniController::class, 'destroy']);

        Route::post('/products',         [ProductController::class, 'store']);
        Route::put('/products/{id}',     [ProductController::class, 'update']);
        Route::delete('/products/{id}',  [ProductController::class, 'destroy']);

        Route::post('/jobs',         [JobVacancyController::class, 'store']);
        Route::put('/jobs/{id}',     [JobVacancyController::class, 'update']);
        Route::delete('/jobs/{id}',  [JobVacancyController::class, 'destroy']);

        Route::post('/partners',         [PartnerController::class, 'store']);
        Route::put('/partners/{id}',     [PartnerController::class, 'update']);
        Route::delete('/partners/{id}',  [PartnerController::class, 'destroy']);

        Route::post('/knowledge-base',         [KnowledgeBaseController::class, 'store']);
        Route::put('/knowledge-base/{id}',     [KnowledgeBaseController::class, 'update']);
        Route::delete('/knowledge-base/{id}',  [KnowledgeBaseController::class, 'destroy']);

        Route::post('/settings/{key}',         [SettingController::class, 'update']);

        Route::get('/stats',                [StatsController::class, 'index']);
        Route::get('/activity-logs',         [ActivityLogController::class, 'index']);
        Route::get('/users',                 [UserController::class, 'index']);

        Route::get('/media',                 [MediaController::class, 'index']);
        Route::post('/media',                [MediaController::class, 'store']);
        Route::delete('/media/{id}',         [MediaController::class, 'destroy']);
    });
});

/*
|--------------------------------------------------------------------------
| Admin Panel CMS Routes
|--------------------------------------------------------------------------
| Dedicated separated layout and routing for school content management.
*/
Route::prefix('admin')->group(function () {
    Route::get('/', function () {
        return redirect()->route('admin.dashboard');
    });

    Route::get('/login', function () {
        return Inertia::render('Admin/Login');
    })->name('admin.login');

    // CMS pages require a real authenticated session (see Admin/Login).
    Route::middleware('auth')->group(function () {
        Route::get('/dashboard', function () {
            return Inertia::render('Admin/Dashboard');
        })->name('admin.dashboard');

    Route::get('/news', function () {
        return Inertia::render('Admin/News/Index');
    })->name('admin.news.index');

    Route::get('/news/create', function () {
        return Inertia::render('Admin/News/Form');
    })->name('admin.news.create');

    Route::get('/news/{id}/edit', function () {
        return Inertia::render('Admin/News/Form');
    })->name('admin.news.edit');

    Route::get('/achievements', function () {
        return Inertia::render('Admin/Achievements');
    })->name('admin.achievements');

    Route::get('/programs', function () {
        return Inertia::render('Admin/Programs');
    })->name('admin.programs');

    Route::get('/alumni', function () {
        return Inertia::render('Admin/Alumni');
    })->name('admin.alumni');

    Route::get('/landing-page', function () {
        return Inertia::render('Admin/LandingPageCMS');
    })->name('admin.landing');

    Route::get('/ppdb', function () {
        return Inertia::render('Admin/PPDB');
    })->name('admin.ppdb');

    Route::get('/products', function () {
        return Inertia::render('Admin/Products');
    })->name('admin.products');

    Route::get('/jobs', function () {
        return Inertia::render('Admin/Jobs');
    })->name('admin.jobs');

    Route::get('/partners', function () {
        return Inertia::render('Admin/Partners');
    })->name('admin.partners');

    Route::get('/media', function () {
        return Inertia::render('Admin/Media');
    })->name('admin.media');

    Route::get('/ai', function () {
        return Inertia::render('Admin/AI');
    })->name('admin.ai');

    Route::get('/users', function () {
        return Inertia::render('Admin/Users');
    })->name('admin.users');

    Route::get('/activity', function () {
        return Inertia::render('Admin/Activity');
    })->name('admin.activity');

    Route::get('/settings', function () {
        return Inertia::render('Admin/Settings');
    })->name('admin.settings');
    }); // end auth-protected CMS pages
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

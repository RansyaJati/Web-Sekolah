<?php

use App\Http\Controllers\ChatController;
use App\Http\Controllers\ProfileController;
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

Route::post('/api/chat', [ChatController::class, 'chat'])->name('api.chat');

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

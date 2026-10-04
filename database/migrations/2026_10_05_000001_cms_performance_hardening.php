<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Phase 1-2: performance hardening + minimal CMS tables.
     * - Indexes based on real query patterns (filter/sort/search).
     * - users.role for admin authorization (backend-enforced later).
     * - activity_logs for Admin/Activity (replaces hardcoded INITIAL_ACTIVITIES).
     * - media for Admin/Media library metadata.
     */
    public function up(): void
    {
        // --- Indexes on existing CMS tables ---
        Schema::table('news', function (Blueprint $table) {
            $table->index(['status', 'published_at'], 'news_status_published_idx');
            $table->index('category', 'news_category_idx');
            $table->index('is_featured', 'news_featured_idx');
        });

        Schema::table('achievements', function (Blueprint $table) {
            $table->index(['year', 'is_featured'], 'ach_year_featured_idx');
            $table->index('level', 'ach_level_idx');
        });

        Schema::table('programs', function (Blueprint $table) {
            $table->index(['is_active', 'is_featured'], 'prog_active_featured_idx');
        });

        Schema::table('products', function (Blueprint $table) {
            $table->index(['category', 'is_available'], 'prod_cat_avail_idx');
        });

        Schema::table('job_vacancies', function (Blueprint $table) {
            $table->index(['is_active', 'deadline_date'], 'job_active_deadline_idx');
            $table->index('category', 'job_category_idx');
        });

        Schema::table('industry_partners', function (Blueprint $table) {
            $table->index('is_active', 'partner_active_idx');
        });

        Schema::table('alumni', function (Blueprint $table) {
            $table->index(['is_featured', 'graduation_year'], 'alumni_featured_year_idx');
        });

        Schema::table('knowledge_bases', function (Blueprint $table) {
            $table->index(['category', 'is_active'], 'kb_cat_active_idx');
        });

        // --- Users: role-based access (backend source of truth) ---
        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 30)->default('editor')->after('password');
            $table->boolean('is_active')->default(true)->after('role');
            $table->index('role', 'users_role_idx');
        });

        // --- Activity logs (Admin/Activity) ---
        Schema::create('activity_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('user_name', 100)->nullable();
            $table->string('action', 255);
            $table->string('module', 50)->index();
            $table->string('target', 255)->nullable();
            $table->string('status', 20)->default('Success');
            $table->timestamps();
            $table->index('created_at', 'activity_created_idx');
        });

        // --- Media library metadata (Admin/Media) ---
        Schema::create('media', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('path')->unique();
            $table->string('mime', 100)->nullable();
            $table->unsignedBigInteger('size')->default(0);
            $table->unsignedInteger('width')->nullable();
            $table->unsignedInteger('height')->nullable();
            $table->string('alt', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('media');
        Schema::dropIfExists('activity_logs');

        Schema::table('users', function (Blueprint $table) {
            $table->dropIndexIfExists('users_role_idx');
            $table->dropColumn(['role', 'is_active']);
        });

        Schema::table('knowledge_bases', function (Blueprint $table) {
            $table->dropIndexIfExists('kb_cat_active_idx');
        });
        Schema::table('alumni', function (Blueprint $table) {
            $table->dropIndexIfExists('alumni_featured_year_idx');
        });
        Schema::table('industry_partners', function (Blueprint $table) {
            $table->dropIndexIfExists('partner_active_idx');
        });
        Schema::table('job_vacancies', function (Blueprint $table) {
            $table->dropIndexIfExists('job_active_deadline_idx');
            $table->dropIndexIfExists('job_category_idx');
        });
        Schema::table('products', function (Blueprint $table) {
            $table->dropIndexIfExists('prod_cat_avail_idx');
        });
        Schema::table('programs', function (Blueprint $table) {
            $table->dropIndexIfExists('prog_active_featured_idx');
        });
        Schema::table('achievements', function (Blueprint $table) {
            $table->dropIndexIfExists('ach_year_featured_idx');
            $table->dropIndexIfExists('ach_level_idx');
        });
        Schema::table('news', function (Blueprint $table) {
            $table->dropIndexIfExists('news_status_published_idx');
            $table->dropIndexIfExists('news_category_idx');
            $table->dropIndexIfExists('news_featured_idx');
        });
    }
};

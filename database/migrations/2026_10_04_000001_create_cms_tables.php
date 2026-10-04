<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Berita / Artikel
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('category')->default('Kegiatan');
            $table->string('thumbnail')->nullable();
            $table->text('summary');
            $table->longText('content');
            $table->enum('status', ['Published', 'Draft', 'Archived'])->default('Published');
            $table->boolean('is_featured')->default(false);
            $table->date('published_at');
            $table->string('author')->default('Humas SMKN 1 Cimahi');
            $table->timestamps();
        });

        // 2. Prestasi Siswa
        Schema::create('achievements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('student_name');
            $table->string('competition');
            $table->string('level')->default('Nasional'); // Kota, Provinsi, Nasional, Internasional
            $table->string('year', 4);
            $table->string('rank'); // Juara 1, Juara 2, dll
            $table->string('photo')->nullable();
            $table->text('description')->nullable();
            $table->boolean('is_featured')->default(true);
            $table->timestamps();
        });

        // 3. Program Keahlian (Jurusan)
        Schema::create('programs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code', 20)->unique();
            $table->string('duration')->default('Program 3 Tahun');
            $table->text('description');
            $table->json('competencies')->nullable();
            $table->json('career_prospects')->nullable();
            $table->string('image')->nullable();
            $table->boolean('is_active')->default(true);
            $table->boolean('is_featured')->default(true);
            $table->timestamps();
        });

        // 4. Produk BLUD (Teaching Factory)
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('category')->default('Teknologi');
            $table->text('description');
            $table->string('image')->nullable();
            $table->json('features')->nullable();
            $table->string('price')->nullable();
            $table->string('contact')->nullable();
            $table->boolean('is_available')->default(true);
            $table->timestamps();
        });

        // 5. Lowongan Kerja & Karir BKK
        Schema::create('job_vacancies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('company');
            $table->string('location');
            $table->enum('type', ['Full-time', 'Part-time', 'Magang', 'PKL'])->default('Full-time');
            $table->string('category')->default('Teknologi');
            $table->text('description');
            $table->json('requirements')->nullable();
            $table->date('posted_date');
            $table->date('deadline_date')->nullable();
            $table->string('apply_link')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 6. Mitra Industri
        Schema::create('industry_partners', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sector');
            $table->text('description');
            $table->string('logo')->nullable();
            $table->string('partner_since', 4)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // 7. Testimonial Alumni
        Schema::create('alumni', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('graduation_year', 4);
            $table->string('program');
            $table->string('current_affiliation');
            $table->string('achievement')->nullable();
            $table->text('testimonial');
            $table->string('photo')->nullable();
            $table->boolean('is_featured')->default(true);
            $table->timestamps();
        });

        // 8. AI Knowledge Base (SAPA)
        Schema::create('knowledge_bases', function (Blueprint $table) {
            $table->id();
            $table->string('topic');
            $table->string('category');
            $table->longText('content');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('knowledge_bases');
        Schema::dropIfExists('alumni');
        Schema::dropIfExists('industry_partners');
        Schema::dropIfExists('job_vacancies');
        Schema::dropIfExists('products');
        Schema::dropIfExists('programs');
        Schema::dropIfExists('achievements');
        Schema::dropIfExists('news');
    }
};

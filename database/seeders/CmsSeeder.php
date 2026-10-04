<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CmsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seed Berita
        DB::table('news')->insertOrIgnore([
            [
                'title' => 'Perwakilan Tim CreatorHub Berhasil Meraih Juara 2 dalam Business Challenge HIPMI BERKARIA 2026',
                'slug' => 'tim-creatorhub-juara-2-hipmi-berkaria-2026',
                'category' => 'Prestasi',
                'thumbnail' => '/images/prestasi1.png',
                'summary' => 'Penghargaan tersebut diraih berkat kerja keras dan kekompakan tim dalam mengembangkan solusi digital kewirausahaan.',
                'content' => 'Tim siswa SMKN 1 Cimahi yang tergabung dalam CreatorHub berhasil menunjukkan performa luar biasa dalam ajang HIPMI BERKARIA Challenge 2026 di tingkat Kota Cimahi.',
                'status' => 'Published',
                'is_featured' => true,
                'published_at' => '2026-09-28',
                'author' => 'Humas SMKN 1 Cimahi',
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // 2. Seed Prestasi
        DB::table('achievements')->insertOrIgnore([
            [
                'title' => 'Juara 1 INDORAMA Mechatronics Competition',
                'student_name' => 'Tim Robotik Mekatronika',
                'competition' => 'INDORAMA Vocational Competition',
                'level' => 'Provinsi',
                'year' => '2023',
                'rank' => 'Juara 1',
                'photo' => '/images/prestasi1.png',
                'description' => 'Tingkat Prov. Jawa Barat 2023',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Juara 1 Olimpiade Siswa Indonesia bidang B. Inggris',
                'student_name' => 'Muhammad Raihan',
                'competition' => 'LKP Astikom',
                'level' => 'Nasional',
                'year' => '2024',
                'rank' => 'Juara 1',
                'photo' => '/images/prestasi1.png',
                'description' => 'Meraih nilai tertinggi kategori pemahaman dan pidato.',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Juara 3 LKS Mobile Robotik',
                'student_name' => 'Tim LKS Robotik',
                'competition' => 'LKS SMK Jawa Barat',
                'level' => 'Provinsi',
                'year' => '2024',
                'rank' => 'Juara 3',
                'photo' => '/images/prestasi1.png',
                'description' => 'Tingkat Prov. Jawa Barat 2024',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Juara 2 ITENAS IOT and Science Project Competition',
                'student_name' => 'Arya & Tim SIJA',
                'competition' => 'ITENAS Science Tech Festival',
                'level' => 'Provinsi',
                'year' => '2024',
                'rank' => 'Juara 2',
                'photo' => '/images/prestasi1.png',
                'description' => 'Tingkat Prov. Jawa Barat 2024',
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // 3. Seed Program Keahlian
        $programs = [
            ['Rekayasa Perangkat Lunak', 'RPL', 'Program 3 Tahun', '/images/rekayasaperangkatlunak.png'],
            ['Teknik Otomasi Industri', 'TOI', 'Program 3 Tahun', '/images/teknikotomasiindustri.png'],
            ['Produksi dan Siaran Program Televisi', 'PSPT', 'Program 3 Tahun', '/images/produksisiarandanprogramtelevisi.png'],
            ['Teknik Mekatronika', 'TM', 'Program 3 Tahun', null],
            ['Teknik Elektronika Industri', 'TEI', 'Program 3 Tahun', null],
            ['Teknik Elektronika Komunikasi', 'TEK', 'Program 3 Tahun', null],
            ['Instrumentasi dan Otomatisasi Proses', 'IOP', 'Program 4 Tahun', null],
            ['Teknik Pendingin dan Tata Udara', 'TPTU', 'Program 3 Tahun', null],
            ['Sistem Informatika, Jaringan, dan Aplikasi', 'SIJA', 'Program 4 Tahun', null],
        ];

        foreach ($programs as $p) {
            DB::table('programs')->insertOrIgnore([
                'name' => $p[0],
                'code' => $p[1],
                'duration' => $p[2],
                'description' => "Program keahlian terstandar industri dengan kurikulum berbasis teaching factory untuk mempersiapkan tenaga ahli profesional di bidang {$p[0]}.",
                'image' => $p[3],
                'is_active' => true,
                'is_featured' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 4. Seed Mitra Industri
        $partners = [
            ['PT Telkom Indonesia', 'Telekomunikasi', 'Kerja sama PKL, rekrutmen, dan pengembangan kurikulum bidang IT.', '2015'],
            ['PT Schneider Electric', 'Otomasi Industri', 'Program sertifikasi, PKL, dan donasi peralatan laboratorium.', '2017'],
            ['PT LEN Industri', 'Elektronika Pertahanan', 'Kerja sama PKL dan rekrutmen bidang elektronika dan komunikasi.', '2016'],
            ['PT Daikin Airconditioning', 'HVAC & Refrigerasi', 'Program magang, sertifikasi, dan pengembangan kurikulum TPTU.', '2019'],
            ['PT INTI (Persero)', 'Teknologi Komunikasi', 'Kerja sama penelitian, PKL, dan pengembangan produk.', '2014'],
            ['TVOne', 'Media & Broadcasting', 'Program PKL dan rekrutmen bidang produksi siaran televisi.', '2018'],
        ];

        foreach ($partners as $ptr) {
            DB::table('industry_partners')->insertOrIgnore([
                'name' => $ptr[0],
                'sector' => $ptr[1],
                'description' => $ptr[2],
                'partner_since' => $ptr[3],
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}

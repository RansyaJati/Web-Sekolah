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
            $exists = DB::table('industry_partners')->where('name', $ptr[0])->exists();
            if ($exists) {
                continue;
            }
            DB::table('industry_partners')->insert([
                'name' => $ptr[0],
                'sector' => $ptr[1],
                'description' => $ptr[2],
                'partner_since' => $ptr[3],
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        // 5. Seed Produk BLUD (migrated from resources/js/data/products.ts)
        $products = [
            ['IoT Development Kit', 'Teknologi', 'Kit pengembangan Internet of Things yang dirancang oleh siswa dan guru untuk pembelajaran dan prototyping. Dilengkapi dengan sensor, mikrokontroller, dan modul komunikasi.', ['Arduino compatible', 'Sensor suite lengkap', 'Modul WiFi & Bluetooth', 'Dokumentasi pembelajaran'], 'Hubungi untuk harga'],
            ['Jasa PCB Assembly', 'Elektronika', 'Layanan perakitan PCB (Printed Circuit Board) untuk kebutuhan industri dan prototyping. Dikerjakan oleh teknisi terlatih dengan peralatan berstandar industri.', ['SMD & Through-hole', 'Quality control ketat', 'Harga kompetitif', 'Waktu pengerjaan cepat'], 'Hubungi untuk penawaran'],
            ['Jasa Produksi Video', 'Multimedia', 'Layanan produksi video profesional mulai dari pre-production hingga post-production. Dikerjakan oleh siswa program Produksi dan Siaran Program Televisi.', ['Video profil perusahaan', 'Video dokumentasi', 'Motion graphics', 'Live streaming'], 'Mulai dari Rp 2.000.000'],
            ['Panel Otomasi Industri', 'Teknologi', 'Panel kontrol otomasi industri custom yang dirancang dan dirakit oleh program Teknik Otomasi Industri. Sesuai standar industri nasional.', ['PLC Programming', 'HMI Interface', 'Wiring standar industri', 'Garansi 1 tahun'], 'Hubungi untuk penawaran'],
            ['Jasa Service AC & Pendingin', 'Jasa', 'Layanan perawatan, perbaikan, dan instalasi sistem pendingin udara. Dikerjakan oleh siswa dan guru program Teknik Pendingin dan Tata Udara.', ['Instalasi AC split & central', 'Perawatan berkala', 'Perbaikan & troubleshooting', 'Konsultasi gratis'], 'Mulai dari Rp 150.000'],
            ['Jasa Instalasi Jaringan', 'Teknologi', 'Layanan instalasi dan konfigurasi jaringan komputer untuk sekolah, kantor, dan UMKM. Dikerjakan oleh tim program SIJA.', ['Desain topologi jaringan', 'Instalasi kabel & wireless', 'Konfigurasi server', 'Maintenance support'], 'Hubungi untuk penawaran'],
        ];

        foreach ($products as $prod) {
            $exists = DB::table('products')->where('name', $prod[0])->exists();
            if (! $exists) {
                DB::table('products')->insert([
                    'name' => $prod[0],
                    'category' => $prod[1],
                    'description' => $prod[2],
                    'features' => json_encode($prod[3]),
                    'price' => $prod[4],
                    'is_available' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // 6. Seed Lowongan Kerja BKK (migrated from resources/js/data/career.ts)
        $jobs = [
            ['Junior Software Developer', 'PT Telkom Indonesia', 'Bandung, Jawa Barat', 'Full-time', 'Teknologi', 'Bergabung dengan tim pengembangan aplikasi digital untuk solusi enterprise.', ['Lulusan SMK jurusan RPL/SIJA', 'Menguasai HTML, CSS, JavaScript', 'Memahami dasar database'], '2026-09-15'],
            ['Teknisi Otomasi', 'PT Schneider Electric', 'Cikarang, Jawa Barat', 'Full-time', 'Industri', 'Maintenance dan troubleshooting sistem otomasi industri di lini produksi.', ['Lulusan SMK jurusan TOI/Mekatronika', 'Memahami PLC dan HMI', 'Bersedia kerja shift'], '2026-09-20'],
            ['Video Editor', 'PT Media Kreasi Digital', 'Jakarta Selatan', 'Full-time', 'Multimedia', 'Editing video konten untuk berbagai platform media sosial dan corporate.', ['Lulusan SMK jurusan Broadcast', 'Menguasai Adobe Premiere & After Effects', 'Portfolio wajib'], '2026-09-25'],
            ['Magang Teknisi Elektronika', 'PT LEN Industri', 'Bandung, Jawa Barat', 'Magang', 'Elektronika', 'Program magang di divisi produksi elektronika pertahanan dan komunikasi.', ['Siswa/lulusan SMK jurusan TEI/TEK', 'Memahami rangkaian elektronika', 'Teliti dan disiplin'], '2026-10-01'],
            ['Teknisi HVAC', 'PT Daikin Airconditioning', 'Cimahi, Jawa Barat', 'Full-time', 'Industri', 'Instalasi dan maintenance sistem HVAC untuk gedung komersial.', ['Lulusan SMK jurusan TPTU', 'Memiliki sertifikat kompetensi', 'SIM C'], '2026-10-02'],
            ['Network Administrator', 'PT Biznet Networks', 'Bandung, Jawa Barat', 'Full-time', 'Teknologi', 'Mengelola infrastruktur jaringan dan memastikan uptime layanan pelanggan.', ['Lulusan SMK jurusan SIJA', 'Sertifikasi CCNA diutamakan', 'Bersedia on-call'], '2026-10-03'],
        ];

        foreach ($jobs as $j) {
            $exists = DB::table('job_vacancies')->where('title', $j[0])->where('company', $j[1])->exists();
            if (! $exists) {
                DB::table('job_vacancies')->insert([
                    'title' => $j[0],
                    'company' => $j[1],
                    'location' => $j[2],
                    'type' => $j[3],
                    'category' => $j[4],
                    'description' => $j[5],
                    'requirements' => json_encode($j[6]),
                    'posted_date' => $j[7],
                    'deadline_date' => null,
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // 7. Seed Alumni (migrated from resources/js/data/adminContent.ts)
        $alumni = [
            ['Dinda Permata Putri', '2022', 'Rekayasa Perangkat Lunak', 'Software Engineer di PT Telkom Indonesia', 'Lulusan terbaik angkatan 2022 dan penerima beasiswa talent tech nasional', 'Pendidikan vokasi di SMKN 1 Cimahi sangat aplikatif. Ketika masuk ke industri, saya sudah familiar dengan workflow standar perusahaan.'],
            ['Fikri Aditya Nugraha', '2021', 'Teknik Otomasi Industri', 'Automation Specialist di Schneider Electric', 'Medali Perak LKS Nasional Bidang Industrial Automation', 'Laboratorium di sekolah sudah menggunakan PLC dan sistem standar pabrik modern.'],
        ];

        foreach ($alumni as $a) {
            $exists = DB::table('alumni')->where('name', $a[0])->exists();
            if (! $exists) {
                DB::table('alumni')->insert([
                    'name' => $a[0],
                    'graduation_year' => $a[1],
                    'program' => $a[2],
                    'current_affiliation' => $a[3],
                    'achievement' => $a[4],
                    'testimonial' => $a[5],
                    'is_featured' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // 8. Seed AI Knowledge Base (migrated from Admin/AI + ChatController guardrails)
        $kb = [
            ['Daftar 9 Program Keahlian Unggulan', 'Jurusan', 'RPL (3 Tahun), TOI (3 Tahun), Broadcast/PSPT (3 Tahun), Mekatronika (3 Tahun), TEI (3 Tahun), TEK (3 Tahun), IOP (4 Tahun), TPTU (3 Tahun), SIJA (4 Tahun).'],
            ['Jalur dan Kuota PPDB 2026/2027', 'PPDB', 'Zonasi (50%), Prestasi Akademik/Kejuaraan (30%), Afirmasi KETM (15%), Perpindahan Tugas Orang Tua (5%). Pendaftaran 100% online gratis.'],
            ['Praktik Kerja Lapangan (PKL) & Bursa Kerja', 'BKK', 'PKL berlangsung 3-6 bulan untuk kelas XI dan XII. Memiliki 50+ mitra industri termasuk Telkom, Schneider, LEN, Daikin, INTI, dan Biznet. Serapan kerja alumni mencapai 85%.'],
            ['Produk BLUD Teaching Factory', 'BLUD', 'IoT Development Kit, Perakitan PCB, Jasa Pembuatan Video Broadcast, Panel Kontrol PLC Otomasi, Servis AC TPTU, Instalasi Jaringan SIJA.'],
            ['Kontak Resmi Sekolah', 'Sekolah', 'Jl. Mahar Martanegara No.48, Cimahi Selatan. Telp (022) 6629683. Email info@smkn1cimahi.sch.id.'],
            ['Prestasi Unggulan', 'Prestasi', 'Juara 1 INDORAMA Mechatronics, Juara 1 Olimpiade B. Inggris, Juara 2 HIPMI BERKARIA 2026, Juara 3 LKS Mobile Robotik, Juara 2 ITENAS IoT Competition.'],
        ];

        foreach ($kb as $k) {
            $exists = DB::table('knowledge_bases')->where('topic', $k[0])->exists();
            if (! $exists) {
                DB::table('knowledge_bases')->insert([
                    'topic' => $k[0],
                    'category' => $k[1],
                    'content' => $k[2],
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // 9. Seed initial activity logs (migrated from hardcoded INITIAL_ACTIVITIES)
        if (DB::table('activity_logs')->count() === 0) {
            DB::table('activity_logs')->insert([
                [
                    'user_name' => 'Administrator Utama',
                    'action' => 'Memperbarui Jadwal PPDB 2026/2027',
                    'module' => 'PPDB',
                    'target' => 'Jadwal Pendaftaran',
                    'status' => 'Success',
                    'created_at' => now()->subHours(2),
                    'updated_at' => now()->subHours(2),
                ],
                [
                    'user_name' => 'Humas Sekolah',
                    'action' => 'Mempublikasikan Berita Prestasi',
                    'module' => 'Berita',
                    'target' => 'Juara 2 HIPMI BERKARIA',
                    'status' => 'Success',
                    'created_at' => now()->subHours(3),
                    'updated_at' => now()->subHours(3),
                ],
                [
                    'user_name' => 'Admin BLUD',
                    'action' => 'Menambahkan Produk Baru',
                    'module' => 'BLUD',
                    'target' => 'IoT Development Kit v2',
                    'status' => 'Info',
                    'created_at' => now()->subDay(),
                    'updated_at' => now()->subDay(),
                ],
            ]);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('settings')->insertOrIgnore([
            [
                'key' => 'site_profile',
                'value' => json_encode([
                    'school_name' => 'SMK Negeri 1 Cimahi',
                    'phone' => '(022) 6629683',
                    'email' => 'info@smkn1cimahi.sch.id',
                    'address' => 'Jl. Mahar Martanegara No.48, Utama, Kec. Cimahi Selatan, Kota Cimahi, Jawa Barat 40533',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Profil sekolah memakai updateOrInsert agar perubahan narasi ikut ter-update.
        DB::table('settings')->updateOrInsert(
            ['key' => 'profil_sekolah'],
            [
                'value' => json_encode([
                    'kepala_sekolah' => 'Agus Priyatmono Nugroho, S.Pd., M.Si.',
                    'visi' => 'Menghadirkan pendidikan vokasi unggulan yang menghasilkan SDM bermutu, kompeten, dan berdaya saing tinggi di tingkat nasional maupun internasional.',
                    'misi' => [
                        'Menyelenggarakan pendidikan vokasi berbasis kurikulum selaras industri melalui teaching factory.',
                        'Mengembangkan kompetensi pendidik dan tenaga kependidikan secara berkelanjutan.',
                        'Menanamkan karakter, disiplin, dan budaya kerja industri pada peserta didik.',
                        'Memperluas kemitraan dengan dunia usaha, dunia industri, dan perguruan tinggi.',
                        'Mengoptimalkan layanan BLUD dan Bursa Kerja Khusus untuk kemandirian dan keterserapan lulusan.',
                    ],
                    'sambutan' => 'Selamat datang di website resmi SMK Negeri 1 Cimahi. Sebagai SMK unggulan dan Badan Layanan Umum Daerah (BLUD), kami berkomitmen menghadirkan pendidikan vokasi berstandar industri melalui 9 program keahlian, teaching factory, dan kemitraan erat dengan lebih dari 50 perusahaan. Mari bergabung dan tumbuh bersama kami menuju masa depan yang gemilang.',
                    'sejarah_singkat' => 'SMK Negeri 1 Cimahi adalah sekolah menengah kejuruan negeri di Kota Cimahi, Jawa Barat, yang menyelenggarakan 9 program keahlian di bidang teknologi, industri, dan broadcasting. Berstatus Badan Layanan Umum Daerah (BLUD), sekolah mengintegrasikan pembelajaran dengan produk dan jasa teaching factory berstandar industri, serta menyalurkan lulusan melalui Bursa Kerja Khusus (BKK) dengan tingkat keterserapan kerja yang tinggi.',
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ]
        );

        DB::table('settings')->insertOrIgnore([
            [
                'key' => 'ppdb_info',
                'value' => json_encode([
                    'periode' => 'Tahun Ajaran 2026/2027',
                    'status' => 'Dibuka (Pendaftaran Aktif)',
                    'link_portal' => 'https://ppdb.jabarprov.go.id'
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'ppdb_jalur',
                'value' => json_encode([
                    [
                        'id' => 'zonasi',
                        'name' => 'Jalur Zonasi',
                        'quota' => '50%',
                        'description' => 'Pendaftaran berdasarkan jarak domisili calon peserta didik dengan sekolah.',
                    ],
                    [
                        'id' => 'prestasi',
                        'name' => 'Jalur Prestasi',
                        'quota' => '30%',
                        'description' => 'Pendaftaran berdasarkan prestasi akademik maupun non-akademik.',
                    ],
                    [
                        'id' => 'afirmasi',
                        'name' => 'Jalur Afirmasi',
                        'quota' => '15%',
                        'description' => 'Pendaftaran untuk calon peserta didik dari keluarga ekonomi tidak mampu.',
                    ],
                    [
                        'id' => 'perpindahan',
                        'name' => 'Jalur Perpindahan Orang Tua',
                        'quota' => '5%',
                        'description' => 'Pendaftaran bagi calon peserta didik yang mengikuti perpindahan tugas orang tua/wali.',
                    ]
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'ppdb_jadwal',
                'value' => json_encode([
                    [
                        'step' => 1,
                        'title' => 'Pendaftaran Online',
                        'date' => '1 - 7 Juni 2026',
                        'description' => 'Calon peserta didik melakukan pendaftaran secara online melalui portal PPDB.',
                    ],
                    [
                        'step' => 2,
                        'title' => 'Verifikasi Berkas',
                        'date' => '8 - 12 Juni 2026',
                        'description' => 'Verifikasi kelengkapan dan keabsahan dokumen persyaratan pendaftaran.',
                    ],
                    [
                        'step' => 3,
                        'title' => 'Seleksi',
                        'date' => '13 - 17 Juni 2026',
                        'description' => 'Proses seleksi sesuai jalur pendaftaran yang dipilih oleh calon peserta didik.',
                    ],
                    [
                        'step' => 4,
                        'title' => 'Pengumuman',
                        'date' => '20 Juni 2026',
                        'description' => 'Pengumuman hasil seleksi PPDB melalui portal resmi dan website sekolah.',
                    ],
                    [
                        'step' => 5,
                        'title' => 'Daftar Ulang',
                        'date' => '21 - 25 Juni 2026',
                        'description' => 'Peserta didik yang diterima melakukan daftar ulang dan melengkapi administrasi.',
                    ]
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'ppdb_syarat',
                'value' => json_encode([
                    [
                        'category' => 'Dokumen Wajib',
                        'items' => [
                            'Ijazah SMP/MTs atau surat keterangan lulus',
                            'Akta kelahiran atau surat keterangan lahir',
                            'Kartu Keluarga (KK)',
                            'Pas foto terbaru ukuran 3x4 (4 lembar)',
                            'Fotokopi rapor semester 1-5 SMP/MTs',
                            'Surat keterangan sehat dari dokter',
                        ]
                    ],
                    [
                        'category' => 'Dokumen Tambahan (Sesuai Jalur)',
                        'items' => [
                            'Surat keterangan domisili (jalur zonasi)',
                            'Piagam/sertifikat prestasi (jalur prestasi)',
                            'Surat Keterangan Tidak Mampu / KIP (jalur afirmasi)',
                            'Surat keterangan perpindahan tugas orang tua (jalur perpindahan)',
                        ]
                    ]
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'key' => 'ppdb_faq',
                'value' => json_encode([
                    [
                        'question' => 'Kapan PPDB SMKN 1 Cimahi dibuka?',
                        'answer' => 'PPDB SMKN 1 Cimahi tahun ajaran 2026/2027 dibuka mulai tanggal 1 Juni 2026. Pendaftaran dilakukan secara online melalui portal PPDB.',
                    ],
                    [
                        'question' => 'Apakah pendaftaran dilakukan secara online?',
                        'answer' => 'Ya, seluruh proses pendaftaran PPDB dilakukan secara online melalui portal resmi PPDB. Calon peserta didik dapat mengakses portal melalui website sekolah.',
                    ],
                    [
                        'question' => 'Berapa biaya pendaftaran PPDB?',
                        'answer' => 'Pendaftaran PPDB SMKN 1 Cimahi tidak dipungut biaya apapun. Proses pendaftaran sepenuhnya gratis.',
                    ],
                    [
                        'question' => 'Apa saja jurusan yang tersedia?',
                        'answer' => 'SMKN 1 Cimahi memiliki 9 program keahlian: Rekayasa Perangkat Lunak, Teknik Otomasi Industri, Produksi dan Siaran Program Televisi, Teknik Mekatronika, Teknik Elektronika Industri, Teknik Elektronika Komunikasi, Instrumentasi dan Otomatisasi Proses, Teknik Pendingin dan Tata Udara, serta Sistem Informatika, Jaringan, dan Aplikasi.',
                    ]
                ]),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

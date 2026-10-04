<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Chatbot knowledge from KNOWLEDGE.md: identity, motto, and per-program
 * summaries so SAPA answers specific SMKN 1 Cimahi questions.
 * Idempotent: safe to re-run.
 */
class ChatbotKnowledgeSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [
            ['Identitas Sekolah MAUNG Jawa Barat', 'Sekolah', 'SMKN 1 Cimahi adalah bagian dari identitas Sekolah MAUNG Jawa Barat. MAUNG merepresentasikan semangat Manusia Unggulan: berkompetensi, terampil, berprestasi, berdaya saing, dan siap menghadapi dunia industri serta perkembangan teknologi.'],
            ['Motto Sekolah: Tiada Hari Tanpa Prestasi', 'Sekolah', 'Motto SMKN 1 Cimahi adalah "Tiada Hari Tanpa Prestasi": semangat untuk terus belajar, berkembang, berkarya, meningkatkan kompetensi, dan menghasilkan prestasi.'],
            ['Program TM: Teknik Mekatronika', 'Jurusan', 'Teknik Mekatronika (TM, 3 tahun): mekanik, elektronika, sistem kontrol, sensor, aktuator, PLC, robotika, dan pemrograman sistem kontrol. Prospek: Automation Engineer, PLC Programmer, Robotics Technician, Maintenance Engineer.'],
            ['Program TEI: Teknik Elektronika Industri', 'Jurusan', 'Teknik Elektronika Industri (TEI, 3 tahun): elektronika analog dan digital, mikrokontroler, sistem kendali, PLC, instrumentasi, dan embedded system. Prospek: Electronics Engineer/Technician, Embedded System Engineer, Instrumentation Technician.'],
            ['Program TOI: Teknik Otomasi Industri', 'Jurusan', 'Teknik Otomasi Industri (TOI, 3 tahun): PLC, sistem kontrol, motor listrik, pneumatik, panel kontrol, dan instalasi sistem otomasi. Prospek: Automation Engineer, PLC Programmer, Industrial Automation Specialist.'],
            ['Program TEK: Teknik Elektronika Komunikasi', 'Jurusan', 'Teknik Elektronika Komunikasi (TEK, 3 tahun): elektronika, sistem komunikasi, sinyal dan gelombang, komunikasi digital, antena, dan transmisi data. Prospek: Telecommunication Technician, RF Technician, Field Engineer.'],
            ['Program IOP: Instrumentasi dan Otomatisasi Proses', 'Jurusan', 'Instrumentasi dan Otomatisasi Proses (IOP, 4 tahun): instrumentasi, pengukuran temperatur/tekanan/flow/level, control system, PLC, DCS, dan kalibrasi. Prospek: Instrumentation Engineer, Process Control Technician, Calibration Technician.'],
            ['Program TPTU: Teknik Pemanasan, Tata Udara dan Pendinginan', 'Jurusan', 'TPTU (3 tahun): refrigerasi, AC, HVAC, chiller, tata udara, dan instalasi refrigerasi. Prospek: HVAC Technician, Refrigeration Technician, Service Engineer.'],
            ['Program RPL: Rekayasa Perangkat Lunak', 'Jurusan', 'Rekayasa Perangkat Lunak (RPL, 3 tahun): algoritma, pemrograman web dan mobile, database, UI/UX, API, framework, Git, testing. Bidang pengembangan: AI, Cloud Computing, Cybersecurity, Data Engineering, Game Development. Prospek: Software/Web/Mobile Developer, QA Tester, System Analyst.'],
            ['Program SIJA: Sistem Informasi Jaringan dan Aplikasi', 'Jurusan', 'SIJA (4 tahun): jaringan komputer, routing, switching, server, Linux, cloud computing, keamanan jaringan, dan IoT. Prospek: Network Engineer, System/Network Administrator, Cloud Engineer, DevOps.'],
            ['Program PSPT: Produksi dan Siaran Program Televisi', 'Jurusan', 'PSPT/Broadcasting (3 tahun): videografi, sinematografi, video editing, audio, tata kamera, penyutradaraan, dan penulisan naskah. Terserap di media, production house, advertising, film, dan digital content.'],
        ];

        foreach ($rows as [$topic, $category, $content]) {
            $exists = DB::table('knowledge_bases')->where('topic', $topic)->exists();
            if ($exists) {
                DB::table('knowledge_bases')->where('topic', $topic)->update([
                    'category' => $category,
                    'content' => $content,
                    'is_active' => true,
                    'updated_at' => now(),
                ]);
            } else {
                DB::table('knowledge_bases')->insert([
                    'topic' => $topic,
                    'category' => $category,
                    'content' => $content,
                    'is_active' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}

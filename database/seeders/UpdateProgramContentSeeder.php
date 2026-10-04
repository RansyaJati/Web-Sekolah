<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

/**
 * Official study-program content from KNOWLEDGE.md §5.
 * Description, competencies, and career prospects per jurusan.
 * Idempotent: safe to re-run.
 */
class UpdateProgramContentSeeder extends Seeder
{
    public function run(): void
    {
        $programs = [
            'TM' => [
                'Teknik Mekatronika menggabungkan bidang mekanik, elektronika, sistem kontrol, sensor, aktuator, dan pemrograman untuk membangun sistem otomatis.',
                ['Elektronika dasar', 'Sistem kontrol', 'Mikrokontroler', 'Sensor', 'Aktuator', 'Pneumatik', 'Hidrolik', 'PLC', 'Robotika', 'Pemrograman sistem kontrol', 'Troubleshooting mesin'],
                ['Automation Engineer', 'Automation Technician', 'Control Engineer', 'Robotics Technician', 'PLC Programmer', 'Industrial Technician', 'Maintenance Engineer'],
            ],
            'TEI' => [
                'Teknik Elektronika Industri berfokus pada penerapan elektronika, sistem kontrol, instrumentasi, dan teknologi embedded dalam lingkungan industri.',
                ['Elektronika analog', 'Elektronika digital', 'Mikrokontroler', 'Sensor', 'Sistem kendali', 'PLC', 'Instrumentasi', 'Embedded system', 'Perakitan perangkat elektronik', 'Troubleshooting'],
                ['Electronics Engineer', 'Electronics Technician', 'Control Technician', 'Automation Technician', 'Embedded System Engineer/Technician', 'Maintenance Technician', 'Instrumentation Technician'],
            ],
            'TOI' => [
                'Teknik Otomasi Industri berfokus pada sistem otomatisasi yang digunakan dalam proses industri.',
                ['PLC', 'Sistem kontrol', 'Motor listrik', 'Sensor', 'Aktuator', 'Pneumatik', 'Panel kontrol', 'Instrumentasi', 'Instalasi sistem otomasi', 'Troubleshooting'],
                ['Automation Engineer', 'PLC Programmer', 'Control Engineer', 'Automation Technician', 'Maintenance Engineer', 'Electrical Control Technician', 'Industrial Automation Specialist'],
            ],
            'TEK' => [
                'Teknik Elektronika Komunikasi berfokus pada elektronika dan sistem komunikasi, termasuk pengolahan dan transmisi sinyal serta data.',
                ['Elektronika', 'Sistem komunikasi', 'Sinyal dan gelombang', 'Komunikasi digital', 'Perangkat komunikasi', 'Antena', 'Transmisi data', 'Pengukuran elektronika', 'Troubleshooting'],
                ['Electronics Technician', 'Telecommunication Technician', 'Communication Technician', 'RF Technician', 'Electronics Engineer', 'Technical Support', 'Field Engineer'],
            ],
            'IOP' => [
                'Instrumentasi dan Otomatisasi Proses (IOP) berfokus pada instrumentasi, pengukuran, pengendalian, dan otomatisasi proses industri. Program 4 tahun.',
                ['Instrumentasi', 'Sensor', 'Pengukuran temperatur', 'Pengukuran tekanan', 'Pengukuran flow', 'Pengukuran level', 'Control system', 'PLC', 'DCS', 'Pneumatik', 'Kalibrasi', 'Process control', 'Troubleshooting'],
                ['Instrumentation Engineer', 'Instrumentation Technician', 'Control Engineer', 'Process Control Technician', 'Automation Engineer', 'Calibration Technician', 'Maintenance Engineer'],
            ],
            'TPTU' => [
                'Teknik Pemanasan, Tata Udara dan Pendinginan (TPTU) mempelajari teknologi pemanasan, tata udara, refrigerasi, dan sistem pendingin.',
                ['Refrigerasi', 'AC', 'HVAC', 'Chiller', 'Freezer', 'Tata udara', 'Instalasi refrigerasi', 'Kelistrikan sistem pendingin', 'Maintenance', 'Troubleshooting'],
                ['HVAC Technician', 'Refrigeration Technician', 'AC Technician', 'HVAC Engineer', 'Maintenance Technician', 'Building Maintenance', 'Service Engineer'],
            ],
            'RPL' => [
                'Rekayasa Perangkat Lunak (RPL) berfokus pada proses pengembangan perangkat lunak mulai dari analisis kebutuhan, perancangan, pemrograman, pengujian hingga pemeliharaan aplikasi. Bidang pengembangan: Artificial Intelligence, Cloud Computing, Cybersecurity, Data Engineering, Game Development.',
                ['Algoritma dan pemrograman', 'Pemrograman web', 'Pemrograman mobile', 'Database', 'UI/UX', 'Object-Oriented Programming', 'Software development', 'API', 'Framework', 'Git/version control', 'Testing', 'Debugging'],
                ['Software Developer', 'Web Developer', 'Mobile Developer', 'Frontend Developer', 'Backend Developer', 'Full-Stack Developer', 'QA/Software Tester', 'Database Developer', 'System Analyst'],
            ],
            'SIJA' => [
                'Sistem Informasi Jaringan dan Aplikasi (SIJA) menggabungkan jaringan komputer, server, sistem informasi, infrastruktur teknologi, dan aplikasi. Program 4 tahun.',
                ['Jaringan komputer', 'Routing', 'Switching', 'Server', 'Linux', 'Cloud computing', 'Keamanan jaringan', 'Sistem informasi', 'Database', 'Web', 'Virtualisasi', 'Internet of Things'],
                ['Network Engineer', 'System Administrator', 'Network Administrator', 'Cloud Engineer', 'IT Support', 'DevOps', 'Cybersecurity Technician', 'System Engineer', 'Infrastructure Engineer'],
            ],
            'PSPT' => [
                'Produksi dan Siaran Program Televisi (PSPT) berfokus pada produksi konten audiovisual mulai dari perencanaan, pengambilan gambar, pengolahan audio-video hingga produksi. Lulusan terserap di industri media, production house, advertising, film, social media, dan digital content.',
                ['Videografi', 'Fotografi', 'Sinematografi', 'Video editing', 'Audio', 'Tata kamera', 'Penyutradaraan', 'Penulisan naskah', 'Produksi program', 'Broadcasting', 'Manajemen produksi'],
                ['Videographer', 'Cinematographer', 'Video Editor', 'Camera Operator', 'Sound Engineer', 'Content Creator', 'Production Assistant', 'Scriptwriter', 'Director', 'Creative Producer'],
            ],
        ];

        foreach ($programs as $code => [$desc, $competencies, $careers]) {
            DB::table('programs')->where('code', $code)->update([
                'description' => $desc,
                'competencies' => json_encode($competencies),
                'career_prospects' => json_encode($careers),
                'updated_at' => now(),
            ]);
        }
    }
}

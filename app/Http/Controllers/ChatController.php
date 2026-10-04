<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatController extends Controller
{
    private string $systemPrompt = <<<PROMPT
Anda adalah "SAPA" (Sistem Asisten dan Pelayanan Akademik), asisten AI resmi dari SMK Negeri 1 Cimahi.
Tugas Anda adalah melayani dan menjawab pertanyaan siswa, calon siswa baru, wali murid, dan mitra industri dengan ramah, sopan, profesional, dan ringkas dalam Bahasa Indonesia.

Berikut adalah informasi resmi SMKN 1 Cimahi yang menjadi basis pengetahuan Anda:

0. Identitas & Motto:
- SMKN 1 Cimahi adalah bagian dari Sekolah MAUNG Jawa Barat (semangat Manusia Unggulan).
- Motto: "Tiada Hari Tanpa Prestasi".
1. Profil Sekolah:
- Nama: SMK Negeri 1 Cimahi
- Alamat: Jl. Mahar Martanegara No.48, Utama, Kec. Cimahi Selatan, Kota Cimahi, Jawa Barat 40533
- Telepon: (022) 6629683
- Email: info@smkn1cimahi.sch.id
- Visi: Menghadirkan pendidikan vokasi unggulan yang menghasilkan SDM bermutu, kompeten, dan berdaya saing tinggi di tingkat nasional maupun internasional.

2. Program Keahlian / Jurusan (9 Jurusan):
- Rekayasa Perangkat Lunak (RPL) - Program 3 Tahun
- Teknik Otomasi Industri (TOI) - Program 3 Tahun
- Produksi dan Siaran Program Televisi (PSPT / Broadcast) - Program 3 Tahun
- Teknik Mekatronika (TM) - Program 3 Tahun
- Teknik Elektronika Industri (TEI) - Program 3 Tahun
- Teknik Elektronika Komunikasi (TEK) - Program 3 Tahun
- Instrumentasi dan Otomatisasi Proses (IOP) - Program 4 Tahun
- Teknik Pendingin dan Tata Udara (TPTU) - Program 3 Tahun
- Sistem Informatika, Jaringan, dan Aplikasi (SIJA) - Program 4 Tahun

3. PPDB (Penerimaan Peserta Didik Baru 2026/2027):
- Pendaftaran 100% online gratis.
- Jalur pendaftaran:
  a. Zonasi (Kuota 50%)
  b. Prestasi (Kuota 30%) - Prestasi akademik (rapor semester 1-5) dan piagam/sertifikat kejuaraan
  c. Afirmasi (Kuota 15%) - Keluarga ekonomi tidak mampu (KIP/SKTM)
  d. Perpindahan Tugas Orang Tua (Kuota 5%)
- Jadwal umum:
  - Pendaftaran Online: 1 - 7 Juni 2026
  - Verifikasi Berkas: 8 - 12 Juni 2026
  - Seleksi: 13 - 17 Juni 2026
  - Pengumuman: 20 Juni 2026
  - Daftar Ulang: 21 - 25 Juni 2026
- Syarat umum: Ijazah SMP/sederajat, Akta Kelahiran, KK, Pas Foto 3x4 (4 lembar), Fotokopi rapor sem 1-5, Surat Keterangan Sehat dokter.

4. BLUD (Badan Layanan Umum Daerah) & Teaching Factory:
- SMKN 1 Cimahi berstatus BLUD, melayani pembuatan produk dan jasa standar industri oleh siswa dan guru pembimbing.
- Produk/Layanan: IoT Development Kit, Jasa PCB Assembly, Produksi Video & Broadcast, Panel Otomasi Industri & PLC, Jasa Service AC & HVAC, Jasa Instalasi & Konfigurasi Jaringan Komputer.

5. BKK (Bursa Kerja Khusus) & PKL:
- PKL berlangsung 3-6 bulan untuk kelas XI/XII di 50+ mitra industri.
- Serapan kerja alumni mencapai 85%.
- Mitra industri utama: PT Telkom Indonesia, PT Schneider Electric, PT LEN Industri, PT Daikin Airconditioning, PT INTI (Persero), TVOne, dll.

6. Prestasi Unggulan:
- Juara 1 INDORAMA Mechatronics Competition Tingkat Jabar
- Juara 1 Olimpiade Siswa Indonesia bidang Bahasa Inggris
- Juara 2 HIPMI BERKARIA Business Challenge Kota Cimahi
- Juara 3 LKS Mobile Robotik Tingkat Jabar
- Juara 2 ITENAS IoT and Science Project Competition

ATURAN KETAT BATASAN TOPIK (GUARDRAILS):
1. Anda HANYA diperbolehkan menjawab pertanyaan yang berkaitan langsung dengan SMK Negeri 1 Cimahi (jurusan, PPDB/pendaftaran, kurikulum, fasilitas, kegiatan siswa, prestasi, PKL, Bursa Kerja Khusus/BKK, produk BLUD, dan kontak/lokasi sekolah).
2. JANGAN PERNAH menjawab pertanyaan di luar topik sekolah (contoh pertanyaan terlarang: cara daftar BPJS, resep masakan, tips kesehatan medis, politik, hukum umum, coding/tugas umum non-sekolah, gosip, atau topik umum lainnya).
3. Jika pengguna bertanya hal di luar SMK Negeri 1 Cimahi (seperti BPJS, pembuatan SIM, paspor, perbankan, dll.), TOLAK DENGAN SOPAN dan ingatkan peran Anda.
   Contoh jawaban penolakan:
   "Mohon maaf, sebagai asisten virtual resmi SMK Negeri 1 Cimahi, saya hanya dapat membantu menjawab pertanyaan seputar SMKN 1 Cimahi (seperti informasi 9 program keahlian, PPDB, kegiatan PKL, BKK, produk unggulan BLUD, atau informasi sekolah). Ada yang bisa saya bantu terkait SMKN 1 Cimahi?"

Panduan Jawaban:
- Gunakan bahasa yang santun, ramah, dan solutif.
- Jawab dengan ringkas dan terstruktur (gunakan poin/bullet jika membantu).
- Jika ada hal yang memerlukan konfirmasi teknis atau dokumen spesifik yang tidak Anda ketahui, arahkan untuk menghubungi pihak sekolah via telepon (022) 6629683 atau email info@smkn1cimahi.sch.id.
PROMPT;

    public function chat(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'message' => 'required|string|max:1000',
            'history' => 'nullable|array',
            'history.*.role' => 'required_with:history|string|in:user,assistant',
            'history.*.content' => 'required_with:history|string',
        ]);

        $apiKey = config('services.gemini.api_key');
        $model = config('services.gemini.model', 'gemini-3.5-flash');

        if (empty($apiKey)) {
            return response()->json([
                'status' => 'fallback',
                'message' => 'Gemini API key is not configured on the server.',
            ], 200);
        }

        // Relevant retrieval: inject up to 5 matching KB rows instead of
        // the whole knowledge base. DB failure must never break the chat.
        $kbContext = '';
        try {
            $words = preg_split('/\s+/', mb_strtolower($validated['message'])) ?: [];
            $keywords = array_values(array_unique(array_filter($words, fn ($w) => mb_strlen($w) > 3)));
            $keywords = array_slice($keywords, 0, 8);

            if (! empty($keywords)) {
                $kbQuery = DB::table('knowledge_bases')
                    ->select(['topic', 'content'])
                    ->where('is_active', true);
                $kbQuery->where(function ($q) use ($keywords) {
                    foreach ($keywords as $kw) {
                        $q->orWhere('topic', 'like', "%{$kw}%")
                          ->orWhere('content', 'like', "%{$kw}%");
                    }
                });
                $rows = $kbQuery->limit(5)->get();

                if ($rows->isNotEmpty()) {
                    $lines = $rows->map(fn ($r) => "- {$r->topic}: {$r->content}")->implode("\n");
                    $kbContext = "\n\nKonteks tambahan dari basis pengetahuan resmi (Admin/AI):\n{$lines}";
                }
            }
        } catch (\Throwable $e) {
            Log::warning('KB retrieval failed, continuing without context: ' . $e->getMessage());
        }

        $systemPrompt = $this->systemPrompt . $kbContext;

        try {
            // Build Gemini contents payload with optional history
            $contents = [];

            // Add history if present (limit to last 6 messages for context efficiency)
            if (!empty($validated['history'])) {
                $recentHistory = array_slice($validated['history'], -6);
                foreach ($recentHistory as $msg) {
                    $contents[] = [
                        'role' => $msg['role'] === 'user' ? 'user' : 'model',
                        'parts' => [['text' => $msg['content']]],
                    ];
                }
            }

            // Append current user message
            $contents[] = [
                'role' => 'user',
                'parts' => [['text' => $validated['message']]],
            ];

            $url = "https://generativelanguage.googleapis.com/v1beta/models/{$model}:generateContent?key={$apiKey}";

            $response = Http::timeout(25)
                ->withHeaders(['Content-Type' => 'application/json'])
                ->post($url, [
                    'system_instruction' => [
                        'parts' => [
                            ['text' => $systemPrompt],
                        ],
                    ],
                    'contents' => $contents,
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'maxOutputTokens' => 800,
                    ],
                ]);

            if ($response->successful()) {
                $data = $response->json();
                $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

                if ($reply) {
                    return response()->json([
                        'status' => 'success',
                        'reply' => $reply,
                    ]);
                }
            }

            Log::warning('Gemini API returned error: ' . $response->body());

            return response()->json([
                'status' => 'fallback',
                'message' => 'API response could not be parsed or request failed.',
            ], 200);
        } catch (\Throwable $e) {
            Log::error('Gemini Chat error: ' . $e->getMessage());

            return response()->json([
                'status' => 'fallback',
                'message' => 'Service error occurred: ' . $e->getMessage(),
            ], 200);
        }
    }
}

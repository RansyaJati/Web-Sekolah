/**
 * Chatbot Service
 * 
 * Calls the backend `/api/chat` endpoint powered by Google Gemini AI.
 * Falls back seamlessly to structured local knowledge base if the server
 * API key is missing or offline, ensuring zero UI breakage.
 */

export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export interface ChatService {
    sendMessage(message: string, history?: ChatMessage[]): Promise<string>;
}

// Fallback knowledge base responses
const TOPIC_RESPONSES: Record<string, string> = {
    jurusan: 'SMKN 1 Cimahi memiliki 9 program keahlian unggulan:\n\n1. Rekayasa Perangkat Lunak (RPL)\n2. Teknik Otomasi Industri (TOI)\n3. Produksi dan Siaran Program Televisi (PSPT)\n4. Teknik Mekatronika (TM)\n5. Teknik Elektronika Industri (TEI)\n6. Teknik Elektronika Komunikasi (TEK)\n7. Instrumentasi dan Otomatisasi Proses (IOP)\n8. Teknik Pendingin dan Tata Udara (TPTU)\n9. Sistem Informatika, Jaringan, dan Aplikasi (SIJA)\n\nSetiap program keahlian dirancang sesuai standar industri dan didukung oleh fasilitas laboratorium modern.',
    ppdb: 'PPDB SMKN 1 Cimahi tahun ajaran 2026/2027 dibuka mulai 1 Juni 2026 secara online tanpa dipungut biaya.\n\nJalur pendaftaran:\n- Jalur Zonasi (50%)\n- Jalur Prestasi (30%)\n- Jalur Afirmasi (15%)\n- Jalur Perpindahan Orang Tua (5%)\n\nSilakan kunjungi menu PPDB untuk melihat rincian jadwal dan syarat dokumen lengkap.',
    prestasi: 'Siswa SMKN 1 Cimahi telah meraih berbagai prestasi membanggakan:\n\n- Juara 1 INDORAMA Mechatronics Competition Tingkat Jabar\n- Juara 1 Olimpiade Siswa Indonesia bidang B. Inggris\n- Juara 2 Business Challenge HIPMI BERKARIA 2026\n- Juara 3 LKS Mobile Robotik Tingkat Jabar\n- Juara 2 ITENAS IoT and Science Project Competition',
    pkl: 'Program Praktik Kerja Lapangan (PKL) berlangsung 3 - 6 bulan untuk kelas XI atau XII di 50+ mitra industri seperti PT Telkom, Schneider Electric, PT LEN, Daikin, dan lainnya.\n\nKunjungi halaman PKL & Career Center untuk melihat informasi lengkap.',
    bkk: 'Bursa Kerja Khusus (BKK) SMKN 1 Cimahi memfasilitasi penempatan kerja bagi lulusan dengan tingkat serapan kerja mencapai 85% di berbagai perusahaan nasional dan multinasional.',
    produk: 'Sebagai BLUD, SMKN 1 Cimahi memproduksi berbagai produk dan layanan teaching factory:\n\n- IoT Development Kit\n- Jasa PCB Assembly\n- Jasa Produksi Video & Broadcast\n- Panel Otomasi Industri & PLC\n- Jasa Service AC & Pendingin\n- Jasa Instalasi Jaringan Komputer',
    kontak: 'Hubungi SMKN 1 Cimahi:\n\nAlamat: Jl. Mahar Martanegara No.48, Utama, Cimahi Selatan, Kota Cimahi, Jawa Barat 40533\nTelepon: (022) 6629683\nEmail: info@smkn1cimahi.sch.id',
};

const DEFAULT_RESPONSE = 'Halo! Saya SAPA, asisten virtual SMKN 1 Cimahi. Saya dapat membantu memberikan informasi mengenai:\n\n- Program Keahlian / 9 Jurusan\n- PPDB & Persyaratan Pendaftaran\n- Program PKL & Bursa Kerja Khusus (BKK)\n- Produk Unggulan BLUD\n- Prestasi & Kontak Sekolah\n\nSilakan tanyakan apa yang ingin Anda ketahui!';

function getFallbackResponse(message: string): string {
    const lower = message.toLowerCase();
    const topicKeywords: Record<string, string[]> = {
        jurusan: ['jurusan', 'program keahlian', 'prodi', 'rpl', 'toi', 'broadcast', 'mekatronika', 'elektronika', 'sija', 'tptu', 'instrumentasi'],
        ppdb: ['ppdb', 'pendaftaran', 'daftar', 'spmb', 'masuk', 'persyaratan', 'jadwal pendaftaran', 'biaya'],
        prestasi: ['prestasi', 'juara', 'lomba', 'kompetisi', 'penghargaan', 'pemenang'],
        pkl: ['pkl', 'magang', 'praktik kerja', 'industri'],
        bkk: ['bkk', 'career', 'karir', 'kerja', 'lowongan', 'alumni', 'lulusan'],
        produk: ['produk', 'blud', 'jasa', 'layanan', 'teaching factory'],
        kontak: ['kontak', 'alamat', 'telepon', 'email', 'hubungi', 'lokasi'],
    };

    for (const [topic, keywords] of Object.entries(topicKeywords)) {
        if (keywords.some((kw) => lower.includes(kw))) {
            return TOPIC_RESPONSES[topic];
        }
    }

    return DEFAULT_RESPONSE;
}

export const chatService: ChatService = {
    async sendMessage(message: string, history?: ChatMessage[]): Promise<string> {
        try {
            const formattedHistory = history?.map((m) => ({
                role: m.role,
                content: m.content,
            }));

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    message,
                    history: formattedHistory,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.status === 'success' && data.reply) {
                    return data.reply;
                }
            }
        } catch {
            // Network failure or offline - gracefully fallback
        }

        // Fallback simulation with slight realistic latency
        await new Promise((resolve) => setTimeout(resolve, 600));
        return getFallbackResponse(message);
    },
};

export function createMessageId(): string {
    return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

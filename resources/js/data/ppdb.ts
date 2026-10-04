export interface JalurPendaftaran {
    id: string;
    name: string;
    quota: string;
    description: string;
}

export interface TahapanPPDB {
    step: number;
    title: string;
    date: string;
    description: string;
}

export interface PersyaratanPPDB {
    category: string;
    items: string[];
}

export interface FAQItem {
    question: string;
    answer: string;
}

export const JALUR_PENDAFTARAN: JalurPendaftaran[] = [
    {
        id: 'zonasi',
        name: 'Jalur Zonasi',
        quota: '50%',
        description: 'Pendaftaran berdasarkan jarak domisili calon peserta didik dengan sekolah.',
    },
    {
        id: 'prestasi',
        name: 'Jalur Prestasi',
        quota: '30%',
        description: 'Pendaftaran berdasarkan prestasi akademik maupun non-akademik calon peserta didik.',
    },
    {
        id: 'afirmasi',
        name: 'Jalur Afirmasi',
        quota: '15%',
        description: 'Pendaftaran untuk calon peserta didik dari keluarga ekonomi tidak mampu.',
    },
    {
        id: 'perpindahan',
        name: 'Jalur Perpindahan Orang Tua',
        quota: '5%',
        description: 'Pendaftaran bagi calon peserta didik yang mengikuti perpindahan tugas orang tua/wali.',
    },
];

export const TAHAPAN_PPDB: TahapanPPDB[] = [
    {
        step: 1,
        title: 'Pendaftaran Online',
        date: '1 - 7 Juni 2026',
        description: 'Calon peserta didik melakukan pendaftaran secara online melalui portal PPDB.',
    },
    {
        step: 2,
        title: 'Verifikasi Berkas',
        date: '8 - 12 Juni 2026',
        description: 'Verifikasi kelengkapan dan keabsahan dokumen persyaratan pendaftaran.',
    },
    {
        step: 3,
        title: 'Seleksi',
        date: '13 - 17 Juni 2026',
        description: 'Proses seleksi sesuai jalur pendaftaran yang dipilih oleh calon peserta didik.',
    },
    {
        step: 4,
        title: 'Pengumuman',
        date: '20 Juni 2026',
        description: 'Pengumuman hasil seleksi PPDB melalui portal resmi dan website sekolah.',
    },
    {
        step: 5,
        title: 'Daftar Ulang',
        date: '21 - 25 Juni 2026',
        description: 'Peserta didik yang diterima melakukan daftar ulang dan melengkapi administrasi.',
    },
];

export const PERSYARATAN_PPDB: PersyaratanPPDB[] = [
    {
        category: 'Dokumen Wajib',
        items: [
            'Ijazah SMP/MTs atau surat keterangan lulus',
            'Akta kelahiran atau surat keterangan lahir',
            'Kartu Keluarga (KK)',
            'Pas foto terbaru ukuran 3x4 (4 lembar)',
            'Fotokopi rapor semester 1-5 SMP/MTs',
            'Surat keterangan sehat dari dokter',
        ],
    },
    {
        category: 'Dokumen Tambahan (Sesuai Jalur)',
        items: [
            'Surat keterangan domisili (jalur zonasi)',
            'Piagam/sertifikat prestasi (jalur prestasi)',
            'Surat Keterangan Tidak Mampu / KIP (jalur afirmasi)',
            'Surat keterangan perpindahan tugas orang tua (jalur perpindahan)',
        ],
    },
];

export const FAQ_PPDB: FAQItem[] = [
    {
        question: 'Kapan PPDB SMKN 1 Cimahi dibuka?',
        answer: 'PPDB SMKN 1 Cimahi tahun ajaran 2026/2027 dibuka mulai tanggal 1 Juni 2026. Pendaftaran dilakukan secara online melalui portal PPDB.',
    },
    {
        question: 'Apakah pendaftaran dilakukan secara online?',
        answer: 'Ya, seluruh proses pendaftaran PPDB dilakukan secara online melalui portal resmi PPDB. Calon peserta didik dapat mengakses portal melalui website sekolah.',
    },
    {
        question: 'Berapa biaya pendaftaran PPDB?',
        answer: 'Pendaftaran PPDB SMKN 1 Cimahi tidak dipungut biaya apapun. Proses pendaftaran sepenuhnya gratis.',
    },
    {
        question: 'Apa saja jurusan yang tersedia?',
        answer: 'SMKN 1 Cimahi memiliki 9 program keahlian: Rekayasa Perangkat Lunak, Teknik Otomasi Industri, Produksi dan Siaran Program Televisi, Teknik Mekatronika, Teknik Elektronika Industri, Teknik Elektronika Komunikasi, Instrumentasi dan Otomatisasi Proses, Teknik Pendingin dan Tata Udara, serta Sistem Informatika, Jaringan, dan Aplikasi.',
    },
    {
        question: 'Bagaimana jika ada kendala saat pendaftaran?',
        answer: 'Jika mengalami kendala, silakan hubungi panitia PPDB melalui telepon (022) 6629683 atau datang langsung ke sekolah pada jam kerja.',
    },
    {
        question: 'Apakah ada tes masuk?',
        answer: 'Proses seleksi dilakukan sesuai jalur pendaftaran yang dipilih. Untuk jalur zonasi berdasarkan jarak domisili, jalur prestasi berdasarkan nilai rapor dan prestasi.',
    },
];

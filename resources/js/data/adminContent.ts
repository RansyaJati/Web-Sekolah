/**
 * CMS Content Store & Mock Data Provider
 * Provides unified state for all admin modules.
 */

export interface NewsArticle {
    id: string;
    title: string;
    slug: string;
    category: 'Prestasi' | 'Kegiatan' | 'Pengumuman' | 'Akademik';
    thumbnail: string;
    summary: string;
    content: string;
    status: 'Published' | 'Draft' | 'Archived';
    isFeatured: boolean;
    publishedAt: string;
    author: string;
}

export interface AchievementItem {
    id: string;
    title: string;
    studentName: string;
    competition: string;
    level: 'Kota' | 'Provinsi' | 'Nasional' | 'Internasional';
    year: string;
    rank: string;
    photo: string;
    description: string;
    isFeatured: boolean;
}

export interface ProgramItem {
    id: string;
    name: string;
    code: string;
    duration: '3 Tahun' | '4 Tahun';
    description: string;
    competencies: string[];
    careerProspects: string[];
    image: string;
    isActive: boolean;
    isFeatured: boolean;
}

export interface AlumniItem {
    id: string;
    name: string;
    graduationYear: string;
    program: string;
    currentAffiliation: string;
    achievement: string;
    testimonial: string;
    photo: string;
    isFeatured: boolean;
}

export interface ActivityLogItem {
    id: string;
    user: string;
    action: string;
    module: string;
    target: string;
    timestamp: string;
    status: 'Success' | 'Warning' | 'Info';
}

export const INITIAL_NEWS: NewsArticle[] = [
    {
        id: 'news-1',
        title: 'Perwakilan Tim CreatorHub Meraih Juara 2 dalam Business Challenge HIPMI BERKARIA 2026',
        slug: 'tim-creatorhub-juara-2-hipmi-berkaria-2026',
        category: 'Prestasi',
        thumbnail: '/images/prestasi1.png',
        summary: 'Penghargaan bergengsi tingkat Kota Cimahi berhasil diraih berkat inovasi solusi digital kewirausahaan.',
        content: 'Tim siswa SMKN 1 Cimahi yang tergabung dalam CreatorHub berhasil menunjukkan performa luar biasa dalam ajang HIPMI BERKARIA Challenge 2026. Produk yang dipresentasikan berupa ekosistem digital untuk pemasaran produk UMKM lokal.',
        status: 'Published',
        isFeatured: true,
        publishedAt: '2026-09-28',
        author: 'Humas SMKN 1 Cimahi'
    },
    {
        id: 'news-2',
        title: 'SMKN 1 Cimahi Selenggarakan Uji Kompetensi Keahlian (UKK) Berstandar Industri 2026',
        slug: 'penyelenggaraan-ukk-standar-industri-2026',
        category: 'Akademik',
        thumbnail: '/images/rekayasaperangkatlunak.png',
        summary: 'Uji kompetensi melibatkan asesor eksternal dari PT Telkom Indonesia dan PT Schneider Electric.',
        content: 'Seluruh peserta didik tingkat akhir dari 9 program keahlian mengikuti ujian praktik langsung di hadapan para praktisi industri.',
        status: 'Published',
        isFeatured: false,
        publishedAt: '2026-09-20',
        author: 'Kurikulum'
    }
];

export const INITIAL_ACHIEVEMENTS: AchievementItem[] = [
    {
        id: 'ach-1',
        title: 'Juara 1 INDORAMA Mechatronics Competition',
        studentName: 'Tim Robotik Mekatronika',
        competition: 'INDORAMA Vocational Competition',
        level: 'Provinsi',
        year: '2023',
        rank: 'Juara 1',
        photo: '/images/prestasi1.png',
        description: 'Merancang sistem otomasi konveyor dengan efisiensi energi terbaik.',
        isFeatured: true
    },
    {
        id: 'ach-2',
        title: 'Juara 1 Olimpiade Siswa Indonesia bidang B. Inggris',
        studentName: 'Muhammad Raihan',
        competition: 'National English Championship LKP Astikom',
        level: 'Nasional',
        year: '2024',
        rank: 'Juara 1',
        photo: '/images/prestasi1.png',
        description: 'Meraih skor tertinggi pada kategori speech and comprehension.',
        isFeatured: true
    },
    {
        id: 'ach-3',
        title: 'Juara 3 LKS Mobile Robotik',
        studentName: 'Tim LKS Robotik',
        competition: 'Lomba Kompetensi Siswa (LKS) SMK',
        level: 'Provinsi',
        year: '2024',
        rank: 'Juara 3',
        photo: '/images/prestasi1.png',
        description: 'Pengembangan autonomous mobile robot untuk navigasi pergudangan.',
        isFeatured: true
    },
    {
        id: 'ach-4',
        title: 'Juara 2 ITENAS IoT and Science Project',
        studentName: 'Arya & Tim SIJA',
        competition: 'ITENAS Science Tech Festival',
        level: 'Provinsi',
        year: '2024',
        rank: 'Juara 2',
        photo: '/images/prestasi1.png',
        description: 'Sistem monitoring kualitas udara berbasis LoRa dan cloud dashboard.',
        isFeatured: true
    }
];

export const INITIAL_PROGRAMS: ProgramItem[] = [
    {
        id: 'prog-1',
        name: 'Rekayasa Perangkat Lunak',
        code: 'RPL',
        duration: '3 Tahun',
        description: 'Fokus pada pengembangan aplikasi web, mobile, database, dan arsitektur cloud.',
        competencies: ['Fullstack Web Dev', 'Mobile Android/iOS', 'Database Architecture', 'RESTful API & DevOps'],
        careerProspects: ['Software Engineer', 'Frontend/Backend Dev', 'QA Engineer', 'Database Administrator'],
        image: '/images/rekayasaperangkatlunak.png',
        isActive: true,
        isFeatured: true
    },
    {
        id: 'prog-2',
        name: 'Teknik Otomasi Industri',
        code: 'TOI',
        duration: '3 Tahun',
        description: 'Keahlian dalam instalasi, pemeliharaan, serta pemrograman sistem otomasi PLC dan robotik industri.',
        competencies: ['PLC Programming', 'SCADA & HMI', 'Pneumatik & Hidrolik', 'Wiring Panel Industri'],
        careerProspects: ['Automation Engineer', 'PLC Programmer', 'Maintenance Specialist'],
        image: '/images/teknikotomasiindustri.png',
        isActive: true,
        isFeatured: true
    },
    {
        id: 'prog-3',
        name: 'Produksi dan Siaran Program Televisi',
        code: 'PSPT',
        duration: '3 Tahun',
        description: 'Kompetensi broadcasting profesional, tata kamera, tata suara, live streaming, dan penyutradaraan.',
        competencies: ['Camera Operation', 'Video Editing & VFX', 'Lighting & Audio Engineer', 'Broadcasting Setup'],
        careerProspects: ['Video Editor', 'Camera Person', 'Broadcast Director', 'Content Creator Pro'],
        image: '/images/produksisiarandanprogramtelevisi.png',
        isActive: true,
        isFeatured: true
    }
];

export const INITIAL_ALUMNI: AlumniItem[] = [
    {
        id: 'alm-1',
        name: 'Dinda Permata Putri',
        graduationYear: '2022',
        program: 'Rekayasa Perangkat Lunak',
        currentAffiliation: 'Software Engineer di PT Telkom Indonesia',
        achievement: 'Lulusan terbaik angkatan 2022 dan penerima beasiswa talent tech nasional',
        testimonial: 'Pendidikan vokasi di SMKN 1 Cimahi sangat aplikatif. Ketika masuk ke industri, saya sudah familiar dengan workflow standar perusahaan.',
        photo: '/images/logosmk.png',
        isFeatured: true
    },
    {
        id: 'alm-2',
        name: 'Fikri Aditya Nugraha',
        graduationYear: '2021',
        program: 'Teknik Otomasi Industri',
        currentAffiliation: 'Automation Specialist di Schneider Electric',
        achievement: 'Medali Perak LKS Nasional Bidang Industrial Automation',
        testimonial: 'Laboratorium di sekolah sudah menggunakan PLC dan sistem standar pabrik modern.',
        photo: '/images/logosmk.png',
        isFeatured: true
    }
];

export const INITIAL_ACTIVITIES: ActivityLogItem[] = [
    {
        id: 'act-1',
        user: 'Administrator Utama',
        action: 'Memperbarui Jadwal PPDB 2026/2027',
        module: 'PPDB',
        target: 'Jadwal Pendaftaran',
        timestamp: '04 Okt 2026 — 11:20 WIB',
        status: 'Success'
    },
    {
        id: 'act-2',
        user: 'Humas Sekolah',
        action: 'Mempublikasikan Berita Prestasi',
        module: 'Berita',
        target: 'Juara 2 HIPMI BERKARIA',
        timestamp: '04 Okt 2026 — 10:45 WIB',
        status: 'Success'
    },
    {
        id: 'act-3',
        user: 'Admin BLUD',
        action: 'Menambahkan Produk Baru',
        module: 'BLUD',
        target: 'IoT Development Kit v2',
        timestamp: '03 Okt 2026 — 16:30 WIB',
        status: 'Info'
    }
];

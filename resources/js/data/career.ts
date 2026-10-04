export interface JobListing {
    id: string;
    title: string;
    company: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Magang' | 'PKL';
    category: string;
    description: string;
    requirements: string[];
    postedDate: string;
}

export interface IndustryPartner {
    id: string;
    name: string;
    sector: string;
    description: string;
    logo: string | null;
    partnerSince: string;
}

export interface PKLInfo {
    title: string;
    description: string;
    duration: string;
    requirements: string[];
}

export interface CareerStats {
    label: string;
    value: string;
    description: string;
}

export const CAREER_STATS: CareerStats[] = [
    { label: 'Mitra Industri', value: '50+', description: 'Perusahaan mitra kerja sama' },
    { label: 'Alumni Bekerja', value: '85%', description: 'Tingkat penyerapan lulusan' },
    { label: 'Siswa PKL/Tahun', value: '400+', description: 'Siswa mengikuti PKL setiap tahun' },
    { label: 'Lowongan Tersedia', value: '20+', description: 'Lowongan aktif dari mitra' },
];

export const JOB_LISTINGS: JobListing[] = [
    {
        id: 'job-1',
        title: 'Junior Software Developer',
        company: 'PT Telkom Indonesia',
        location: 'Bandung, Jawa Barat',
        type: 'Full-time',
        category: 'Teknologi',
        description: 'Bergabung dengan tim pengembangan aplikasi digital untuk solusi enterprise.',
        requirements: ['Lulusan SMK jurusan RPL/SIJA', 'Menguasai HTML, CSS, JavaScript', 'Memahami dasar database'],
        postedDate: '2026-09-15',
    },
    {
        id: 'job-2',
        title: 'Teknisi Otomasi',
        company: 'PT Schneider Electric',
        location: 'Cikarang, Jawa Barat',
        type: 'Full-time',
        category: 'Industri',
        description: 'Maintenance dan troubleshooting sistem otomasi industri di lini produksi.',
        requirements: ['Lulusan SMK jurusan TOI/Mekatronika', 'Memahami PLC dan HMI', 'Bersedia kerja shift'],
        postedDate: '2026-09-20',
    },
    {
        id: 'job-3',
        title: 'Video Editor',
        company: 'PT Media Kreasi Digital',
        location: 'Jakarta Selatan',
        type: 'Full-time',
        category: 'Multimedia',
        description: 'Editing video konten untuk berbagai platform media sosial dan corporate.',
        requirements: ['Lulusan SMK jurusan Broadcast', 'Menguasai Adobe Premiere & After Effects', 'Portfolio wajib'],
        postedDate: '2026-09-25',
    },
    {
        id: 'job-4',
        title: 'Magang Teknisi Elektronika',
        company: 'PT LEN Industri',
        location: 'Bandung, Jawa Barat',
        type: 'Magang',
        category: 'Elektronika',
        description: 'Program magang di divisi produksi elektronika pertahanan dan komunikasi.',
        requirements: ['Siswa/lulusan SMK jurusan TEI/TEK', 'Memahami rangkaian elektronika', 'Teliti dan disiplin'],
        postedDate: '2026-10-01',
    },
    {
        id: 'job-5',
        title: 'Teknisi HVAC',
        company: 'PT Daikin Airconditioning',
        location: 'Cimahi, Jawa Barat',
        type: 'Full-time',
        category: 'Industri',
        description: 'Instalasi dan maintenance sistem HVAC untuk gedung komersial.',
        requirements: ['Lulusan SMK jurusan TPTU', 'Memiliki sertifikat kompetensi', 'SIM C'],
        postedDate: '2026-10-02',
    },
    {
        id: 'job-6',
        title: 'Network Administrator',
        company: 'PT Biznet Networks',
        location: 'Bandung, Jawa Barat',
        type: 'Full-time',
        category: 'Teknologi',
        description: 'Mengelola infrastruktur jaringan dan memastikan uptime layanan pelanggan.',
        requirements: ['Lulusan SMK jurusan SIJA', 'Sertifikasi CCNA diutamakan', 'Bersedia on-call'],
        postedDate: '2026-10-03',
    },
];

export const INDUSTRY_PARTNERS: IndustryPartner[] = [
    {
        id: 'partner-1',
        name: 'PT Telkom Indonesia',
        sector: 'Telekomunikasi',
        description: 'Kerja sama PKL, rekrutmen, dan pengembangan kurikulum bidang IT.',
        logo: null,
        partnerSince: '2015',
    },
    {
        id: 'partner-2',
        name: 'PT Schneider Electric',
        sector: 'Otomasi Industri',
        description: 'Program sertifikasi, PKL, dan donasi peralatan laboratorium.',
        logo: null,
        partnerSince: '2017',
    },
    {
        id: 'partner-3',
        name: 'PT LEN Industri',
        sector: 'Elektronika Pertahanan',
        description: 'Kerja sama PKL dan rekrutmen bidang elektronika dan komunikasi.',
        logo: null,
        partnerSince: '2016',
    },
    {
        id: 'partner-4',
        name: 'PT Daikin Airconditioning',
        sector: 'HVAC & Refrigerasi',
        description: 'Program magang, sertifikasi, dan pengembangan kurikulum TPTU.',
        logo: null,
        partnerSince: '2019',
    },
    {
        id: 'partner-5',
        name: 'PT INTI (Persero)',
        sector: 'Teknologi Komunikasi',
        description: 'Kerja sama penelitian, PKL, dan pengembangan produk.',
        logo: null,
        partnerSince: '2014',
    },
    {
        id: 'partner-6',
        name: 'TVOne',
        sector: 'Media & Broadcasting',
        description: 'Program PKL dan rekrutmen bidang produksi siaran televisi.',
        logo: null,
        partnerSince: '2018',
    },
];

export const PKL_INFO: PKLInfo = {
    title: 'Praktik Kerja Lapangan (PKL)',
    description: 'Program PKL merupakan bagian integral dari kurikulum SMK yang memberikan pengalaman kerja nyata di industri. Siswa ditempatkan di perusahaan mitra selama periode tertentu untuk mengembangkan kompetensi sesuai bidang keahliannya.',
    duration: '3 - 6 Bulan',
    requirements: [
        'Siswa kelas XI atau XII SMKN 1 Cimahi',
        'Telah menyelesaikan seluruh mata pelajaran prasyarat',
        'Memiliki rekomendasi dari guru pembimbing',
        'Mengikuti pembekalan PKL yang diselenggarakan sekolah',
        'Mematuhi tata tertib perusahaan mitra',
    ],
};

export const FAQ_CAREER = [
    {
        question: 'Bagaimana cara mendaftar PKL?',
        answer: 'Pendaftaran PKL dilakukan melalui koordinator PKL di masing-masing program keahlian. Siswa akan dibantu dalam penempatan di perusahaan mitra sesuai bidang keahliannya.',
    },
    {
        question: 'Apakah BKK membantu penempatan kerja?',
        answer: 'Ya, BKK (Bursa Kerja Khusus) SMKN 1 Cimahi aktif membantu alumni dalam mencari pekerjaan. BKK menjalin kerja sama dengan berbagai perusahaan mitra untuk penempatan kerja lulusan.',
    },
    {
        question: 'Berapa lama durasi PKL?',
        answer: 'Durasi PKL berkisar antara 3-6 bulan, tergantung program keahlian dan kebijakan perusahaan mitra.',
    },
    {
        question: 'Apakah siswa mendapat sertifikat PKL?',
        answer: 'Ya, setelah menyelesaikan PKL, siswa akan mendapatkan sertifikat dari perusahaan mitra dan sekolah sebagai bukti pengalaman kerja.',
    },
];

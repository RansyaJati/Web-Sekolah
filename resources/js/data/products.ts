export interface Product {
    id: string;
    name: string;
    category: string;
    description: string;
    image: string | null;
    features: string[];
    price?: string;
    contact?: string;
}

export const PRODUCT_CATEGORIES = [
    'Semua',
    'Teknologi',
    'Elektronika',
    'Multimedia',
    'Jasa',
] as const;

export const PRODUCTS: Product[] = [
    {
        id: 'iot-kit',
        name: 'IoT Development Kit',
        category: 'Teknologi',
        description: 'Kit pengembangan Internet of Things yang dirancang oleh siswa dan guru untuk pembelajaran dan prototyping. Dilengkapi dengan sensor, mikrokontroller, dan modul komunikasi.',
        image: null,
        features: ['Arduino compatible', 'Sensor suite lengkap', 'Modul WiFi & Bluetooth', 'Dokumentasi pembelajaran'],
        price: 'Hubungi untuk harga',
    },
    {
        id: 'pcb-assembly',
        name: 'Jasa PCB Assembly',
        category: 'Elektronika',
        description: 'Layanan perakitan PCB (Printed Circuit Board) untuk kebutuhan industri dan prototyping. Dikerjakan oleh teknisi terlatih dengan peralatan berstandar industri.',
        image: null,
        features: ['SMD & Through-hole', 'Quality control ketat', 'Harga kompetitif', 'Waktu pengerjaan cepat'],
        price: 'Hubungi untuk penawaran',
    },
    {
        id: 'video-production',
        name: 'Jasa Produksi Video',
        category: 'Multimedia',
        description: 'Layanan produksi video profesional mulai dari pre-production hingga post-production. Dikerjakan oleh siswa program Produksi dan Siaran Program Televisi.',
        image: null,
        features: ['Video profil perusahaan', 'Video dokumentasi', 'Motion graphics', 'Live streaming'],
        price: 'Mulai dari Rp 2.000.000',
    },
    {
        id: 'automation-panel',
        name: 'Panel Otomasi Industri',
        category: 'Teknologi',
        description: 'Panel kontrol otomasi industri custom yang dirancang dan dirakit oleh program Teknik Otomasi Industri. Sesuai standar industri nasional.',
        image: null,
        features: ['PLC Programming', 'HMI Interface', 'Wiring standar industri', 'Garansi 1 tahun'],
        price: 'Hubungi untuk penawaran',
    },
    {
        id: 'ac-service',
        name: 'Jasa Service AC & Pendingin',
        category: 'Jasa',
        description: 'Layanan perawatan, perbaikan, dan instalasi sistem pendingin udara. Dikerjakan oleh siswa dan guru program Teknik Pendingin dan Tata Udara.',
        image: null,
        features: ['Instalasi AC split & central', 'Perawatan berkala', 'Perbaikan & troubleshooting', 'Konsultasi gratis'],
        price: 'Mulai dari Rp 150.000',
    },
    {
        id: 'network-setup',
        name: 'Jasa Instalasi Jaringan',
        category: 'Teknologi',
        description: 'Layanan instalasi dan konfigurasi jaringan komputer untuk sekolah, kantor, dan UMKM. Dikerjakan oleh tim program SIJA.',
        image: null,
        features: ['Desain topologi jaringan', 'Instalasi kabel & wireless', 'Konfigurasi server', 'Maintenance support'],
        price: 'Hubungi untuk penawaran',
    },
];

export const BLUD_INFO = {
    title: 'Badan Layanan Umum Daerah',
    description: 'SMKN 1 Cimahi sebagai Badan Layanan Umum Daerah (BLUD) menghasilkan berbagai produk dan layanan unggulan yang dikembangkan melalui program teaching factory. Seluruh produk dan jasa dikerjakan oleh siswa di bawah bimbingan guru profesional dengan standar industri.',
    benefits: [
        'Produk berkualitas dengan harga terjangkau',
        'Dikerjakan dengan standar industri',
        'Mendukung pembelajaran teaching factory',
        'Kontribusi langsung untuk pengembangan kompetensi siswa',
    ],
};

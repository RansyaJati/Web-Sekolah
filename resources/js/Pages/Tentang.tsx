import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeader from '@/Components/SectionHeader';
import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { cmsService, type ProfilSekolah } from '@/services/cms';

const FALLBACK: Required<ProfilSekolah> = {
    visi: 'Menghadirkan pendidikan vokasi unggulan yang menghasilkan SDM bermutu, kompeten, dan berdaya saing tinggi di tingkat nasional maupun internasional.',
    misi: [
        'Menyelenggarakan pendidikan vokasi berbasis kurikulum selaras industri melalui teaching factory.',
        'Mengembangkan kompetensi pendidik dan tenaga kependidikan secara berkelanjutan.',
        'Menanamkan karakter, disiplin, dan budaya kerja industri pada peserta didik.',
        'Memperluas kemitraan dengan dunia usaha, dunia industri, dan perguruan tinggi.',
        'Mengoptimalkan layanan BLUD dan Bursa Kerja Khusus untuk kemandirian dan keterserapan lulusan.',
    ],
    sambutan: 'Selamat datang di website resmi SMK Negeri 1 Cimahi.',
    sejarah_singkat: 'SMK Negeri 1 Cimahi adalah sekolah menengah kejuruan negeri di Kota Cimahi, Jawa Barat.',
};

const FASILITAS = [
    { title: 'Laboratorium Komputer & Jaringan', desc: 'Lab RPL, SIJA, dan multimedia dengan perangkat modern.' },
    { title: 'Workshop Otomasi & Mekatronika', desc: 'Panel PLC, pneumatik, dan sistem robotik standar industri.' },
    { title: 'Studio Broadcasting', desc: 'Kamera profesional, lighting, audio, dan ruang editing.' },
    { title: 'Bengkel Elektronika & Pendingin', desc: 'Praktik instalasi, troubleshooting, dan servis.' },
    { title: 'Perpustakaan & E-Library', desc: 'Koleksi fisik dan digital untuk pembelajaran mandiri.' },
    { title: 'Sarana Olahraga & Ibadah', desc: 'Lapangan, aula, masjid, dan area kegiatan siswa.' },
];

const EKSTRAKURIKULER = [
    'Robotik', 'Broadcast & Jurnalistik', 'Paskibra', 'Pramuka', 'Futsal',
    'Basket', 'Seni Musik & Tari', 'Rohis', 'PMR', 'English Club', 'IT Club',
];

const STATS = [
    { value: '9', label: 'Program Keahlian', desc: 'Teknologi, industri & broadcast' },
    { value: '50+', label: 'Mitra Industri', desc: 'PKL & rekrutmen' },
    { value: '85%', label: 'Serapan Lulusan', desc: 'Via BKK' },
    { value: '400+', label: 'Siswa PKL/Tahun', desc: 'Di perusahaan mitra' },
];

export default function Tentang() {
    const [profil, setProfil] = useState<Required<ProfilSekolah>>(FALLBACK);

    useEffect(() => {
        let cancelled = false;
        cmsService
            .getSettingsBatch<{ profil_sekolah: ProfilSekolah }>(['profil_sekolah'])
            .then((data) => {
                if (cancelled || !data.profil_sekolah) return;
                setProfil({ ...FALLBACK, ...data.profil_sekolah });
            })
            .catch(() => {})
            .finally(() => {});
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <PublicLayout
            title="Tentang Kami - SMK Negeri 1 Cimahi"
            description="Profil, visi misi, sambutan kepala sekolah, fasilitas, dan ekstrakurikuler SMKN 1 Cimahi."
        >
            {/* HERO */}
            <section className="relative bg-galaxy overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-universe blur-3xl" />
                    <div className="absolute -bottom-10 left-10 w-96 h-96 rounded-full bg-planetary blur-3xl" />
                </div>
                <div className="relative max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-28">
                    <div className="max-w-2xl">
                        <span className="inline-block text-sm font-medium text-venus mb-4">Profil Sekolah</span>
                        <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-[56px] leading-[1.1]">
                            Tentang SMKN<br />1 Cimahi
                        </h1>
                        <p className="mt-5 text-white/70 text-base lg:text-lg leading-relaxed max-w-lg">
                            {profil.sejarah_singkat}
                        </p>
                    </div>
                </div>
            </section>

            {/* SAMBUTAN */}
            <section className="bg-white py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-4">
                        <div className="bg-milky-way rounded-2xl border border-gray-100 p-8 text-center lg:sticky lg:top-24">
                            <div className="w-24 h-24 rounded-full bg-galaxy text-white flex items-center justify-center mx-auto font-display text-3xl font-bold">
                                S
                            </div>
                            <h3 className="mt-4 font-bold text-galaxy">Kepala Sekolah</h3>
                            <p className="text-xs text-gray-500 mt-1">SMK Negeri 1 Cimahi</p>
                        </div>
                    </div>
                    <div className="lg:col-span-8">
                        <SectionHeader title="Sambutan Kepala Sekolah" centered={false} />
                        <p className="mt-4 text-base text-gray-600 leading-relaxed">{profil.sambutan}</p>
                        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4">
                            {STATS.map((s) => (
                                <div key={s.label} className="text-center p-5 bg-milky-way rounded-xl">
                                    <p className="font-display text-planetary text-3xl font-bold">{s.value}</p>
                                    <p className="mt-1 font-semibold text-galaxy text-sm">{s.label}</p>
                                    <p className="mt-0.5 text-xs text-gray-500">{s.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* VISI MISI */}
            <section className="bg-milky-way py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <SectionHeader
                        title="Visi & Misi"
                        description="Arah dan komitmen SMKN 1 Cimahi sebagai institusi pendidikan vokasi unggulan."
                    />
                    <div className="mt-12 max-w-3xl mx-auto bg-galaxy rounded-2xl p-8 lg:p-10 text-center">
                        <p className="text-xs font-semibold tracking-widest uppercase text-venus mb-3">Visi</p>
                        <p className="font-display text-white text-xl sm:text-2xl leading-relaxed">{profil.visi}</p>
                    </div>
                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        {profil.misi.map((m, i) => (
                            <div key={i} className="bg-white rounded-xl border border-gray-200 p-6">
                                <span className="inline-flex w-9 h-9 rounded-full bg-sky/30 text-planetary font-bold text-sm items-center justify-center">
                                    {i + 1}
                                </span>
                                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{m}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FASILITAS */}
            <section className="bg-white py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <SectionHeader
                        title="Fasilitas Sekolah"
                        description="Sarana praktik dan penunjang pembelajaran berstandar industri."
                    />
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {FASILITAS.map((f) => (
                            <div key={f.title} className="bg-milky-way p-6 rounded-2xl border border-gray-100">
                                <h3 className="font-bold text-galaxy">{f.title}</h3>
                                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EKSTRAKURIKULER */}
            <section className="bg-milky-way py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12 text-center">
                    <SectionHeader
                        title="Ekstrakurikuler"
                        description="Wadah pengembangan minat, bakat, dan karakter peserta didik."
                    />
                    <div className="mt-10 flex flex-wrap justify-center gap-2.5 max-w-3xl mx-auto">
                        {EKSTRAKURIKULER.map((e) => (
                            <span key={e} className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-medium text-galaxy">
                                {e}
                            </span>
                        ))}
                    </div>
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Link
                            href="/program-keahlian"
                            className="bg-planetary text-white text-sm font-semibold px-7 py-3 rounded-[10px] hover:bg-planetary/90 transition-colors"
                        >
                            Lihat Program Keahlian
                        </Link>
                        <Link
                            href="/ppdb"
                            className="text-planetary text-sm font-semibold px-7 py-3 rounded-[10px] border border-planetary hover:bg-planetary hover:text-white transition-colors"
                        >
                            Daftar PPDB
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

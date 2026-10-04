import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeader from '@/Components/SectionHeader';
import Reveal from '@/Components/Reveal';
import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { cmsService, type ProfilSekolah } from '@/services/cms';

const FALLBACK: Required<ProfilSekolah> = {
    kepala_sekolah: 'Agus Priyatmono Nugroho, S.Pd., M.Si.',
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
                <img
                    src="/images/bannertentang.jpg"
                    alt="Gedung SMK Negeri 1 Cimahi"
                    fetchPriority="low"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover anim-hero-settle"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-galaxy/95 via-galaxy/60 to-galaxy/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-galaxy/90 via-transparent to-transparent" />
                <div className="relative max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-28">
                    <div className="max-w-2xl anim-fade-up">
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
                <Reveal className="max-w-container mx-auto px-6 lg:px-12 grid lg:grid-cols-12 gap-10 items-start">
                    <div className="lg:col-span-4">
                        <div className="bg-milky-way rounded-2xl border border-gray-100 p-8 text-center lg:sticky lg:top-24">
                            <img
                                src="/images/kepsek.jpg"
                                alt="Kepala SMK Negeri 1 Cimahi"
                                loading="lazy"
                                decoding="async"
                                className="w-36 h-44 rounded-2xl object-cover object-top mx-auto shadow-md"
                            />
                            <h3 className="mt-4 font-bold text-galaxy">{profil.kepala_sekolah}</h3>
                            <p className="text-xs text-gray-500 mt-1">Kepala SMK Negeri 1 Cimahi</p>
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
                </Reveal>
            </section>

            {/* IDENTITAS MAUNG + MOTTO */}
            <section className="bg-galaxy py-20 lg:py-24 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-planetary blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-universe blur-3xl" />
                </div>
                <div className="relative max-w-container mx-auto px-6 lg:px-12 text-center">
                    <Reveal>
                        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-venus">
                            Identitas Kami
                        </p>
                        <h2 className="mt-3 font-display text-white text-3xl sm:text-4xl leading-tight">
                            Sekolah MAUNG Jawa Barat
                        </h2>
                        <p className="mt-5 text-white/70 text-base leading-relaxed max-w-2xl mx-auto">
                            SMKN 1 Cimahi adalah salah satu Sekolah MAUNG di Jawa Barat.
                            MAUNG merepresentasikan semangat <span className="text-white font-semibold">Manusia Unggulan</span>:
                            peserta didik yang berkompetensi, terampil, berprestasi, berdaya saing,
                            dan siap menghadapi dunia industri serta perkembangan teknologi.
                        </p>
                    </Reveal>
                    <Reveal delay={120}>
                        <blockquote className="mt-10 inline-block border-y border-white/20 py-6 px-8">
                            <p className="font-display text-venus text-2xl sm:text-3xl italic">
                                &ldquo;Tiada Hari Tanpa Prestasi&rdquo;
                            </p>
                            <cite className="mt-2 block text-xs not-italic tracking-widest uppercase text-white/50">
                                Motto SMKN 1 Cimahi
                            </cite>
                        </blockquote>
                    </Reveal>
                </div>
            </section>

            {/* VISI MISI */}
            <section className="bg-milky-way py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <SectionHeader
                        title="Visi & Misi"
                        description="Arah dan komitmen SMKN 1 Cimahi sebagai institusi pendidikan vokasi unggulan."
                    />
                    <Reveal className="mt-12 max-w-3xl mx-auto bg-galaxy rounded-2xl p-8 lg:p-10 text-center">
                        <p className="text-xs font-semibold tracking-widest uppercase text-venus mb-3">Visi</p>
                        <p className="font-display text-white text-xl sm:text-2xl leading-relaxed">{profil.visi}</p>
                    </Reveal>
                    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        {profil.misi.map((m, i) => (
                            <Reveal key={i} delay={(i % 3) * 90}>
                            <div className="bg-white rounded-xl border border-gray-200 p-6 h-full">
                                <span className="inline-flex w-9 h-9 rounded-full bg-sky/30 text-planetary font-bold text-sm items-center justify-center">
                                    {i + 1}
                                </span>
                                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{m}</p>
                            </div>
                            </Reveal>
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
                        {FASILITAS.map((f, i) => (
                            <Reveal key={f.title} delay={(i % 3) * 90}>
                            <div className="bg-milky-way p-6 rounded-2xl border border-gray-100 h-full">
                                <h3 className="font-bold text-galaxy">{f.title}</h3>
                                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
                            </div>
                            </Reveal>
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

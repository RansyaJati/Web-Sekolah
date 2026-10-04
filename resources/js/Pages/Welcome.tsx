import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useEffect, useRef, useState, useCallback } from 'react';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import Chatbot from '@/Components/Chatbot';

/* ── reveal on scroll ── */
function useScrollReveal<T extends HTMLElement>(): [(node: T | null) => void, boolean] {
    const [visible, setVisible] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    const setRef = useCallback((node: T | null) => {
        if (observerRef.current) {
            observerRef.current.disconnect();
            observerRef.current = null;
        }
        if (!node) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    io.disconnect();
                }
            },
            { threshold: 0.1 },
        );
        io.observe(node);
        observerRef.current = io;
    }, []);

    return [setRef, visible];
}

/* ── data 9 jurusan ── */
const JURUSAN: { title: string; duration: string; img: string | null; gradient: string }[] = [
    { title: 'Rekayasa Perangkat Lunak', duration: 'Program 3 Tahun', img: '/images/rekayasaperangkatlunak.png', gradient: '' },
    { title: 'Teknik Otomasi Industri', duration: 'Program 3 Tahun', img: '/images/teknikotomasiindustri.png', gradient: '' },
    { title: 'Produksi dan Siaran Program Televisi', duration: 'Program 3 Tahun', img: '/images/produksisiarandanprogramtelevisi.png', gradient: '' },
    { title: 'Teknik Mekatronika', duration: 'Program 3 Tahun', img: null, gradient: 'from-universe to-galaxy' },
    { title: 'Teknik Elektronika Industri', duration: 'Program 3 Tahun', img: null, gradient: 'from-planetary to-galaxy' },
    { title: 'Teknik Elektronika Komunikasi', duration: 'Program 3 Tahun', img: null, gradient: 'from-venus to-galaxy' },
    { title: 'Instrumentasi dan Otomatisasi Proses', duration: 'Program 4 Tahun', img: null, gradient: 'from-universe/80 to-galaxy' },
    { title: 'Teknik Pendingin dan Tata Udara', duration: 'Program 3 Tahun', img: null, gradient: 'from-planetary/70 to-galaxy' },
    { title: 'Sistem Informatika, Jaringan, dan Aplikasi', duration: 'Program 4 Tahun', img: null, gradient: 'from-sky to-galaxy' },
];

export default function Welcome(_props: PageProps) {
    const [heroRef, heroVisible] = useScrollReveal<HTMLElement>();
    const [stripRef, stripVisible] = useScrollReveal<HTMLDivElement>();
    const [programRef, programVisible] = useScrollReveal<HTMLDivElement>();
    const [beritaRef, beritaVisible] = useScrollReveal<HTMLDivElement>();

    /* ── carousel jurusan ── */
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [canPrev, setCanPrev] = useState(false);
    const [canNext, setCanNext] = useState(true);
    const [activePage, setActivePage] = useState(0);

    const updateCarousel = useCallback(() => {
        const el = trackRef.current;
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        setCanPrev(el.scrollLeft > 8);
        setCanNext(el.scrollLeft < maxScroll - 8);
        setActivePage(maxScroll <= 0 ? 0 : Math.min(2, Math.round((el.scrollLeft / maxScroll) * 2)));
    }, []);

    useEffect(() => {
        updateCarousel();
        window.addEventListener('resize', updateCarousel);
        return () => window.removeEventListener('resize', updateCarousel);
    }, [updateCarousel, programVisible]);

    const scrollCards = (dir: 1 | -1) => {
        const el = trackRef.current;
        if (!el) return;
        const w = window.innerWidth;
        const perView = w >= 1024 ? 3 : w >= 640 ? 2 : 1;
        const gap = 24;
        const cardW = (el.clientWidth - gap * (perView - 1)) / perView;
        el.scrollBy({ left: dir * (cardW + gap), behavior: 'smooth' });
    };

    const goPage = (p: number) => {
        const el = trackRef.current;
        if (!el) return;
        const maxScroll = el.scrollWidth - el.clientWidth;
        el.scrollTo({ left: (maxScroll * p) / 2, behavior: 'smooth' });
    };

    return (
        <div className="bg-white text-gray-900 antialiased scroll-smooth">
            <Head title="SMK Negeri 1 Cimahi" />
            <Navbar currentPath="/" />

            {/* ═══════════ HERO ═══════════ */}
            <section id="beranda" ref={heroRef} className="relative w-full h-[480px] sm:h-[560px] overflow-hidden bg-galaxy">
                <img
                    src="/images/smkn1_upacara.png"
                    alt="Upacara SMK Negeri 1 Cimahi"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-galaxy/95 via-galaxy/60 to-galaxy/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-galaxy/90 via-transparent to-transparent" />

                <div className="relative h-full max-w-container mx-auto px-6 lg:px-12 flex items-center">
                    <div className={`max-w-[500px] transition-all duration-700 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-[56px] leading-[1.1]">
                            SMK Negeri 1 Cimahi:<br />
                            Excellence in Vocational<br />
                            Education
                        </h1>
                        <p className="mt-5 text-white/80 text-sm sm:text-base leading-relaxed max-w-[400px]">
                            SMK Unggulan yang Menghasilkan SDM Bermutu dan Berdaya Saing Tinggi di Tingkat Nasional maupun Internasional.
                        </p>
                        <div className="mt-7 flex flex-wrap gap-3">
                            <a href="#tentang" className="text-white text-sm font-medium px-6 py-2.5 rounded-[10px] border border-white/50 hover:bg-white hover:text-galaxy transition-all">
                                Jelajahi Profil
                            </a>
                            <Link href="/ppdb" className="bg-planetary text-white text-sm font-semibold px-6 py-2.5 rounded-[10px] hover:bg-planetary/90 transition-colors">
                                Daftar PPDB
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <span className="w-14 h-[5px] rounded-full bg-white" />
                    <span className="w-5 h-[5px] rounded-full bg-white/40" />
                    <span className="w-5 h-[5px] rounded-full bg-white/40" />
                </div>
            </section>

            {/* ═══════════ STRIP 4 INFO ═══════════ */}
            <section id="tentang" ref={stripRef} className="bg-white">
                <div className={`max-w-container mx-auto px-6 lg:px-12 py-16 grid grid-cols-2 lg:grid-cols-4 gap-y-10 transition-all duration-700 ${stripVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    {[
                        {
                            icon: (
                                <svg className="w-11 h-11 mx-auto text-galaxy" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 6c-1.5-1.5-3.5-2-8-2v14c4.5 0 6.5.5 8 2 1.5-1.5 3.5-2 8-2V4c-4.5 0-6.5.5-8 2zm0 12.5c-1-.8-2-1.2-4-1.4V7.6c2 .2 3 .6 4 1.4v9.5zm2 0V9.1c1-.8 2-1.2 4-1.4v9.4c-2 .2-3 .6-4 1.4z" />
                                </svg>
                            ),
                            title: 'Kurikulum',
                            desc: 'Program keahlian terstandar industri dengan pendekatan teaching factory.',
                        },
                        {
                            icon: (
                                <svg className="w-11 h-11 mx-auto text-galaxy" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-3.3 0-8 1.7-8 5v3h9v-2H6.5v-1c0-2 3.6-3 5.5-3s5.5 1 5.5 3v1H15v2h5v-3c0-3.3-4.7-5-8-5zM18 8v6m3-3h-6" stroke="currentColor" strokeWidth={1.6} fill="none" strokeLinecap="round" />
                                </svg>
                            ),
                            title: 'Pendaftaran',
                            desc: 'Informasi lengkap mengenai PPDB dan persyaratan pendaftaran siswa baru.',
                            href: '/ppdb',
                        },
                        {
                            icon: (
                                <svg className="w-11 h-11 mx-auto text-galaxy" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16M16 8h2a2 2 0 012 2v11M2 21h20M7 7h4v4H7zM7 13h4v4H7zm6-6h.01M14 13h.01M18 13h.01" stroke="currentColor" strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ),
                            title: 'Fasilitas',
                            desc: 'Laboratorium Modern dan WorkShop Berstandar Industri.',
                        },
                        {
                            icon: (
                                <svg className="w-11 h-11 mx-auto text-galaxy" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 2h12v2h4v3a5 5 0 01-5 5h-.42A6 6 0 0113 15.92V18h4v4H7v-4h4v-2.08A6 6 0 017.42 12H7a5 5 0 01-5-5V4h4V2zm0 4H4v1a3 3 0 003 3V6zm12 0v4a3 3 0 003-3V6h-3z" />
                                </svg>
                            ),
                            title: 'Prestasi',
                            desc: 'Kumpulan Penghargaan dari tingkat Nasional hingga Internasional.',
                        },
                    ].map((item, i) => (
                        <div key={item.title} className={`relative text-center px-5 ${i > 0 ? 'lg:before:content-[""] lg:before:absolute lg:before:left-0 lg:before:top-3 lg:before:bottom-3 lg:before:border-l lg:before:border-dotted lg:before:border-gray-300' : ''}`}>
                            {item.icon}
                            <h3 className="mt-3 text-sm font-bold text-galaxy">{item.title}</h3>
                            <p className="mt-1.5 text-xs leading-relaxed text-gray-500 max-w-[200px] mx-auto">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════ HEADING PROGRAM ═══════════ */}
            <section className="bg-white">
                <div className="max-w-4xl mx-auto px-6 pt-8 pb-10 text-center">
                    <h2 className="font-display text-planetary text-3xl sm:text-4xl leading-[1.2]">
                        Program Teknik, Ketenagalistrikan, PPLG, dan Broadcast bagi Para Pemimpin Masa Depan
                    </h2>
                    <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-[620px] mx-auto">
                        Pilih dari berbagai pilihan program Kejuruan yang dirancang khusus untuk mengembangkan keahlian Putra Putri Bangsa dan mempersiapkan Anda menghadapi tantangan global.
                    </p>
                </div>
            </section>

            {/* ═══════════ CAROUSEL JURUSAN ═══════════ */}
            <section id="program" ref={programRef} className="bg-white pb-20">
                <div className={`max-w-container mx-auto px-6 lg:px-12 transition-all duration-700 ${programVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="relative">
                        {/* Left arrow */}
                        <button
                            onClick={() => scrollCards(-1)}
                            disabled={!canPrev}
                            aria-label="Geser ke kiri"
                            className="hidden sm:flex absolute -left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-galaxy text-white items-center justify-center shadow-lg hover:bg-planetary transition-all disabled:opacity-30 disabled:cursor-default"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* Track */}
                        <div
                            ref={trackRef}
                            onScroll={updateCarousel}
                            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth pb-2 -mx-1 px-1"
                        >
                            {JURUSAN.map((j) => (
                                <article
                                    key={j.title}
                                    className="group relative rounded-lg overflow-hidden h-[380px] bg-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-500 snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                                >
                                    {j.img ? (
                                        <img src={j.img} alt={j.title} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className={`absolute inset-0 bg-gradient-to-b ${j.gradient}`}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="font-display text-white/20 text-[110px] leading-none select-none">
                                                    {j.title.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-galaxy via-galaxy/35 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <h3 className="font-display text-white text-2xl leading-[1.2]">{j.title}</h3>
                                        <p className="mt-1.5 text-white/70 text-xs">{j.duration}</p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Right arrow */}
                        <button
                            onClick={() => scrollCards(1)}
                            disabled={!canNext}
                            aria-label="Geser ke kanan"
                            className="hidden sm:flex absolute -right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-galaxy text-white items-center justify-center shadow-lg hover:bg-planetary transition-all disabled:opacity-30 disabled:cursor-default"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Dots + mobile buttons */}
                    <div className="mt-8 flex items-center justify-center gap-3">
                        <button
                            onClick={() => scrollCards(-1)}
                            aria-label="Sebelumnya"
                            className="sm:hidden w-9 h-9 rounded-full border border-galaxy text-galaxy flex items-center justify-center disabled:opacity-30"
                            disabled={!canPrev}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        {[0, 1, 2].map((p) => (
                            <button
                                key={p}
                                onClick={() => goPage(p)}
                                aria-label={`Halaman ${p + 1}`}
                                className={`h-2 rounded-full transition-all duration-300 ${activePage === p ? 'w-8 bg-galaxy' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                            />
                        ))}
                        <button
                            onClick={() => scrollCards(1)}
                            aria-label="Berikutnya"
                            className="sm:hidden w-9 h-9 rounded-full border border-galaxy text-galaxy flex items-center justify-center disabled:opacity-30"
                            disabled={!canNext}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* ═══════════ BERITA TERKINI ═══════════ */}
            <section id="berita" ref={beritaRef} className="bg-milky-way py-20">
                <div className={`max-w-container mx-auto px-6 lg:px-12 transition-all duration-700 ${beritaVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <h2 className="font-display text-planetary text-3xl sm:text-4xl text-center">Berita Terkini</h2>
                    <div className="mt-3 flex justify-center">
                        <span className="bg-sky/50 text-planetary text-xs font-medium px-3 py-1 rounded-full">SMK Negeri 1 Cimahi</span>
                    </div>

                    <div className="mt-10 grid lg:grid-cols-2 gap-6 items-start">
                        {/* Main news */}
                        <article className="rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                            <img src="/images/prestasi1.png" alt="Prestasi siswa SMK Negeri 1 Cimahi" className="w-full h-64 sm:h-80 object-cover" />
                            <div className="bg-galaxy p-5">
                                <h3 className="text-white text-sm font-bold leading-snug">
                                    Perwakilan Tim CreatorHub Berhasil Meraih Juara 2 dalam Ajang Business Challenge HIPMI BERKARIA Challenge 2026 di Tingkat Kota Cimahi
                                </h3>
                                <p className="mt-2.5 text-white/60 text-xs leading-relaxed">
                                    Penghargaan tersebut diraih berkat kerja keras dan kekompakan tim dalam mengembangkan solusi digital kewirausahaan.
                                </p>
                            </div>
                        </article>

                        {/* Side achievements */}
                        <div>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {[
                                    { t: 'Juara 1 INDORAMA Mechatronics Competition', s: 'Tingkat Prov. Jawa Barat 2023' },
                                    { t: 'Juara 1 Olimpiade Siswa Indonesia bidang B. Inggris', s: 'LKP Astikom' },
                                    { t: 'Juara 3 LKS Mobile Robotik', s: 'Tingkat Prov. Jawa Barat 2024' },
                                    { t: 'Juara 2 ITENAS IOT and Science Project Competition', s: 'Tingkat Prov. Jawa Barat 2024' },
                                ].map((p) => (
                                    <div key={p.t} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg p-3.5 shadow-sm hover:shadow-md transition-shadow">
                                        <span className="w-9 h-9 shrink-0 rounded-[10px] bg-galaxy flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M6 2h12v2h4v3a5 5 0 01-5 5h-.42A6 6 0 0113 15.92V18h4v4H7v-4h4v-2.08A6 6 0 017.42 12H7a5 5 0 01-5-5V4h4V2zm0 4H4v1a3 3 0 003 3V6zm12 0v4a3 3 0 003-3V6h-3z" />
                                            </svg>
                                        </span>
                                        <div>
                                            <p className="text-xs font-bold text-galaxy leading-tight">{p.t}</p>
                                            <p className="text-[11px] text-gray-500 mt-0.5">{p.s}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 border border-gray-200 rounded-lg p-5 bg-white">
                                <p className="text-sm font-bold text-galaxy mb-3">Prestasi lainnya</p>
                                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
                                    {[
                                        'Perencanaan, pelaksanaan dan evaluasi pembelajaran',
                                        'Penerapan teknologi TIK (Learning management system, e-raport, tes berbasis komputer, e-library)',
                                        'Peningkatan kompetensi pendidik dan tenaga kependidikan (In House Training, training of trainer, upskilling, reskilling, sertifikasi guru dan magang guru)',
                                        'Melakukan supervisi administrasi akademik',
                                        'Penyelarasan kurikulum dengan industri',
                                        'Pengelolaan Program guru tamu',
                                        'Penerapan pembelajaran berbasis projek (PBL) dan teaching factory.',
                                    ].map((x) => (
                                        <div key={x} className="flex gap-2">
                                            <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-planetary flex items-center justify-center">
                                                <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                            <p className="text-xs text-gray-600 leading-relaxed">{x}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ CTA STRIP ═══════════ */}
            <section className="bg-planetary py-16">
                <div className="max-w-container mx-auto px-6 lg:px-12 text-center">
                    <h2 className="font-display text-white text-2xl sm:text-3xl leading-[1.2]">
                        Siap Bergabung dengan SMKN 1 Cimahi?
                    </h2>
                    <p className="mt-3 text-white/70 text-sm max-w-md mx-auto leading-relaxed">
                        Daftarkan diri Anda sekarang dan jadilah bagian dari generasi unggul yang siap bersaing di dunia industri.
                    </p>
                    <div className="mt-7 flex flex-wrap justify-center gap-3">
                        <Link
                            href="/ppdb"
                            className="bg-white text-planetary text-sm font-semibold px-7 py-3 rounded-[10px] hover:bg-milky-way transition-colors"
                        >
                            Daftar PPDB
                        </Link>
                        <Link
                            href="/career-center"
                            className="text-white text-sm font-semibold px-7 py-3 rounded-[10px] border border-white/40 hover:bg-white/10 transition-colors"
                        >
                            Lihat Lowongan
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
            <Chatbot />
        </div>
    );
}

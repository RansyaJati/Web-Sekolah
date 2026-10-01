import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useEffect, useRef, useState, useCallback } from 'react';

/* ── reveal on scroll (animasi secukupnya, tidak mengubah layout) ── */
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
    { title: 'Teknik Mekatronika', duration: 'Program 3 Tahun', img: null, gradient: 'from-slate-500 to-[#232a7a]' },
    { title: 'Teknik Elektronika Industri', duration: 'Program 3 Tahun', img: null, gradient: 'from-sky-600 to-[#232a7a]' },
    { title: 'Teknik Elektronika Komunikasi', duration: 'Program 3 Tahun', img: null, gradient: 'from-indigo-500 to-[#232a7a]' },
    { title: 'Instrumentasi dan Otomatisasi Proses', duration: 'Program 4 Tahun', img: null, gradient: 'from-cyan-600 to-[#232a7a]' },
    { title: 'Teknik Pendingin dan Tata Udara', duration: 'Program 3 Tahun', img: null, gradient: 'from-blue-500 to-[#232a7a]' },
    { title: 'Sistem Informatika, Jaringan, dan Aplikasi', duration: 'Program 4 Tahun', img: null, gradient: 'from-violet-600 to-[#232a7a]' },
];

export default function Welcome(_props: PageProps) {
    const [heroRef, heroVisible] = useScrollReveal<HTMLElement>();
    const [stripRef, stripVisible] = useScrollReveal<HTMLDivElement>();
    const [programRef, programVisible] = useScrollReveal<HTMLDivElement>();
    const [beritaRef, beritaVisible] = useScrollReveal<HTMLDivElement>();
    const [mobileOpen, setMobileOpen] = useState(false);

    /* ── carousel jurusan: tampil 3, geser ke samping ── */
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

            {/* ═══════════ NAVBAR ═══════════ */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-4">
                    {/* logo */}
                    <a href="#beranda" className="flex items-center gap-2.5 shrink-0">
                        <img src="/images/logosmk.png" alt="Logo SMK Negeri 1 Cimahi" className="w-9 h-9 object-contain" />
                        <span className="text-[15px] font-bold text-[#101c5b] underline underline-offset-4 decoration-[#101c5b]/60">
                            SMK Negeri 1 Cimahi
                        </span>
                    </a>

                    {/* menu desktop */}
                    <nav className="hidden lg:flex items-center gap-5 text-[13px] font-medium text-[#2b2f6b]">
                        <a href="#tentang" className="hover:text-blue-700 transition-colors">Tentang</a>
                        <a href="#berita" className="hover:text-blue-700 transition-colors">Informasi</a>
                        <a href="#kontak" className="hover:text-blue-700 transition-colors">SPMB 2026</a>
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-blue-700 transition-colors">
                                Program Keahlian
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="w-72 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                                    {JURUSAN.map((j) => (
                                        <a key={j.title} href="#program" className="block px-4 py-2 text-[12px] text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                                            {j.title}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <a href="#berita" className="hover:text-blue-700 transition-colors">Berita</a>
                        <a href="#kontak" className="hover:text-blue-700 transition-colors">Kontak</a>
                        <div className="relative group">
                            <button className="flex items-center gap-1 hover:text-blue-700 transition-colors">
                                Lainnya
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                <div className="w-44 bg-white rounded-lg shadow-xl border border-gray-100 py-2">
                                    {['Galeri', 'Prestasi', 'BKK', 'Hubungi Kami'].map((x) => (
                                        <a key={x} href="#kontak" className="block px-4 py-2 text-[12px] text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                                            {x}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </nav>

                    {/* kanan: search + toggle */}
                    <div className="hidden lg:flex items-center gap-3">
                        <button aria-label="Cari" className="text-[#2b2f6b] hover:text-blue-700 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M10 18a8 8 0 110-16 8 8 0 010 16z" />
                            </svg>
                        </button>
                        <div className="w-14 h-[22px] rounded-full bg-gradient-to-r from-slate-200 to-[#8ea2e8] border border-[#8ea2e8]/60" />
                    </div>

                    {/* hamburger mobile */}
                    <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-[#2b2f6b]" aria-label="Menu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {mobileOpen
                                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                        </svg>
                    </button>
                </div>

                {/* menu mobile */}
                <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100 ${mobileOpen ? 'max-h-[480px]' : 'max-h-0'}`}>
                    <div className="px-5 py-2">
                        {[
                            { href: '#tentang', label: 'Tentang' },
                            { href: '#berita', label: 'Informasi' },
                            { href: '#kontak', label: 'SPMB 2026' },
                            { href: '#program', label: 'Program Keahlian' },
                            { href: '#berita', label: 'Berita' },
                            { href: '#kontak', label: 'Kontak' },
                        ].map((l) => (
                            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)} className="block py-2.5 text-sm text-gray-700 border-b border-gray-50">
                                {l.label}
                            </a>
                        ))}
                    </div>
                </div>
            </header>

            {/* ═══════════ HERO ═══════════ */}
            <section id="beranda" ref={heroRef} className="relative w-full h-[480px] sm:h-[540px] overflow-hidden bg-[#232a7a]">
                {/* foto */}
                <img
                    src="/images/smkn1_upacara.png"
                    alt="Upacara SMK Negeri 1 Cimahi"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                {/* gradasi biru persis referensi: pekat kiri + bawah */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1c245e]/95 via-[#252d7a]/60 to-[#252d7a]/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c245e]/90 via-transparent to-transparent" />

                {/* teks kiri */}
                <div className="relative h-full max-w-6xl mx-auto px-6 sm:px-10 flex items-center">
                    <div className={`max-w-[440px] transition-all duration-700 ${heroVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <h1 className="font-serif text-white text-[34px] sm:text-[44px] leading-[1.18]">
                            SMK Negeri 1 Cimahi:<br />
                            Excellence in Vocational<br />
                            Education
                        </h1>
                        <p className="mt-4 text-white/90 text-[11px] sm:text-xs leading-relaxed max-w-[340px]">
                            SMK Unggulan yang Menghasilkan SDM Bermutu dan Berdaya Saing Tinggi di Tingkat Nasional maupun Internasional.
                        </p>
                        <div className="mt-5 flex gap-3">
                            <a href="#tentang" className="text-white text-[11px] font-medium px-5 py-2 rounded-full border border-white/70 hover:bg-white hover:text-[#232a7a] transition-all">
                                Jelajahi Profil
                            </a>
                            <a href="#program" className="text-white text-[11px] font-medium px-5 py-2 rounded-full border border-white/70 hover:bg-white hover:text-[#232a7a] transition-all">
                                Eksplor
                            </a>
                        </div>
                    </div>
                </div>

                {/* dots */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2">
                    <span className="w-16 h-[5px] rounded-full bg-white" />
                    <span className="w-5 h-[5px] rounded-full bg-white/40" />
                    <span className="w-5 h-[5px] rounded-full bg-white/40" />
                </div>
            </section>

            {/* ═══════════ STRIP 4 INFO ═══════════ */}
            <section id="tentang" ref={stripRef} className="bg-white">
                <div className={`max-w-6xl mx-auto px-6 py-12 grid grid-cols-2 lg:grid-cols-4 gap-y-10 transition-all duration-700 ${stripVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    {[
                        {
                            icon: (
                                <svg className="w-12 h-12 mx-auto text-[#0a1a5c]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 6c-1.5-1.5-3.5-2-8-2v14c4.5 0 6.5.5 8 2 1.5-1.5 3.5-2 8-2V4c-4.5 0-6.5.5-8 2zm0 12.5c-1-.8-2-1.2-4-1.4V7.6c2 .2 3 .6 4 1.4v9.5zm2 0V9.1c1-.8 2-1.2 4-1.4v9.4c-2 .2-3 .6-4 1.4z" />
                                </svg>
                            ),
                            title: 'Kurikulum',
                            desc: 'Program keahlian terstandar industri dengan pendekatan teaching factory.',
                        },
                        {
                            icon: (
                                <svg className="w-12 h-12 mx-auto text-[#0a1a5c]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-3.3 0-8 1.7-8 5v3h9v-2H6.5v-1c0-2 3.6-3 5.5-3s5.5 1 5.5 3v1H15v2h5v-3c0-3.3-4.7-5-8-5zM18 8v6m3-3h-6" stroke="currentColor" strokeWidth={1.6} fill="none" strokeLinecap="round" />
                                </svg>
                            ),
                            title: 'Pendaftaran',
                            desc: 'Informasi lengkap mengenai PPDB dan persyaratan pendaftaran siswa baru.',
                        },
                        {
                            icon: (
                                <svg className="w-12 h-12 mx-auto text-[#0a1a5c]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M4 21V5a2 2 0 012-2h8a2 2 0 012 2v16M16 8h2a2 2 0 012 2v11M2 21h20M7 7h4v4H7zM7 13h4v4H7zm6-6h.01M14 13h.01M18 13h.01" stroke="currentColor" strokeWidth={1.6} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ),
                            title: 'Fasilitas',
                            desc: 'Laboratorium Modern dan WorkShop Berstandar Industri',
                        },
                        {
                            icon: (
                                <svg className="w-12 h-12 mx-auto text-[#0a1a5c]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 2h12v2h4v3a5 5 0 01-5 5h-.42A6 6 0 0113 15.92V18h4v4H7v-4h4v-2.08A6 6 0 017.42 12H7a5 5 0 01-5-5V4h4V2zm0 4H4v1a3 3 0 003 3V6zm12 0v4a3 3 0 003-3V6h-3z" />
                                </svg>
                            ),
                            title: 'Prestasi',
                            desc: 'Kumpulan Penghargaan Siswa/ Siswi Berprestasi dari tingkat Nasional hingga Tingkat Internasional',
                        },
                    ].map((item, i) => (
                        <div key={item.title} className={`relative text-center px-5 ${i > 0 ? 'lg:before:content-[""] lg:before:absolute lg:before:left-0 lg:before:top-3 lg:before:bottom-3 lg:before:border-l lg:before:border-dotted lg:before:border-gray-300' : ''}`}>
                            {item.icon}
                            <h3 className="mt-2 text-[15px] font-bold text-[#101c5b]">{item.title}</h3>
                            <p className="mt-1.5 text-[10px] leading-relaxed text-gray-500 max-w-[190px] mx-auto">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══════════ HEADING PROGRAM ═══════════ */}
            <section className="bg-white">
                <div className="max-w-4xl mx-auto px-6 pt-6 pb-10 text-center">
                    <h2 className="font-serif text-[#1e4fa3] text-[26px] sm:text-[34px] leading-[1.25]">
                        Program Teknik, Ketenagalistrikan, PPLG, dan Broadcast bagi Para Pemimpin Masa Depan
                    </h2>
                    <p className="mt-4 text-[11px] sm:text-xs text-gray-500 leading-relaxed max-w-[620px] mx-auto">
                        Pilih dari berbagai pilihan program Kejuruan yang dirancang khusus untuk mengembangkan keahlian Putra Putri Bangsa dan mempersiapkan Anda menghadapi tantangan global.
                    </p>
                </div>
            </section>

            {/* ═══════════ CAROUSEL JURUSAN (tampil 3, geser samping) ═══════════ */}
            <section id="program" ref={programRef} className="bg-white pb-16">
                <div className={`max-w-6xl mx-auto px-6 sm:px-10 transition-all duration-700 ${programVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="relative">
                        {/* tombol kiri */}
                        <button
                            onClick={() => scrollCards(-1)}
                            disabled={!canPrev}
                            aria-label="Geser ke kiri"
                            className="hidden sm:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#232a7a] text-white items-center justify-center shadow-lg hover:bg-[#1a2058] transition-all disabled:opacity-30 disabled:cursor-default"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        {/* track */}
                        <div
                            ref={trackRef}
                            onScroll={updateCarousel}
                            className="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth pb-2 -mx-1 px-1"
                        >
                            {JURUSAN.map((j) => (
                                <article
                                    key={j.title}
                                    className="group relative rounded-xl overflow-hidden h-[380px] bg-gray-200 shadow-sm hover:shadow-xl transition-shadow duration-500 snap-start shrink-0 w-[85%] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                                >
                                    {j.img ? (
                                        <img src={j.img} alt={j.title} className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                                    ) : (
                                        <div className={`absolute inset-0 bg-gradient-to-b ${j.gradient}`}>
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="font-serif text-white/25 text-[110px] leading-none select-none">
                                                    {j.title.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    {/* gradasi bawah biru */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#232a7a] via-[#232a7a]/35 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-5">
                                        <h3 className="font-serif text-white text-[24px] leading-[1.2]">{j.title}</h3>
                                        <p className="mt-1 text-white/70 text-[11px]">{j.duration}</p>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* tombol kanan */}
                        <button
                            onClick={() => scrollCards(1)}
                            disabled={!canNext}
                            aria-label="Geser ke kanan"
                            className="hidden sm:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#232a7a] text-white items-center justify-center shadow-lg hover:bg-[#1a2058] transition-all disabled:opacity-30 disabled:cursor-default"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* dots + tombol mobile */}
                    <div className="mt-6 flex items-center justify-center gap-3">
                        <button
                            onClick={() => scrollCards(-1)}
                            aria-label="Sebelumnya"
                            className="sm:hidden w-9 h-9 rounded-full border border-[#232a7a] text-[#232a7a] flex items-center justify-center disabled:opacity-30"
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
                                className={`h-2 rounded-full transition-all duration-300 ${activePage === p ? 'w-8 bg-[#232a7a]' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                            />
                        ))}
                        <button
                            onClick={() => scrollCards(1)}
                            aria-label="Berikutnya"
                            className="sm:hidden w-9 h-9 rounded-full border border-[#232a7a] text-[#232a7a] flex items-center justify-center disabled:opacity-30"
                            disabled={!canNext}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none;-ms-overflow-style:none}`}</style>
            </section>

            {/* ═══════════ BERITA TERKINI ═══════════ */}
            <section id="berita" ref={beritaRef} className="bg-white pb-20">
                <div className={`max-w-6xl mx-auto px-6 sm:px-10 transition-all duration-700 ${beritaVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <h2 className="font-serif text-[#1e4fa3] text-[28px] sm:text-[32px] text-center">Berita Terkini</h2>
                    <div className="mt-2 flex justify-center">
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-medium px-3 py-1 rounded-full">SMK Negeri 1 Cimahi</span>
                    </div>

                    <div className="mt-8 grid lg:grid-cols-2 gap-6 items-start">
                        {/* kiri: berita utama */}
                        <article className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                            <img src="/images/prestasi1.png" alt="Prestasi siswa SMK Negeri 1 Cimahi" className="w-full h-64 sm:h-80 object-cover" />
                            <div className="bg-[#232a7a] p-4">
                                <h3 className="text-white text-[12px] sm:text-[13px] font-bold leading-snug">
                                    Perwakilan Tim CreatorHub Berhasil Meraih Juara 2 dalam Ajangdsa Business Challenge HIPMI BERKARIA Challenge 2026 di Tingkat Kota Cimahi
                                </h3>
                                <p className="mt-2 text-white/60 text-[9px] sm:text-[10px] leading-relaxed">
                                    Berhasil Penghargaan tersebut diraih berkat kerja keras dan kekompakan tim dalam mengembangkan solusi digital kewirausahaan.
                                </p>
                            </div>
                        </article>

                        {/* kanan: 4 mini prestasi + box lainnya */}
                        <div>
                            <div className="grid sm:grid-cols-2 gap-3">
                                {[
                                    { t: 'Juara 1 INDORAMA Mechatronics Competition', s: 'Tingkat Prov. Jawa Barat 2023' },
                                    { t: 'Juara 1 Olimpiade Siswa Indonesia bidang B. Inggris', s: 'LKP Astikom' },
                                    { t: 'Juara 3 LKS Mobile Robotik', s: 'Tingkat Prov. Jawa Barat 2024' },
                                    { t: 'Juara 2 ITENAS IOT and Science Project Competition', s: 'Tingkat Prov. Jawa Barat 2024' },
                                ].map((p) => (
                                    <div key={p.t} className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow">
                                        <span className="w-9 h-9 shrink-0 rounded-md bg-[#232a7a] flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M6 2h12v2h4v3a5 5 0 01-5 5h-.42A6 6 0 0113 15.92V18h4v4H7v-4h4v-2.08A6 6 0 017.42 12H7a5 5 0 01-5-5V4h4V2zm0 4H4v1a3 3 0 003 3V6zm12 0v4a3 3 0 003-3V6h-3z" />
                                            </svg>
                                        </span>
                                        <div>
                                            <p className="text-[10px] font-bold text-gray-900 leading-tight">{p.t}</p>
                                            <p className="text-[9px] text-gray-500 mt-0.5">{p.s}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4 border border-gray-200 rounded-lg p-4">
                                <p className="text-[12px] font-bold text-gray-900 mb-3">Prestasi lainnya</p>
                                <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5">
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
                                            <span className="mt-0.5 w-3.5 h-3.5 shrink-0 rounded-full bg-[#232a7a] flex items-center justify-center">
                                                <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                            <p className="text-[9px] sm:text-[10px] text-gray-600 leading-relaxed">{x}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ FOOTER ═══════════ */}
            <footer id="kontak" className="bg-[#232a7a] text-white">
                <div className="max-w-6xl mx-auto px-6 sm:px-10 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* brand */}
                    <div>
                        <p className="text-[18px] font-bold leading-tight">SMKN 1<br />Cimahi</p>
                        <p className="mt-4 text-[10px] leading-relaxed text-white/70 max-w-[220px]">
                            Menghadirkan pendidikan vokasi unggulan yang menghasilkan SDM bermutu, kompeten, dan berdaya saing tinggi di tingkat nasional maupun internasional.
                        </p>
                    </div>

                    {/* tautan */}
                    <div>
                        <h4 className="text-[13px] font-semibold mb-4">Tautan Cepat</h4>
                        <ul className="space-y-2 text-[11px] text-white/80">
                            {[
                                { href: '#beranda', label: 'Home' },
                                { href: '#tentang', label: 'Tentang' },
                                { href: '#kontak', label: 'Pendaftaran' },
                                { href: '#program', label: 'Kurikulum' },
                                { href: '#berita', label: 'Berita' },
                                { href: '#kontak', label: 'Kontak' },
                            ].map((l) => (
                                <li key={l.label}>
                                    <a href={l.href} className="hover:text-white transition-colors">{l.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* kontak */}
                    <div>
                        <h4 className="text-[13px] font-semibold mb-4">Kontak Kami</h4>
                        <ul className="space-y-3 text-[10px] leading-relaxed text-white/80">
                            <li>Jl. Mahar Martanegara<br />No.48, Utama, Kec. Cimahi<br />Sel., Kota Cimahi, Jawa<br />Barat 40533</li>
                            <li className="flex items-center gap-1.5">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 6V3z" /></svg>
                                +62 22 6629683
                            </li>
                            <li className="flex items-center gap-1.5">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                                info@smkn1cimahi.sch.id
                            </li>
                        </ul>
                    </div>

                    {/* sosmed */}
                    <div>
                        <h4 className="text-[13px] font-semibold mb-4">Media Sosial</h4>
                        <div className="flex gap-2">
                            {[
                                <path key="g" d="M12 2a10 10 0 100 20 10 10 0 000-20zm7.9 9h-3v3h-3v-3H9v-2h4.9V6.5A3.5 3.5 0 0117.4 10H19.9V11zM6 9h3v6H6z" />,
                                <path key="f" d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5z" />,
                                <path key="y" d="M21 8.2a2.5 2.5 0 00-1.8-1.7C17.7 6 12 6 12 6s-5.7 0-7.2.5A2.5 2.5 0 003 8.2 26 26 0 002.6 12 26 26 0 003 15.8a2.5 2.5 0 001.8 1.7c1.5.5 7.2.5 7.2.5s5.7 0 7.2-.5a2.5 2.5 0 001.8-1.7A26 26 0 0021.4 12 26 26 0 0021 8.2zM10 15V9l5.2 3L10 15z" />,
                                <path key="i" d="M12 8.8A3.2 3.2 0 1012 15.2 3.2 3.2 0 0012 8.8zm0-2.1a5.3 5.3 0 110 10.6 5.3 5.3 0 010-10.6zm6.8-.3a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0zM12 4.2c-2.5 0-2.9 0-3.9.1a5.2 5.2 0 00-1.7.3 3.5 3.5 0 00-2 2 5.2 5.2 0 00-.3 1.7c-.1 1-.1 1.4-.1 3.9s0 2.9.1 3.9a5.2 5.2 0 00.3 1.7 3.5 3.5 0 002 2 5.2 5.2 0 001.7.3c1 .1 1.4.1 3.9.1s2.9 0 3.9-.1a5.2 5.2 0 001.7-.3 3.5 3.5 0 002-2 5.2 5.2 0 00.3-1.7c.1-1 .1-1.4.1-3.9s0-2.9-.1-3.9a5.2 5.2 0 00-.3-1.7 3.5 3.5 0 00-2-2 5.2 5.2 0 00-1.7-.3c-1-.1-1.4-.1-3.9-.1z" />,
                            ].map((d, i) => (
                                <a key={i} href="#" aria-label="Media sosial" className="w-8 h-8 rounded-md bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors">
                                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">{d}</svg>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

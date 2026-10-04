import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeader from '@/Components/SectionHeader';
import Reveal from '@/Components/Reveal';
import { useState, useEffect } from 'react';
import { cmsService } from '@/services/cms';

/** Distinct icon per jalur (fallback cycles by index). Galaxy/Planetary palette. */
function jalurIcon(id: string, idx: number) {
    const cls = 'w-6 h-6';
    const icons: Record<string, React.ReactNode> = {
        zonasi: (
            <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
        ),
        prestasi: (
            <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
            </svg>
        ),
        afirmasi: (
            <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
        ),
        perpindahan: (
            <svg className={cls} fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
        ),
    };
    const fallback = [icons.zonasi, icons.prestasi, icons.afirmasi, icons.perpindahan];
    return icons[id] ?? fallback[idx % fallback.length];
}

export default function PPDB() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    
    const [info, setInfo] = useState({ periode: '', status: '', link_portal: '' });
    const [jalurList, setJalurList] = useState<any[]>([]);
    const [jadwalList, setJadwalList] = useState<any[]>([]);
    const [syaratList, setSyaratList] = useState<any[]>([]);
    const [faqList, setFaqList] = useState<any[]>([]);

    useEffect(() => {
        let cancelled = false;

        // Single batch request instead of 5 parallel /api/settings/* calls.
        cmsService
            .getSettingsBatch<{
                ppdb_info: { periode: string; status: string; link_portal: string };
                ppdb_jalur: any[];
                ppdb_jadwal: any[];
                ppdb_syarat: any[];
                ppdb_faq: any[];
            }>(['ppdb_info', 'ppdb_jalur', 'ppdb_jadwal', 'ppdb_syarat', 'ppdb_faq'])
            .then((data) => {
                if (cancelled) return;
                if (data.ppdb_info && (data.ppdb_info as any).periode) {
                    setInfo(data.ppdb_info as any);
                }
                if (Array.isArray(data.ppdb_jalur)) setJalurList(data.ppdb_jalur);
                if (Array.isArray(data.ppdb_jadwal)) setJadwalList(data.ppdb_jadwal);
                if (Array.isArray(data.ppdb_syarat)) setSyaratList(data.ppdb_syarat);
                if (Array.isArray(data.ppdb_faq)) setFaqList(data.ppdb_faq);
            })
            .catch(console.error)
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <PublicLayout
            title="PPDB - SMK Negeri 1 Cimahi"
            description="Informasi Penerimaan Peserta Didik Baru (PPDB) SMK Negeri 1 Cimahi Tahun Ajaran 2026/2027."
        >
            {/* ═══════════ HERO ═══════════ */}
            <section className="relative bg-galaxy overflow-hidden">
                <div className="absolute inset-0 opacity-[0.05]">
                    <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-planetary blur-3xl" />
                </div>
                <div className="relative max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-28">
                    <div className="max-w-2xl anim-fade-up">
                        <span className="inline-flex items-center gap-2 text-sm font-medium text-venus mb-4">
                            <span className="w-2 h-2 rounded-full bg-venus animate-pulse" />
                            {info.status || 'Memuat...'}
                        </span>
                        <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-[56px] leading-[1.1]">
                            Penerimaan Peserta<br />Didik Baru
                        </h1>
                        <p className="mt-5 text-white/70 text-base lg:text-lg leading-relaxed max-w-lg">
                            Mari bergabung menjadi bagian dari SMKN 1 Cimahi {info.periode || 'Tahun Ajaran 2026/2027'} dan raih masa depan gemilang dengan pendidikan vokasi berstandar industri.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href={info.link_portal || "#"}
                                className="inline-flex items-center gap-2 bg-planetary text-white text-sm font-semibold px-6 py-3 rounded-[10px] hover:bg-planetary/90 transition-colors"
                            >
                                Daftar Sekarang
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </a>
                            <a
                                href="#tahapan"
                                className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-[10px] border border-white/30 hover:bg-white/10 transition-colors"
                            >
                                Lihat Tahapan
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {loading ? (
                <div className="py-24 text-center text-gray-500">Memuat informasi PPDB...</div>
            ) : (
                <>
                    {/* ═══════════ JALUR PENDAFTARAN ═══════════ */}
                    <section className="bg-white py-20 lg:py-24">
                        <div className="max-w-container mx-auto px-6 lg:px-12">
                            <SectionHeader
                                title="Jalur Pendaftaran"
                                description="Pilih jalur pendaftaran yang sesuai dengan kualifikasi dan kondisi calon peserta didik."
                            />
                            <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {jalurList.map((jalur, idx) => {
                                    const quotaValue = parseInt(String(jalur.quota), 10) || 0;
                                    return (
                                        <Reveal key={jalur.id ?? idx} delay={(idx % 4) * 90} className="h-full">
                                            <div className="group relative bg-white p-6 rounded-2xl border border-gray-100 hover:border-planetary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
                                            {/* Watermark number */}
                                            <span className="absolute -top-1 right-4 font-display text-[64px] leading-none font-bold text-galaxy/[0.06] select-none">
                                                {String(idx + 1).padStart(2, '0')}
                                            </span>

                                            {/* Icon */}
                                            <div className="w-12 h-12 rounded-xl bg-sky/30 text-planetary flex items-center justify-center mb-5 group-hover:bg-planetary group-hover:text-white transition-colors">
                                                {jalurIcon(jalur.id ?? '', idx)}
                                            </div>

                                            <h3 className="font-bold text-galaxy text-lg leading-snug">{jalur.name}</h3>

                                            {/* Quota */}
                                            <div className="mt-4 flex items-end justify-between">
                                                <span className="font-display text-3xl font-bold text-planetary">
                                                    {jalur.quota}
                                                </span>
                                                <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">
                                                    Kuota
                                                </span>
                                            </div>
                                            <div className="mt-2 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                                                <div
                                                    className="h-full rounded-full bg-gradient-to-r from-universe to-planetary transition-all duration-500"
                                                    style={{ width: `${Math.min(100, Math.max(0, quotaValue))}%` }}
                                                />
                                            </div>

                                            <p className="mt-4 text-sm text-gray-500 leading-relaxed">{jalur.description}</p>
                                            </div>
                                        </Reveal>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* ═══════════ TAHAPAN & JADWAL ═══════════ */}
                    <section id="tahapan" className="bg-milky-way py-20 lg:py-24">
                        <div className="max-w-container mx-auto px-6 lg:px-12">
                            <SectionHeader
                                title="Tahapan & Jadwal"
                                description="Catat tanggal penting agar tidak terlewat dalam proses seleksi PPDB."
                            />
                            <div className="mt-12 max-w-4xl mx-auto">
                                <div className="space-y-4">
                                    {jadwalList.map((tahap, idx) => (
                                        <Reveal key={idx} delay={Math.min(idx, 4) * 70}>
                                            <div className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 bg-white p-5 lg:p-6 rounded-2xl border border-gray-100 hover:shadow-md hover:border-venus/30 transition-all"
                                            >
                                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sky/30 text-planetary font-bold text-lg flex items-center justify-center group-hover:bg-planetary group-hover:text-white transition-colors">
                                                {tahap.step}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-galaxy text-lg">{tahap.title}</h3>
                                                <p className="text-sm text-gray-500 mt-1">{tahap.description}</p>
                                            </div>
                                            <div className="flex-shrink-0 w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-0 border-gray-100">
                                                <span className="inline-block bg-milky-way text-planetary text-sm font-semibold px-4 py-2 rounded-lg">
                                                    {tahap.date}
                                                </span>
                                            </div>
                                            </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ═══════════ PERSYARATAN ═══════════ */}
                    <section className="bg-white py-20 lg:py-24">
                        <div className="max-w-container mx-auto px-6 lg:px-12">
                            <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
                                <div className="lg:col-span-5 lg:sticky lg:top-24">
                                    <SectionHeader
                                        title="Persyaratan Berkas"
                                        description="Siapkan dokumen-dokumen berikut sebelum melakukan pendaftaran secara online maupun offline."
                                        centered={false}
                                    />
                                    <div className="mt-8 bg-sky/20 p-6 rounded-xl border border-sky/30">
                                        <p className="text-sm text-planetary leading-relaxed font-medium">
                                            💡 Pastikan semua dokumen di-scan atau difoto dengan jelas dan terbaca untuk memudahkan proses verifikasi oleh panitia.
                                        </p>
                                    </div>
                                </div>
                                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                                    {syaratList.map((group, idx) => (
                                        <Reveal key={idx} delay={(idx % 2) * 90}>
                                        <div className="bg-milky-way p-6 lg:p-8 rounded-2xl border border-gray-100 h-full">
                                            <h3 className="font-bold text-galaxy text-lg mb-5 pb-3 border-b border-gray-200">
                                                {group.category}
                                            </h3>
                                            <ul className="space-y-4">
                                                {group.items.map((item: string, i: number) => (
                                                    <li key={i} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                                                        <span className="mt-1 w-5 h-5 shrink-0 rounded-full bg-planetary/10 flex items-center justify-center">
                                                            <svg className="w-3 h-3 text-planetary" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </span>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        </Reveal>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* ═══════════ FAQ ═══════════ */}
                    <section className="bg-milky-way py-20 lg:py-24">
                        <div className="max-w-container mx-auto px-6 lg:px-12">
                            <SectionHeader
                                title="Tanya Jawab Seputar PPDB"
                                description="Temukan jawaban untuk pertanyaan yang paling sering diajukan oleh calon pendaftar."
                            />
                            <div className="mt-12 max-w-3xl mx-auto space-y-3">
                                {faqList.map((faq, idx) => (
                                    <Reveal key={idx} delay={Math.min(idx, 3) * 60}>
                                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"
                                    >
                                        <button
                                            onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                                            className="w-full flex items-center justify-between p-5 lg:px-6 lg:py-5 text-left transition-colors hover:bg-gray-50 focus:outline-none focus:bg-gray-50"
                                            aria-expanded={openFaq === idx}
                                        >
                                            <span className="font-bold text-galaxy text-sm lg:text-base pr-4">
                                                {faq.question}
                                            </span>
                                            <span
                                                className={`w-8 h-8 rounded-full bg-milky-way flex items-center justify-center shrink-0 transition-transform duration-300 ${
                                                    openFaq === idx ? 'rotate-180 bg-planetary text-white' : 'text-gray-400'
                                                }`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </span>
                                        </button>
                                        <div
                                            className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                                openFaq === idx ? 'max-h-96' : 'max-h-0'
                                            }`}
                                        >
                                            <p className="px-5 pb-5 lg:px-6 lg:pb-6 pt-1 text-sm text-gray-500 leading-relaxed border-t border-gray-50">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </section>
                </>
            )}

            {/* ═══════════ CTA ═══════════ */}
            <section className="bg-planetary py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12 text-center">
                    <h2 className="font-display text-white text-3xl sm:text-4xl leading-[1.15]">
                        Siap Mendaftar?
                    </h2>
                    <p className="mt-4 text-white/70 text-base max-w-lg mx-auto leading-relaxed">
                        Jika ada pertanyaan lebih lanjut mengenai proses PPDB, jangan ragu untuk menghubungi layanan informasi kami.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            href={info.link_portal || "#"}
                            className="inline-flex items-center gap-2 bg-white text-planetary text-sm font-semibold px-8 py-3.5 rounded-[10px] hover:bg-milky-way transition-colors"
                        >
                            Menuju Portal Pendaftaran
                        </a>
                        <a
                            href="https://wa.me/6281234567890" // Contoh dummy kontak
                            target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-2 text-white text-sm font-semibold px-8 py-3.5 rounded-[10px] border border-white/30 hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM15 15.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
                            </svg>
                            Hubungi Panitia
                        </a>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

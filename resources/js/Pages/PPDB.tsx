import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeader from '@/Components/SectionHeader';
import { useState } from 'react';
import {
    JALUR_PENDAFTARAN,
    TAHAPAN_PPDB,
    PERSYARATAN_PPDB,
    FAQ_PPDB,
} from '@/data/ppdb';

export default function PPDB() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <PublicLayout
            title="PPDB - SMK Negeri 1 Cimahi"
            description="Informasi Penerimaan Peserta Didik Baru (PPDB) SMK Negeri 1 Cimahi tahun ajaran 2026/2027."
        >
            {/* ═══════════ HERO ═══════════ */}
            <section className="relative bg-galaxy overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-planetary blur-3xl" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-universe blur-3xl" />
                </div>
                <div className="relative max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-28">
                    <div className="max-w-2xl">
                        <span className="inline-block text-sm font-medium text-venus mb-4">
                            Tahun Ajaran 2026/2027
                        </span>
                        <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-[56px] leading-[1.1]">
                            Penerimaan Peserta<br />Didik Baru
                        </h1>
                        <p className="mt-5 text-white/70 text-base lg:text-lg leading-relaxed max-w-lg">
                            Bergabunglah dengan SMKN 1 Cimahi dan wujudkan masa depan karier Anda melalui pendidikan vokasi berkualitas.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#jadwal"
                                className="inline-flex items-center gap-2 bg-planetary text-white text-sm font-semibold px-6 py-3 rounded-[10px] hover:bg-planetary/90 transition-colors"
                            >
                                Lihat Jadwal
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                            <a
                                href="#persyaratan"
                                className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-[10px] border border-white/30 hover:bg-white/10 transition-colors"
                            >
                                Persyaratan
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ JALUR PENDAFTARAN ═══════════ */}
            <section className="bg-white py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <SectionHeader
                        title="Jalur Pendaftaran"
                        description="Pilih jalur pendaftaran yang sesuai dengan kondisi dan prestasi Anda."
                    />
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {JALUR_PENDAFTARAN.map((jalur) => (
                            <div
                                key={jalur.id}
                                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-venus transition-all"
                            >
                                <div className="w-12 h-12 rounded-[10px] bg-sky/50 flex items-center justify-center mb-4">
                                    <span className="font-display text-planetary text-lg font-bold">{jalur.quota}</span>
                                </div>
                                <h3 className="font-semibold text-galaxy text-base">{jalur.name}</h3>
                                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{jalur.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ TIMELINE / JADWAL ═══════════ */}
            <section id="jadwal" className="bg-milky-way py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <SectionHeader
                        title="Jadwal & Tahapan PPDB"
                        description="Berikut adalah timeline pelaksanaan PPDB SMKN 1 Cimahi tahun ajaran 2026/2027."
                    />
                    <div className="mt-12 max-w-3xl mx-auto">
                        {TAHAPAN_PPDB.map((tahap, i) => (
                            <div key={tahap.step} className="flex gap-6 pb-10 last:pb-0">
                                {/* Timeline line */}
                                <div className="flex flex-col items-center">
                                    <div className="w-10 h-10 rounded-full bg-planetary text-white flex items-center justify-center text-sm font-bold shrink-0">
                                        {String(tahap.step).padStart(2, '0')}
                                    </div>
                                    {i < TAHAPAN_PPDB.length - 1 && (
                                        <div className="w-0.5 flex-1 bg-venus mt-2" />
                                    )}
                                </div>
                                {/* Content */}
                                <div className="pb-2 pt-1.5">
                                    <h3 className="font-semibold text-galaxy text-base">{tahap.title}</h3>
                                    <p className="text-sm font-medium text-planetary mt-1">{tahap.date}</p>
                                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{tahap.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ PERSYARATAN ═══════════ */}
            <section id="persyaratan" className="bg-white py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <SectionHeader
                        title="Persyaratan Pendaftaran"
                        description="Pastikan kelengkapan dokumen sebelum melakukan pendaftaran."
                    />
                    <div className="mt-12 grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {PERSYARATAN_PPDB.map((group) => (
                            <div
                                key={group.category}
                                className="bg-white border border-gray-200 rounded-lg p-6"
                            >
                                <h3 className="font-semibold text-galaxy text-base mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-planetary" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    {group.category}
                                </h3>
                                <ul className="space-y-3">
                                    {group.items.map((item) => (
                                        <li key={item} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                                            <span className="mt-1 w-5 h-5 shrink-0 rounded-full bg-sky/50 flex items-center justify-center">
                                                <svg className="w-3 h-3 text-planetary" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ ALUR PENDAFTARAN ═══════════ */}
            <section className="bg-galaxy py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <SectionHeader
                        title="Alur Pendaftaran"
                        description="Langkah-langkah pendaftaran PPDB SMKN 1 Cimahi."
                        light
                    />
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
                        {[
                            { step: '01', title: 'Buat Akun', desc: 'Daftarkan akun pada portal PPDB online dengan data yang valid.' },
                            { step: '02', title: 'Isi Formulir', desc: 'Lengkapi formulir pendaftaran dan unggah dokumen persyaratan.' },
                            { step: '03', title: 'Pilih Jurusan', desc: 'Pilih program keahlian yang diminati sesuai dengan minat dan bakat.' },
                            { step: '04', title: 'Konfirmasi', desc: 'Tunggu hasil seleksi dan lakukan daftar ulang jika diterima.' },
                        ].map((item) => (
                            <div key={item.step} className="text-center">
                                <div className="w-14 h-14 rounded-full border-2 border-venus text-venus flex items-center justify-center text-lg font-bold mx-auto">
                                    {item.step}
                                </div>
                                <h3 className="mt-4 font-semibold text-white text-base">{item.title}</h3>
                                <p className="mt-2 text-sm text-white/60 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ FAQ ═══════════ */}
            <section className="bg-white py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <SectionHeader
                        title="Pertanyaan Umum"
                        description="Temukan jawaban atas pertanyaan yang sering diajukan mengenai PPDB."
                    />
                    <div className="mt-12 max-w-3xl mx-auto space-y-3">
                        {FAQ_PPDB.map((faq, i) => (
                            <div
                                key={i}
                                className="border border-gray-200 rounded-[10px] overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                                    aria-expanded={openFaq === i}
                                >
                                    <span className="font-medium text-galaxy text-sm pr-4">{faq.question}</span>
                                    <svg
                                        className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <div
                                    className={`overflow-hidden transition-all duration-200 ${
                                        openFaq === i ? 'max-h-60' : 'max-h-0'
                                    }`}
                                >
                                    <p className="px-6 pb-4 text-sm text-gray-500 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ CTA / KONTAK ═══════════ */}
            <section className="bg-milky-way py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12 text-center">
                    <SectionHeader
                        title="Siap Mendaftar?"
                        description="Jika memerlukan bantuan atau informasi lebih lanjut, jangan ragu untuk menghubungi kami."
                    />
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 bg-planetary text-white text-sm font-semibold px-8 py-3.5 rounded-[10px] hover:bg-galaxy transition-colors"
                        >
                            Daftar Sekarang
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                        <a
                            href="tel:+62226629683"
                            className="inline-flex items-center gap-2 text-planetary text-sm font-semibold px-8 py-3.5 rounded-[10px] border border-planetary hover:bg-planetary hover:text-white transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            Hubungi Kami
                        </a>
                    </div>
                    <p className="mt-6 text-sm text-gray-500">
                        Telepon: (022) 6629683 | Email: info@smkn1cimahi.sch.id
                    </p>
                </div>
            </section>
        </PublicLayout>
    );
}

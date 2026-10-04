import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeader from '@/Components/SectionHeader';
import { useState } from 'react';
import {
    CAREER_STATS,
    JOB_LISTINGS,
    INDUSTRY_PARTNERS,
    PKL_INFO,
    FAQ_CAREER,
} from '@/data/career';

export default function CareerCenter() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);
    const [jobFilter, setJobFilter] = useState('Semua');

    const jobCategories = ['Semua', ...Array.from(new Set(JOB_LISTINGS.map((j) => j.category)))];
    const filteredJobs =
        jobFilter === 'Semua'
            ? JOB_LISTINGS
            : JOB_LISTINGS.filter((j) => j.category === jobFilter);

    return (
        <PublicLayout
            title="PKL & Career Center - SMK Negeri 1 Cimahi"
            description="Pusat informasi PKL, lowongan kerja, dan karier untuk siswa dan alumni SMKN 1 Cimahi."
        >
            {/* ═══════════ HERO ═══════════ */}
            <section className="relative bg-galaxy overflow-hidden">
                <div className="absolute inset-0 opacity-[0.07]">
                    <img
                        src="/images/logosmk.png"
                        alt=""
                        className="absolute right-10 bottom-10 w-72 h-72 object-contain opacity-20"
                        aria-hidden="true"
                    />
                </div>
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 left-20 w-96 h-96 rounded-full bg-planetary blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-universe blur-3xl" />
                </div>
                <div className="relative max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-28">
                    <div className="max-w-2xl">
                        <span className="inline-block text-sm font-medium text-venus mb-4">
                            Bursa Kerja Khusus (BKK)
                        </span>
                        <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-[56px] leading-[1.1]">
                            PKL & Career<br />Center
                        </h1>
                        <p className="mt-5 text-white/70 text-base lg:text-lg leading-relaxed max-w-lg">
                            Pusat informasi PKL, lowongan kerja, dan pengembangan karier untuk siswa dan alumni SMKN 1 Cimahi.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href="#lowongan"
                                className="inline-flex items-center gap-2 bg-planetary text-white text-sm font-semibold px-6 py-3 rounded-[10px] hover:bg-planetary/90 transition-colors"
                            >
                                Lihat Lowongan
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                            <a
                                href="#pkl"
                                className="inline-flex items-center gap-2 text-white text-sm font-semibold px-6 py-3 rounded-[10px] border border-white/30 hover:bg-white/10 transition-colors"
                            >
                                Info PKL
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ STATISTIK ═══════════ */}
            <section className="bg-white py-16">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {CAREER_STATS.map((stat) => (
                            <div key={stat.label} className="text-center p-6 bg-milky-way rounded-lg">
                                <p className="font-display text-planetary text-3xl lg:text-4xl font-bold">{stat.value}</p>
                                <p className="mt-2 font-semibold text-galaxy text-sm">{stat.label}</p>
                                <p className="mt-1 text-xs text-gray-500">{stat.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ PKL INFO ═══════════ */}
            <section id="pkl" className="bg-milky-way py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <SectionHeader title={PKL_INFO.title} centered={false} />
                            <p className="mt-4 text-base text-gray-500 leading-relaxed">
                                {PKL_INFO.description}
                            </p>
                            <div className="mt-6 inline-flex items-center gap-2 bg-sky/30 text-planetary text-sm font-semibold px-4 py-2 rounded-[10px]">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Durasi: {PKL_INFO.duration}
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-lg p-6">
                            <h3 className="font-semibold text-galaxy text-base mb-4">Persyaratan PKL</h3>
                            <ul className="space-y-3">
                                {PKL_INFO.requirements.map((req) => (
                                    <li key={req} className="flex gap-3 text-sm text-gray-600 leading-relaxed">
                                        <span className="mt-1 w-5 h-5 shrink-0 rounded-full bg-sky/50 flex items-center justify-center">
                                            <svg className="w-3 h-3 text-planetary" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </span>
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════ LOWONGAN KERJA ═══════════ */}
            <section id="lowongan" className="bg-white py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <SectionHeader
                        title="Lowongan Kerja"
                        description="Peluang karier dari perusahaan mitra SMKN 1 Cimahi."
                    />

                    {/* Filter */}
                    <div className="mt-10 flex flex-wrap justify-center gap-2">
                        {jobCategories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setJobFilter(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                                    jobFilter === cat
                                        ? 'bg-planetary text-white'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-planetary hover:text-planetary'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Job Cards */}
                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredJobs.map((job) => (
                            <article
                                key={job.id}
                                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-venus transition-all"
                            >
                                {/* Company avatar */}
                                <div className="w-12 h-12 rounded-[10px] bg-sky/30 flex items-center justify-center mb-4">
                                    <span className="font-bold text-planetary text-sm">
                                        {job.company.split(' ').slice(-1)[0].substring(0, 2).toUpperCase()}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-galaxy text-base">{job.title}</h3>
                                <p className="text-sm text-planetary mt-1">{job.company}</p>
                                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{job.description}</p>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="text-xs bg-milky-way text-galaxy px-2.5 py-1 rounded-full font-medium">
                                        {job.location}
                                    </span>
                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                        job.type === 'Full-time' ? 'bg-green-50 text-green-700' :
                                        job.type === 'Magang' ? 'bg-blue-50 text-blue-700' :
                                        'bg-orange-50 text-orange-700'
                                    }`}>
                                        {job.type}
                                    </span>
                                </div>

                                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <span className="text-xs text-gray-400">
                                        {new Date(job.postedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                    </span>
                                    <button className="text-sm font-semibold text-planetary hover:text-galaxy transition-colors flex items-center gap-1">
                                        Detail
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ MITRA INDUSTRI ═══════════ */}
            <section className="bg-milky-way py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <SectionHeader
                        title="Mitra Industri"
                        description="Perusahaan yang bekerja sama dengan SMKN 1 Cimahi dalam pengembangan SDM."
                    />
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {INDUSTRY_PARTNERS.map((partner) => (
                            <div
                                key={partner.id}
                                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                            >
                                {/* Partner logo placeholder */}
                                <div className="w-14 h-14 rounded-lg bg-sky/30 flex items-center justify-center mb-4">
                                    <span className="font-bold text-planetary text-lg">
                                        {partner.name.split(' ').slice(-1)[0].charAt(0)}
                                    </span>
                                </div>
                                <h3 className="font-semibold text-galaxy text-base">{partner.name}</h3>
                                <span className="inline-block text-xs font-medium text-planetary bg-sky/30 px-2.5 py-0.5 rounded-full mt-2">
                                    {partner.sector}
                                </span>
                                <p className="mt-3 text-sm text-gray-500 leading-relaxed">{partner.description}</p>
                                <p className="mt-3 text-xs text-gray-400">Mitra sejak {partner.partnerSince}</p>
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
                        description="Informasi seputar PKL, BKK, dan karier."
                    />
                    <div className="mt-12 max-w-3xl mx-auto space-y-3">
                        {FAQ_CAREER.map((faq, i) => (
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

            {/* ═══════════ CTA / CONTACT BKK ═══════════ */}
            <section className="bg-galaxy py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12 text-center">
                    <h2 className="font-display text-white text-3xl sm:text-4xl leading-[1.15]">
                        Hubungi BKK SMKN 1 Cimahi
                    </h2>
                    <p className="mt-4 text-white/60 text-base max-w-lg mx-auto leading-relaxed">
                        Untuk informasi lebih lanjut mengenai PKL, lowongan kerja, dan kerja sama industri.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:info@smkn1cimahi.sch.id"
                            className="inline-flex items-center gap-2 bg-planetary text-white text-sm font-semibold px-8 py-3.5 rounded-[10px] hover:bg-planetary/90 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            Kirim Email
                        </a>
                        <a
                            href="tel:+62226629683"
                            className="inline-flex items-center gap-2 text-white text-sm font-semibold px-8 py-3.5 rounded-[10px] border border-white/30 hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            (022) 6629683
                        </a>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeader from '@/Components/SectionHeader';
import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { cmsService, type ProgramDTO } from '@/services/cms';

export default function ProgramKeahlian() {
    const [programs, setPrograms] = useState<ProgramDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        cmsService
            .getPrograms({ active: true, limit: 24 })
            .then((data) => {
                if (!cancelled) setPrograms(data);
            })
            .catch((err: unknown) => {
                if (!cancelled) setError(err instanceof Error ? err.message : 'Gagal memuat program keahlian.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <PublicLayout
            title="Program Keahlian - SMK Negeri 1 Cimahi"
            description="9 program keahlian unggulan SMKN 1 Cimahi: RPL, TOI, Broadcast, Mekatronika, Elektronika, IOP, TPTU, SIJA."
        >
            {/* HERO */}
            <section className="relative bg-galaxy overflow-hidden">
                <img
                    src="/images/asik.jpg"
                    alt="Siswa program keahlian SMKN 1 Cimahi"
                    fetchPriority="low"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-galaxy/95 via-galaxy/60 to-galaxy/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-galaxy/90 via-transparent to-transparent" />
                <div className="relative max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-24">
                    <span className="inline-block text-sm font-medium text-venus mb-4">9 Program Unggulan</span>
                    <h1 className="font-display text-white text-4xl sm:text-5xl leading-[1.1]">
                        Program Keahlian
                    </h1>
                    <p className="mt-4 text-white/70 text-base max-w-lg leading-relaxed">
                        Kurikulum selaras industri dengan pembelajaran teaching factory dan didukung 50+ perusahaan mitra.
                    </p>
                </div>
            </section>

            {/* GRID */}
            <section className="bg-white py-16 lg:py-20">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <SectionHeader
                        title="Pilih Jalur Keahlianmu"
                        description="Setiap program dirancang untuk mengantarkan lulusan siap kerja, kuliah, atau berwirausaha."
                    />

                    {loading ? (
                        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="h-[280px] rounded-xl bg-gray-100 animate-pulse" />
                            ))}
                        </div>
                    ) : error ? (
                        <div className="mt-12 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-5 text-center">
                            {error}
                        </div>
                    ) : programs.length === 0 ? (
                        <div className="mt-12 bg-milky-way border border-gray-200 rounded-xl p-12 text-center">
                            <p className="text-gray-500 text-sm">Belum ada program keahlian yang ditampilkan.</p>
                        </div>
                    ) : (
                        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {programs.map((p) => (
                                <Link
                                    key={p.id}
                                    href={`/program-keahlian/${p.id}`}
                                    className="group relative rounded-xl overflow-hidden h-[280px] bg-gray-200 shadow-sm hover:shadow-xl transition-shadow"
                                >
                                    {p.image ? (
                                        <img
                                            src={p.image}
                                            alt={p.name}
                                            loading="lazy"
                                            decoding="async"
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 bg-gradient-to-b from-planetary to-galaxy flex items-center justify-center">
                                            <span className="font-display text-white/20 text-[90px] leading-none select-none">
                                                {p.name.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-galaxy via-galaxy/35 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <span className="inline-block text-[11px] font-bold text-white/90 bg-white/15 backdrop-blur px-2.5 py-1 rounded-full mb-2">
                                            {p.code} • {p.duration}
                                        </span>
                                        <h3 className="font-display text-white text-xl leading-snug">{p.name}</h3>
                                        <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
                                            Lihat Detail
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

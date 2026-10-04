import PublicLayout from '@/Layouts/PublicLayout';
import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { cmsService, type ProgramDetailDTO } from '@/services/cms';

export default function ProgramDetail() {
    const { url } = usePage();
    const id = url.split('/').pop() ?? '';
    const [program, setProgram] = useState<ProgramDetailDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        cmsService
            .getProgramDetail(id)
            .then((data) => {
                if (!cancelled) setProgram(data);
            })
            .catch(() => {
                if (!cancelled) setError('Program keahlian tidak ditemukan.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [id]);

    return (
        <PublicLayout
            title={program ? `${program.name} - SMKN 1 Cimahi` : 'Program Keahlian - SMKN 1 Cimahi'}
            description={program?.description ?? 'Detail program keahlian SMKN 1 Cimahi.'}
        >
            <section className="bg-milky-way py-14 lg:py-20">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="flex items-center justify-between">
                        <Link href="/program-keahlian" className="inline-flex items-center gap-2 text-sm font-semibold text-planetary hover:text-galaxy transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                            Semua Program
                        </Link>
                    </div>

                    {loading ? (
                        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-8 animate-pulse space-y-4">
                            <div className="h-8 bg-gray-100 rounded w-2/3" />
                            <div className="h-48 bg-gray-100 rounded-xl" />
                            <div className="h-4 bg-gray-100 rounded w-full" />
                        </div>
                    ) : error || !program ? (
                        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-12 text-center">
                            <p className="text-gray-500 text-sm">{error || 'Program tidak ditemukan.'}</p>
                        </div>
                    ) : (
                        <div className="mt-8">
                            {/* Header card */}
                            <div className="relative rounded-2xl overflow-hidden bg-galaxy">
                                {program.image && (
                                    <img src={program.image} alt={program.name} className="w-full h-64 sm:h-80 object-cover" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-galaxy via-galaxy/40 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-7 lg:p-9">
                                    <span className="inline-block text-[11px] font-bold text-white bg-white/15 backdrop-blur px-3 py-1 rounded-full mb-3">
                                        {program.code} • {program.duration}
                                    </span>
                                    <h1 className="font-display text-white text-3xl sm:text-4xl leading-tight">
                                        {program.name}
                                    </h1>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-7 lg:p-9">
                                <h2 className="font-bold text-galaxy">Tentang Program</h2>
                                <p className="mt-3 text-[15px] text-gray-600 leading-relaxed">{program.description}</p>

                                <div className="mt-8 grid sm:grid-cols-2 gap-6">
                                    <div className="bg-milky-way rounded-xl p-6 border border-gray-100">
                                        <h3 className="font-bold text-galaxy text-sm mb-4">Kompetensi yang Dipelajari</h3>
                                        {(program.competencies?.length ?? 0) === 0 ? (
                                            <p className="text-xs text-gray-400">Menyusul.</p>
                                        ) : (
                                            <ul className="space-y-2.5">
                                                {(program.competencies ?? []).map((kompetensi) => (
                                                    <li key={kompetensi} className="flex gap-2.5 text-sm text-gray-600">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-planetary shrink-0" />
                                                        {kompetensi}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                    <div className="bg-milky-way rounded-xl p-6 border border-gray-100">
                                        <h3 className="font-bold text-galaxy text-sm mb-4">Prospek Karier Lulusan</h3>
                                        {(program.career_prospects?.length ?? 0) === 0 ? (
                                            <p className="text-xs text-gray-400">Menyusul.</p>
                                        ) : (
                                            <ul className="space-y-2.5">
                                                {(program.career_prospects ?? []).map((karier) => (
                                                    <li key={karier} className="flex gap-2.5 text-sm text-gray-600">
                                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-planetary shrink-0" />
                                                        {karier}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-wrap gap-3">
                                    <Link
                                        href="/ppdb"
                                        className="bg-planetary text-white text-sm font-semibold px-7 py-3 rounded-[10px] hover:bg-planetary/90 transition-colors"
                                    >
                                        Daftar PPDB
                                    </Link>
                                    <Link
                                        href="/kontak"
                                        className="text-planetary text-sm font-semibold px-7 py-3 rounded-[10px] border border-planetary hover:bg-planetary hover:text-white transition-colors"
                                    >
                                        Tanya Program Ini
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

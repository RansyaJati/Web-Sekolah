import PublicLayout from '@/Layouts/PublicLayout';
import { useEffect, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { cmsService, type NewsDetailDTO } from '@/services/cms';

function formatDate(value: string): string {
    try {
        return new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
        return value;
    }
}

export default function BeritaDetail() {
    const { url } = usePage();
    const id = url.split('/').pop() ?? '';
    const [item, setItem] = useState<NewsDetailDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        cmsService
            .getNewsDetail(id)
            .then((data) => {
                if (cancelled) return;
                if (data.status !== 'Published') {
                    setError('Artikel ini tidak tersedia untuk publik.');
                    return;
                }
                setItem(data);
            })
            .catch(() => {
                if (!cancelled) setError('Artikel tidak ditemukan.');
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
            title={item ? `${item.title} - SMKN 1 Cimahi` : 'Detail Berita - SMKN 1 Cimahi'}
            description={item?.summary ?? 'Detail berita SMKN 1 Cimahi.'}
        >
            <section className="bg-milky-way py-14 lg:py-20">
                <div className="max-w-3xl mx-auto px-6">
                    <Link href="/informasi" className="inline-flex items-center gap-2 text-sm font-semibold text-planetary hover:text-galaxy transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Informasi
                    </Link>

                    {loading ? (
                        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-8 animate-pulse space-y-4">
                            <div className="h-6 bg-gray-100 rounded w-3/4" />
                            <div className="h-64 bg-gray-100 rounded-xl" />
                            <div className="h-4 bg-gray-100 rounded w-full" />
                            <div className="h-4 bg-gray-100 rounded w-5/6" />
                        </div>
                    ) : error || !item ? (
                        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-12 text-center">
                            <p className="text-gray-500 text-sm">{error || 'Artikel tidak ditemukan.'}</p>
                        </div>
                    ) : (
                        <article className="mt-8 bg-white rounded-2xl border border-gray-200 overflow-hidden">
                            {item.thumbnail && (
                                <img src={item.thumbnail} alt={item.title} className="w-full max-h-[420px] object-cover" />
                            )}
                            <div className="p-7 lg:p-10">
                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                    <span className="font-semibold text-planetary bg-sky/30 px-3 py-1 rounded-full">
                                        {item.category}
                                    </span>
                                    <span className="text-gray-400">{formatDate(item.published_at)}</span>
                                    <span className="text-gray-400">•</span>
                                    <span className="text-gray-400">Oleh {item.author}</span>
                                </div>
                                <h1 className="mt-4 font-display text-galaxy text-2xl sm:text-3xl lg:text-4xl leading-tight">
                                    {item.title}
                                </h1>
                                <p className="mt-4 text-base text-gray-500 leading-relaxed font-medium">
                                    {item.summary}
                                </p>
                                <div className="mt-6 pt-6 border-t border-gray-100 text-[15px] text-gray-600 leading-relaxed whitespace-pre-line">
                                    {item.content}
                                </div>
                            </div>
                        </article>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}

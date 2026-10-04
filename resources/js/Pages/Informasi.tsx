import PublicLayout from '@/Layouts/PublicLayout';
import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { cmsService, type NewsDTO } from '@/services/cms';

const CATEGORIES = ['Semua', 'Prestasi', 'Kegiatan', 'Pengumuman', 'Akademik'];
const PER_PAGE = 9;

function formatDate(value: string): string {
    try {
        return new Date(value).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch {
        return value;
    }
}

export default function Informasi() {
    const [category, setCategory] = useState('Semua');
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [page, setPage] = useState(1);
    const [items, setItems] = useState<NewsDTO[]>([]);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const t = setTimeout(() => {
            setDebouncedSearch(search);
            setPage(1);
        }, 400);
        return () => clearTimeout(t);
    }, [search]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError('');
        cmsService
            .listNews({
                page,
                perPage: PER_PAGE,
                category: category === 'Semua' ? undefined : category,
                search: debouncedSearch || undefined,
            })
            .then((res) => {
                if (cancelled) return;
                setItems(res.data);
                setLastPage(res.last_page);
                setTotal(res.total);
            })
            .catch((err: unknown) => {
                if (!cancelled) setError(err instanceof Error ? err.message : 'Gagal memuat informasi.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [category, debouncedSearch, page]);

    return (
        <PublicLayout
            title="Informasi & Berita - SMK Negeri 1 Cimahi"
            description="Berita, pengumuman, dan informasi kegiatan SMKN 1 Cimahi."
        >
            {/* HERO */}
            <section className="relative bg-galaxy overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-universe blur-3xl" />
                    <div className="absolute -bottom-10 left-10 w-96 h-96 rounded-full bg-planetary blur-3xl" />
                </div>
                <div className="relative max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-24">
                    <span className="inline-block text-sm font-medium text-venus mb-4">Kabar Sekolah</span>
                    <h1 className="font-display text-white text-4xl sm:text-5xl leading-[1.1]">
                        Informasi & Berita
                    </h1>
                    <p className="mt-4 text-white/70 text-base max-w-lg leading-relaxed">
                        Ikuti prestasi, kegiatan, dan pengumuman resmi SMKN 1 Cimahi.
                    </p>
                    <div className="mt-8 max-w-md relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari berita atau pengumuman..."
                            className="w-full text-sm pl-11 pr-4 py-3 rounded-[10px] bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-venus"
                        />
                        <svg className="w-4 h-4 text-white/50 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </section>

            {/* LIST */}
            <section className="bg-milky-way py-16 lg:py-20">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <div className="flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setCategory(cat);
                                    setPage(1);
                                }}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                                    category === cat
                                        ? 'bg-planetary text-white'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-planetary hover:text-planetary'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {loading ? (
                        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden animate-pulse">
                                    <div className="h-44 bg-gray-100" />
                                    <div className="p-5 space-y-2">
                                        <div className="h-4 bg-gray-100 rounded w-3/4" />
                                        <div className="h-3 bg-gray-100 rounded w-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : error ? (
                        <div className="mt-10 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-5 text-center">
                            {error}
                        </div>
                    ) : items.length === 0 ? (
                        <div className="mt-10 bg-white border border-gray-200 rounded-xl p-12 text-center">
                            <p className="text-gray-500 text-sm">Belum ada informasi pada kategori ini.</p>
                        </div>
                    ) : (
                        <>
                            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {items.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/berita/${item.id}`}
                                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow group"
                                    >
                                        {item.thumbnail ? (
                                            <img
                                                src={item.thumbnail}
                                                alt={item.title}
                                                loading="lazy"
                                                decoding="async"
                                                className="w-full h-44 object-cover group-hover:scale-[1.02] transition-transform"
                                            />
                                        ) : (
                                            <div className="w-full h-44 bg-gradient-to-br from-sky/30 to-venus/40 flex items-center justify-center">
                                                <span className="font-display text-planetary/20 text-6xl font-bold">
                                                    {item.title.charAt(0)}
                                                </span>
                                            </div>
                                        )}
                                        <div className="p-5">
                                            <div className="flex items-center gap-2 text-[11px]">
                                                <span className="font-semibold text-planetary bg-sky/30 px-2.5 py-0.5 rounded-full">
                                                    {item.category}
                                                </span>
                                                <span className="text-gray-400">{formatDate(item.published_at)}</span>
                                            </div>
                                            <h3 className="mt-2.5 font-semibold text-galaxy leading-snug line-clamp-2 group-hover:text-planetary transition-colors">
                                                {item.title}
                                            </h3>
                                            <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-2">
                                                {item.summary}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            <div className="mt-10 flex items-center justify-center gap-3 text-sm">
                                <button
                                    disabled={page <= 1}
                                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                                    className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-planetary hover:text-planetary disabled:opacity-40 font-medium"
                                >
                                    &larr; Sebelumnya
                                </button>
                                <span className="text-gray-500">
                                    Halaman {page} dari {lastPage} ({total} artikel)
                                </span>
                                <button
                                    disabled={page >= lastPage}
                                    onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                                    className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:border-planetary hover:text-planetary disabled:opacity-40 font-medium"
                                >
                                    Berikutnya &rarr;
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </section>

        </PublicLayout>
    );
}

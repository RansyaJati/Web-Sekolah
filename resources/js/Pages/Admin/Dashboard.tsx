import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { adminApi } from '@/services/adminApi';

interface StatsResponse {
    counts: {
        news: number;
        achievements: number;
        programs: number;
        products: number;
        jobs: number;
        partners: number;
        alumni: number;
        knowledge: number;
    };
    recent_news: { id: number; title: string; category: string; status: string; published_at: string }[];
    recent_activity: { id: number; user_name: string; action: string; module: string; target: string | null; created_at: string }[];
    ppdb_info: { periode?: string; status?: string } | null;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<StatsResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        adminApi
            .get<StatsResponse>('/api/stats')
            .then((data) => {
                if (!cancelled) setStats(data);
            })
            .catch((err: unknown) => {
                if (!cancelled) setError(err instanceof Error ? err.message : 'Gagal memuat statistik.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const c = stats?.counts;
    const cards = [
        { label: 'Total Berita', value: c?.news, href: '/admin/news', sub: 'Kelola publikasi' },
        { label: 'Prestasi Siswa', value: c?.achievements, href: '/admin/achievements', sub: 'Semua tingkat' },
        { label: 'Program Keahlian', value: c?.programs, href: '/admin/programs', sub: 'Aktif' },
        { label: 'Produk BLUD', value: c?.products, href: '/admin/products', sub: 'Katalog aktif' },
        { label: 'Lowongan Kerja', value: c?.jobs, href: '/admin/jobs', sub: 'Aktif BKK' },
        { label: 'Mitra Industri', value: c?.partners, href: '/admin/partners', sub: 'Terverifikasi' },
    ];

    return (
        <AdminLayout
            title="Dashboard Overview"
            subtitle="Ringkasan metrik konten, status modul, dan aktivitas terbaru website sekolah."
            action={
                <Link
                    href="/admin/news/create"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy transition-colors shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Tulis Berita Baru</span>
                </Link>
            }
        >
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className="bg-white p-4 rounded-xl border border-gray-200 animate-pulse">
                            <div className="h-3 bg-gray-100 rounded w-2/3" />
                            <div className="h-7 bg-gray-100 rounded w-1/3 mt-2" />
                        </div>
                    ))}
                </div>
            ) : error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl p-4 mb-8">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                    {cards.map((st) => (
                        <Link
                            key={st.label}
                            href={st.href}
                            className="bg-white p-4 rounded-xl border border-gray-200 hover:border-planetary hover:shadow-md transition-all group"
                        >
                            <p className="text-[11px] font-medium text-gray-500 truncate">{st.label}</p>
                            <p className="font-display text-2xl font-bold text-galaxy mt-1 group-hover:text-planetary transition-colors">
                                {st.value ?? '–'}
                            </p>
                            <p className="text-[10px] text-green-600 font-medium mt-1 flex items-center gap-1">
                                <span className="w-1 h-1 rounded-full bg-green-500" />
                                <span>{st.sub}</span>
                            </p>
                        </Link>
                    ))}
                </div>
            )}

            {/* PPDB Status Banner */}
            <div className="bg-gradient-to-r from-galaxy to-planetary text-white p-6 rounded-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold tracking-wider uppercase mb-2">
                        Status Modul PPDB {stats?.ppdb_info?.periode ?? ''}
                    </span>
                    <h2 className="font-display text-lg sm:text-xl font-bold">
                        {stats?.ppdb_info?.status ?? (loading ? 'Memuat status PPDB...' : 'Status PPDB belum diatur')}
                    </h2>
                    <p className="text-xs text-white/80 mt-1 max-w-xl">
                        Perubahan jadwal, jalur, dan persyaratan di Admin PPDB langsung tampil di website publik.
                    </p>
                </div>
                <div className="flex gap-2">
                    <Link
                        href="/admin/ppdb"
                        className="px-4 py-2 bg-white text-galaxy text-xs font-semibold rounded-lg hover:bg-milky-way transition-colors whitespace-nowrap"
                    >
                        Kelola PPDB &rarr;
                    </Link>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left 2 Cols: Recent News & quick access */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl border border-gray-200 p-5">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                            <div>
                                <h3 className="font-bold text-sm text-galaxy">Berita & Publikasi Terbaru</h3>
                                <p className="text-[11px] text-gray-400">Konten yang tampil di halaman Berita</p>
                            </div>
                            <Link href="/admin/news" className="text-xs font-semibold text-planetary hover:underline">
                                Lihat Semua
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-100">
                            {loading ? (
                                <p className="py-6 text-xs text-gray-400 text-center">Memuat berita...</p>
                            ) : (stats?.recent_news?.length ?? 0) === 0 ? (
                                <p className="py-6 text-xs text-gray-400 text-center">Belum ada berita. Tulis berita pertama.</p>
                            ) : (
                                stats?.recent_news.map((item) => (
                                    <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky/40 text-planetary font-semibold">
                                                    {item.category}
                                                </span>
                                                <span className="text-[10px] text-gray-400">{item.published_at}</span>
                                            </div>
                                            <h4 className="text-xs font-semibold text-galaxy truncate">{item.title}</h4>
                                        </div>
                                        <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded">
                                            {item.status}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Quick Access Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-sm text-galaxy mb-2">Teaching Factory & BLUD</h3>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                Kelola {c?.products ?? '–'} katalog produk unggulan sekolah dan layanan jasa siswa.
                            </p>
                            <Link href="/admin/products" className="text-xs font-semibold text-planetary hover:underline">
                                Buka Katalog BLUD &rarr;
                            </Link>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-sm text-galaxy mb-2">Bursa Kerja Khusus & PKL</h3>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                Pantau {c?.jobs ?? '–'} lowongan aktif dan {c?.partners ?? '–'} mitra industri.
                            </p>
                            <Link href="/admin/jobs" className="text-xs font-semibold text-planetary hover:underline">
                                Buka Career Center &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Col: Activity Log */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                        <div>
                            <h3 className="font-bold text-sm text-galaxy">Recent Activity</h3>
                            <p className="text-[11px] text-gray-400">Log perubahan sistem</p>
                        </div>
                        <Link href="/admin/activity" className="text-xs font-semibold text-planetary hover:underline">
                            Semua
                        </Link>
                    </div>

                    <div className="py-4 space-y-4 flex-1">
                        {loading ? (
                            <p className="text-xs text-gray-400">Memuat aktivitas...</p>
                        ) : (stats?.recent_activity?.length ?? 0) === 0 ? (
                            <p className="text-xs text-gray-400">Belum ada aktivitas tercatat.</p>
                        ) : (
                            stats?.recent_activity.map((act) => (
                                <div key={act.id} className="flex gap-3 items-start">
                                    <div className="w-7 h-7 rounded-full bg-sky/40 text-planetary flex items-center justify-center shrink-0 mt-0.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-xs font-semibold text-galaxy leading-snug">{act.action}</p>
                                        <p className="text-[10px] text-gray-500">{act.user_name} • {act.target}</p>
                                        <p className="text-[10px] text-gray-400 mt-0.5">{act.module}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <div className="pt-4 border-t border-gray-100 bg-gray-50 -mx-5 -mb-5 p-4 rounded-b-xl">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">AI Chatbot SAPA</span>
                            <span className="text-green-600 font-semibold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                {c?.knowledge ?? '–'} fakta terindeks
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

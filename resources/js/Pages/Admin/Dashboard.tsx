import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { INITIAL_NEWS, INITIAL_ACHIEVEMENTS, INITIAL_PROGRAMS, INITIAL_ACTIVITIES } from '@/data/adminContent';
import { PRODUCTS } from '@/data/products';
import { JOB_LISTINGS, INDUSTRY_PARTNERS } from '@/data/career';
import { Link } from '@inertiajs/react';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Berita', value: INITIAL_NEWS.length, change: '+2 bulan ini', href: '/admin/news', icon: 'news' },
        { label: 'Prestasi Siswa', value: INITIAL_ACHIEVEMENTS.length, change: 'Semua tingkat', href: '/admin/achievements', icon: 'trophy' },
        { label: 'Program Keahlian', value: 9, change: 'Aktif', href: '/admin/programs', icon: 'school' },
        { label: 'Produk BLUD', value: PRODUCTS.length, change: 'Katalog aktif', href: '/admin/products', icon: 'box' },
        { label: 'Lowongan Kerja', value: JOB_LISTINGS.length, change: 'Aktif BKK', href: '/admin/jobs', icon: 'briefcase' },
        { label: 'Mitra Industri', value: INDUSTRY_PARTNERS.length, change: 'Terverifikasi', href: '/admin/partners', icon: 'building' },
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
            {/* Stat Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {stats.map((st) => (
                    <Link
                        key={st.label}
                        href={st.href}
                        className="bg-white p-4 rounded-xl border border-gray-200 hover:border-planetary hover:shadow-md transition-all group"
                    >
                        <p className="text-[11px] font-medium text-gray-500 truncate">{st.label}</p>
                        <p className="font-display text-2xl font-bold text-galaxy mt-1 group-hover:text-planetary transition-colors">
                            {st.value}
                        </p>
                        <p className="text-[10px] text-green-600 font-medium mt-1 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-green-500" />
                            <span>{st.change}</span>
                        </p>
                    </Link>
                ))}
            </div>

            {/* PPDB Status Banner */}
            <div className="bg-gradient-to-r from-galaxy to-planetary text-white p-6 rounded-xl mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 text-white text-[10px] font-bold tracking-wider uppercase mb-2">
                        Status Modul PPDB 2026/2027
                    </span>
                    <h2 className="font-display text-lg sm:text-xl font-bold">Pendaftaran Online Aktif</h2>
                    <p className="text-xs text-white/80 mt-1 max-w-xl">
                        Gelombang penerimaan sedang berlangsung. 4 Jalur pendaftaran (Zonasi, Prestasi, Afirmasi, Perpindahan) dibuka serentak.
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
                {/* Left 2 Cols: Recent News & Products */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Recent News */}
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
                            {INITIAL_NEWS.slice(0, 3).map((item) => (
                                <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-sky/40 text-planetary font-semibold">
                                                {item.category}
                                            </span>
                                            <span className="text-[10px] text-gray-400">{item.publishedAt}</span>
                                        </div>
                                        <h4 className="text-xs font-semibold text-galaxy truncate">{item.title}</h4>
                                    </div>
                                    <span className="text-[10px] font-bold text-green-700 bg-green-50 px-2 py-1 rounded">
                                        {item.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Access Grid */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div className="bg-white p-5 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-sm text-galaxy mb-2">Teaching Factory & BLUD</h3>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                Kelola 6 katalog produk unggulan sekolah dan layanan jasa reparasi/rakit siswa.
                            </p>
                            <Link href="/admin/products" className="text-xs font-semibold text-planetary hover:underline">
                                Buka Katalog BLUD &rarr;
                            </Link>
                        </div>

                        <div className="bg-white p-5 rounded-xl border border-gray-200">
                            <h3 className="font-bold text-sm text-galaxy mb-2">Bursa Kerja Khusus & PKL</h3>
                            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                                Pantau lowongan aktif dan integrasi kerja sama 50+ mitra industri nasional.
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
                        {INITIAL_ACTIVITIES.map((act) => (
                            <div key={act.id} className="flex gap-3 items-start">
                                <div className="w-7 h-7 rounded-full bg-sky/40 text-planetary flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs font-semibold text-galaxy leading-snug">{act.action}</p>
                                    <p className="text-[10px] text-gray-500">{act.user} • {act.target}</p>
                                    <p className="text-[10px] text-gray-400 mt-0.5">{act.timestamp}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-4 border-t border-gray-100 bg-gray-50 -mx-5 -mb-5 p-4 rounded-b-xl">
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-500">AI Chatbot SAPA</span>
                            <span className="text-green-600 font-semibold flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                Online (Gemini 3.5)
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

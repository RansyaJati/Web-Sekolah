import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useState } from 'react';
import { INITIAL_NEWS, NewsArticle } from '@/data/adminContent';
import { Link } from '@inertiajs/react';

export default function AdminNewsIndex() {
    const [news, setNews] = useState<NewsArticle[]>(INITIAL_NEWS);
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('Semua');
    const [deleteModal, setDeleteModal] = useState<NewsArticle | null>(null);

    const categories = ['Semua', 'Prestasi', 'Kegiatan', 'Pengumuman', 'Akademik'];

    const filteredNews = news.filter((item) => {
        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                            item.summary.toLowerCase().includes(search.toLowerCase());
        const matchCategory = categoryFilter === 'Semua' || item.category === categoryFilter;
        return matchSearch && matchCategory;
    });

    const handleDelete = () => {
        if (!deleteModal) return;
        setNews((prev) => prev.filter((n) => n.id !== deleteModal.id));
        setDeleteModal(null);
    };

    return (
        <AdminLayout
            title="Kelola Berita & Publikasi"
            subtitle="Publikasikan informasi kegiatan sekolah, prestasi, dan pengumuman resmi."
            action={
                <Link
                    href="/admin/news/create"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy transition-colors shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Tambah Berita Baru</span>
                </Link>
            }
        >
            {/* Search & Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-80">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari judul berita..."
                        className="w-full text-xs pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary focus:ring-1 focus:ring-planetary"
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                <div className="flex gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                                categoryFilter === cat
                                    ? 'bg-planetary text-white'
                                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-6 py-3.5">Artikel</th>
                                <th className="px-6 py-3.5">Kategori</th>
                                <th className="px-6 py-3.5">Status</th>
                                <th className="px-6 py-3.5">Tanggal</th>
                                <th className="px-6 py-3.5 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredNews.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                        Tidak ada artikel berita ditemukan.
                                    </td>
                                </tr>
                            ) : (
                                filteredNews.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50/70 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.thumbnail}
                                                    alt=""
                                                    className="w-12 h-10 object-cover rounded-md bg-gray-100 shrink-0"
                                                />
                                                <div className="min-w-0 max-w-md">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="font-semibold text-galaxy truncate">{item.title}</h4>
                                                        {item.isFeatured && (
                                                            <span className="text-[9px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded font-bold">
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-[11px] text-gray-400 truncate mt-0.5">{item.summary}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-sky/40 text-planetary">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                                item.status === 'Published'
                                                    ? 'bg-green-50 text-green-700'
                                                    : 'bg-gray-100 text-gray-600'
                                            }`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                            {item.publishedAt}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/news/${item.id}/edit`}
                                                    className="p-1.5 text-gray-500 hover:text-planetary rounded hover:bg-gray-100"
                                                    title="Edit artikel"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                                    </svg>
                                                </Link>
                                                <button
                                                    onClick={() => setDeleteModal(item)}
                                                    className="p-1.5 text-gray-500 hover:text-red-600 rounded hover:bg-red-50"
                                                    title="Hapus artikel"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Confirmation Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-galaxy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in">
                    <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl">
                        <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h3 className="font-bold text-center text-galaxy text-sm">Hapus Berita Ini?</h3>
                        <p className="text-xs text-gray-500 text-center mt-1">
                            Anda akan menghapus &quot;{deleteModal.title}&quot;. Tindakan ini tidak dapat dibatalkan.
                        </p>
                        <div className="mt-6 flex gap-3">
                            <button
                                onClick={() => setDeleteModal(null)}
                                className="flex-1 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 py-2 rounded-lg bg-red-600 text-white text-xs font-semibold hover:bg-red-700"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

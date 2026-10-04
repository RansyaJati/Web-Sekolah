import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useState } from 'react';
import { Link } from '@inertiajs/react';

export default function AdminNewsForm() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState<'Prestasi' | 'Kegiatan' | 'Pengumuman' | 'Akademik'>('Kegiatan');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [status, setStatus] = useState<'Published' | 'Draft'>('Published');
    const [isFeatured, setIsFeatured] = useState(false);
    const [publishedAt, setPublishedAt] = useState(new Date().toISOString().split('T')[0]);
    const [savedSuccess, setSavedSuccess] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSavedSuccess(true);
        setTimeout(() => {
            window.location.href = '/admin/news';
        }, 1200);
    };

    return (
        <AdminLayout
            title="Tambah Berita Baru"
            subtitle="Buat dan publikasikan artikel atau pengumuman resmi ke website sekolah."
            action={
                <Link
                    href="/admin/news"
                    className="inline-flex items-center gap-2 px-3.5 py-2 border border-gray-200 text-xs font-semibold text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    &larr; Kembali ke Daftar
                </Link>
            }
        >
            {savedSuccess && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Artikel berita berhasil disimpan dan dipublikasikan! Mengalihkan...</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
                {/* Left 2 Cols: Main Editor */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-galaxy mb-1.5">
                                Judul Berita <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                required
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Contoh: Siswa SMKN 1 Cimahi Raih Medali Emas LKS Nasional 2026"
                                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary focus:ring-1 focus:ring-planetary"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-galaxy mb-1.5">
                                Ringkasan Singkat (Lead Paragraph) <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                required
                                rows={3}
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                placeholder="Ringkasan 1-2 kalimat yang menarik untuk preview card..."
                                className="w-full text-xs px-3.5 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary focus:ring-1 focus:ring-planetary"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-galaxy mb-1.5">
                                Isi Artikel Lengkap <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                required
                                rows={10}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Tuliskan berita lengkap di sini..."
                                className="w-full text-xs px-3.5 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary focus:ring-1 focus:ring-planetary font-mono text-[11px]"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Col: Meta & Publishing */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4">
                        <h3 className="font-bold text-xs text-galaxy uppercase tracking-wider border-b border-gray-100 pb-3">
                            Pengaturan Publikasi
                        </h3>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Status Publikasi
                            </label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as 'Published' | 'Draft')}
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            >
                                <option value="Published">Published (Tampil di Web)</option>
                                <option value="Draft">Draft (Simpan Konsep)</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Kategori
                            </label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as 'Prestasi' | 'Kegiatan' | 'Pengumuman' | 'Akademik')}
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            >
                                <option value="Prestasi">Prestasi</option>
                                <option value="Kegiatan">Kegiatan</option>
                                <option value="Pengumuman">Pengumuman</option>
                                <option value="Akademik">Akademik</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                                Tanggal Terbit
                            </label>
                            <input
                                type="date"
                                value={publishedAt}
                                onChange={(e) => setPublishedAt(e.target.value)}
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>

                        <div className="pt-2">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isFeatured}
                                    onChange={(e) => setIsFeatured(e.target.checked)}
                                    className="w-4 h-4 rounded text-planetary focus:ring-planetary border-gray-300"
                                />
                                <span className="text-xs font-medium text-gray-700">Tandai sebagai Berita Utama (Featured)</span>
                            </label>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <button
                                type="submit"
                                className="w-full py-2.5 px-4 bg-planetary hover:bg-galaxy text-white text-xs font-semibold rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Simpan & Publikasikan</span>
                            </button>
                        </div>
                    </div>

                    {/* Thumbnail placeholder preview */}
                    <div className="bg-white p-6 rounded-xl border border-gray-200">
                        <label className="block text-xs font-bold text-galaxy mb-2">
                            Thumbnail Gambar
                        </label>
                        <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-planetary transition-colors cursor-pointer bg-gray-50">
                            <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <span className="text-xs text-planetary font-medium block">Pilih File Gambar</span>
                            <span className="text-[10px] text-gray-400 block mt-0.5">PNG, JPG, WebP hingga 2MB</span>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}

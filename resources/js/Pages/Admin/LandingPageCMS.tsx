import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useState } from 'react';

export default function AdminLandingPageCMS() {
    const [headline, setHeadline] = useState('SMK Negeri 1 Cimahi: Excellence in Vocational Education');
    const [subheadline, setSubheadline] = useState('SMK Unggulan yang Menghasilkan SDM Bermutu dan Berdaya Saing Tinggi di Tingkat Nasional maupun Internasional.');
    const [ctaText1, setCtaText1] = useState('Jelajahi Profil');
    const [ctaText2, setCtaText2] = useState('Daftar PPDB');
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <AdminLayout
            title="Kelola Konten Beranda (Landing Page)"
            subtitle="Sesuaikan teks Hero Banner, CTA, dan urutan seksi publik tanpa merusak desain aslinya."
        >
            {saved && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Konfigurasi Beranda berhasil disimpan!</span>
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
                {/* Hero Section Box */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
                    <h3 className="font-bold text-sm text-galaxy border-b border-gray-100 pb-3 flex items-center gap-2">
                        <svg className="w-4 h-4 text-planetary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Hero Banner Utama</span>
                    </h3>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Headline Utama (H1)</label>
                        <input
                            type="text"
                            required
                            value={headline}
                            onChange={(e) => setHeadline(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary font-display"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Tagline / Deskripsi Hero</label>
                        <textarea
                            rows={3}
                            value={subheadline}
                            onChange={(e) => setSubheadline(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Teks Tombol CTA 1</label>
                            <input
                                type="text"
                                value={ctaText1}
                                onChange={(e) => setCtaText1(e.target.value)}
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Teks Tombol CTA 2</label>
                            <input
                                type="text"
                                value={ctaText2}
                                onChange={(e) => setCtaText2(e.target.value)}
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>
                    </div>
                </div>

                {/* Section Visibility Controls */}
                <div className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 shadow-sm">
                    <h3 className="font-bold text-sm text-galaxy border-b border-gray-100 pb-3">
                        Visibilitas Seksi di Beranda
                    </h3>

                    <div className="space-y-3">
                        {[
                            { label: 'Seksi 4 Info Strip (Kurikulum, Pendaftaran, Fasilitas, Prestasi)', def: true },
                            { label: 'Carousel 9 Program Keahlian', def: true },
                            { label: 'Seksi Berita & Prestasi Terkini', def: true },
                            { label: 'Banner Ajakan Daftar PPDB', def: true },
                        ].map((sec) => (
                            <label key={sec.label} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 cursor-pointer">
                                <input type="checkbox" defaultChecked={sec.def} className="w-4 h-4 rounded text-planetary focus:ring-planetary border-gray-300" />
                                <span className="text-xs font-medium text-gray-700">{sec.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-2.5 bg-planetary hover:bg-galaxy text-white text-xs font-semibold rounded-lg shadow-sm transition-colors"
                    >
                        Simpan Perubahan Beranda
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}

import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useState } from 'react';

interface MediaFile {
    id: string;
    name: string;
    size: string;
    url: string;
    type: 'image' | 'document';
    uploadedAt: string;
}

const INITIAL_MEDIA: MediaFile[] = [
    { id: 'm-1', name: 'logosmk.png', size: '48 KB', url: '/images/logosmk.png', type: 'image', uploadedAt: '04 Okt 2026' },
    { id: 'm-2', name: 'smkn1_upacara.png', size: '1.2 MB', url: '/images/smkn1_upacara.png', type: 'image', uploadedAt: '04 Okt 2026' },
    { id: 'm-3', name: 'prestasi1.png', size: '820 KB', url: '/images/prestasi1.png', type: 'image', uploadedAt: '04 Okt 2026' },
    { id: 'm-4', name: 'rekayasaperangkatlunak.png', size: '640 KB', url: '/images/rekayasaperangkatlunak.png', type: 'image', uploadedAt: '04 Okt 2026' },
    { id: 'm-5', name: 'teknikotomasiindustri.png', size: '710 KB', url: '/images/teknikotomasiindustri.png', type: 'image', uploadedAt: '04 Okt 2026' },
    { id: 'm-6', name: 'produksisiarandanprogramtelevisi.png', size: '590 KB', url: '/images/produksisiarandanprogramtelevisi.png', type: 'image', uploadedAt: '04 Okt 2026' },
];

export default function AdminMedia() {
    const [mediaList, setMediaList] = useState<MediaFile[]>(INITIAL_MEDIA);
    const [search, setSearch] = useState('');
    const [previewItem, setPreviewItem] = useState<MediaFile | null>(null);

    const filtered = mediaList.filter((m) => m.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <AdminLayout
            title="Media Library"
            subtitle="Pusat penyimpanan gambar dokumentasi, logo, dan berkas website sekolah."
            action={
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy transition-colors shadow-sm cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <span>Upload File Baru</span>
                    <input type="file" className="hidden" />
                </label>
            }
        >
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex items-center justify-between">
                <div className="relative w-full sm:w-80">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari file media..."
                        className="w-full text-xs pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary focus:ring-1 focus:ring-planetary"
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <span className="text-xs text-gray-400">{filtered.length} File Tersimpan</span>
            </div>

            {/* Media Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filtered.map((item) => (
                    <div
                        key={item.id}
                        onClick={() => setPreviewItem(item)}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:border-planetary hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                    >
                        <div className="h-28 bg-gray-100 flex items-center justify-center overflow-hidden p-2">
                            <img
                                src={item.url}
                                alt={item.name}
                                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                            />
                        </div>
                        <div className="p-3 border-t border-gray-100 bg-white">
                            <p className="text-[11px] font-semibold text-galaxy truncate" title={item.name}>{item.name}</p>
                            <p className="text-[10px] text-gray-400 mt-0.5">{item.size}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Preview Modal */}
            {previewItem && (
                <div className="fixed inset-0 bg-galaxy/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="font-bold text-galaxy text-sm truncate">{previewItem.name}</h3>
                            <button onClick={() => setPreviewItem(null)} className="text-gray-400">✕</button>
                        </div>

                        <div className="max-h-72 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden p-4 border border-gray-100">
                            <img src={previewItem.url} alt="" className="max-h-64 object-contain" />
                        </div>

                        <div className="text-xs space-y-1 text-gray-500 bg-milky-way p-3 rounded-lg">
                            <p><span className="font-semibold text-galaxy">Ukuran:</span> {previewItem.size}</p>
                            <p><span className="font-semibold text-galaxy">Path File:</span> {previewItem.url}</p>
                            <p><span className="font-semibold text-galaxy">Tanggal Upload:</span> {previewItem.uploadedAt}</p>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <button
                                onClick={() => {
                                    setMediaList(mediaList.filter((m) => m.id !== previewItem.id));
                                    setPreviewItem(null);
                                }}
                                className="text-xs text-red-600 hover:text-red-700 font-semibold"
                            >
                                Hapus File
                            </button>
                            <button
                                onClick={() => setPreviewItem(null)}
                                className="px-4 py-2 bg-galaxy text-white text-xs font-semibold rounded-lg"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

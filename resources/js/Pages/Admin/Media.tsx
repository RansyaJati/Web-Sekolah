import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useEffect, useRef, useState } from 'react';
import { adminApi, type Paginated } from '@/services/adminApi';

interface MediaFile {
    id: number;
    name: string;
    path: string;
    mime: string | null;
    size: number;
    width: number | null;
    height: number | null;
    created_at: string;
}

function formatSize(bytes: number): string {
    if (bytes >= 1_048_576) return `${(bytes / 1_048_576).toFixed(1)} MB`;
    if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
    return `${bytes} B`;
}

export default function AdminMedia() {
    const [mediaList, setMediaList] = useState<MediaFile[]>([]);
    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [previewItem, setPreviewItem] = useState<MediaFile | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState('');
    const [total, setTotal] = useState(0);
    const fileRef = useRef<HTMLInputElement>(null);

    // Debounce search input: don't query on every keystroke.
    useEffect(() => {
        const t = setTimeout(() => setDebouncedSearch(search), 400);
        return () => clearTimeout(t);
    }, [search]);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        const qs = debouncedSearch ? `?search=${encodeURIComponent(debouncedSearch)}&per_page=24` : '?per_page=24';
        adminApi
            .get<Paginated<MediaFile>>(`/api/media${qs}`)
            .then((data) => {
                if (cancelled) return;
                setMediaList(data.data);
                setTotal(data.total);
            })
            .catch((err: unknown) => {
                if (!cancelled) setError(err instanceof Error ? err.message : 'Gagal memuat media.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [debouncedSearch]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        setError('');
        try {
            const form = new FormData();
            form.append('file', file);
            const created = await adminApi.upload<MediaFile>('/api/media', form);
            setMediaList((prev) => [created, ...prev]);
            setTotal((t) => t + 1);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Upload gagal.');
        } finally {
            setUploading(false);
            if (fileRef.current) fileRef.current.value = '';
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await adminApi.del(`/api/media/${id}`);
            setMediaList((prev) => prev.filter((m) => m.id !== id));
            setTotal((t) => Math.max(0, t - 1));
            setPreviewItem(null);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Gagal menghapus.');
        }
    };

    return (
        <AdminLayout
            title="Media Library"
            subtitle="Pusat penyimpanan gambar dokumentasi, logo, dan berkas website sekolah."
            action={
                <label className="inline-flex items-center gap-2 px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy transition-colors shadow-sm cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                    </svg>
                    <span>{uploading ? 'Mengunggah...' : 'Upload File Baru'}</span>
                    <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
                </label>
            }
        >
            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-600">{error}</div>
            )}

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
                <span className="text-xs text-gray-400">{total} File Tersimpan</span>
            </div>

            {loading ? (
                <div className="text-center py-12 text-xs text-gray-400">Memuat media...</div>
            ) : mediaList.length === 0 ? (
                <div className="text-center py-12 text-xs text-gray-400 bg-white rounded-xl border border-gray-200">
                    Belum ada file media. Unggah gambar pertama.
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {mediaList.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => setPreviewItem(item)}
                            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:border-planetary hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                        >
                            <div className="h-28 bg-gray-100 flex items-center justify-center overflow-hidden p-2">
                                <img
                                    src={item.path}
                                    alt={item.name}
                                    loading="lazy"
                                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-200"
                                />
                            </div>
                            <div className="p-3 border-t border-gray-100 bg-white">
                                <p className="text-[11px] font-semibold text-galaxy truncate" title={item.name}>{item.name}</p>
                                <p className="text-[10px] text-gray-400 mt-0.5">{formatSize(item.size)}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Preview Modal */}
            {previewItem && (
                <div className="fixed inset-0 bg-galaxy/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="font-bold text-galaxy text-sm truncate">{previewItem.name}</h3>
                            <button onClick={() => setPreviewItem(null)} className="text-gray-400">✕</button>
                        </div>

                        <div className="max-h-72 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden p-4 border border-gray-100">
                            <img src={previewItem.path} alt="" className="max-h-64 object-contain" />
                        </div>

                        <div className="text-xs space-y-1 text-gray-500 bg-milky-way p-3 rounded-lg">
                            <p><span className="font-semibold text-galaxy">Ukuran:</span> {formatSize(previewItem.size)}{previewItem.width ? ` (${previewItem.width}×${previewItem.height}px)` : ''}</p>
                            <p className="break-all"><span className="font-semibold text-galaxy">Path File:</span> {previewItem.path}</p>
                        </div>

                        <div className="flex justify-between items-center pt-2">
                            <button
                                onClick={() => handleDelete(previewItem.id)}
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

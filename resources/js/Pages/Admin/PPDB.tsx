import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useState, useEffect } from 'react';
import { cmsService } from '@/services/cms';
import { adminApi } from '@/services/adminApi';

export default function AdminPPDB() {
    const [activeTab, setActiveTab] = useState<'info' | 'jalur' | 'jadwal' | 'syarat' | 'faq'>('info');

    // States for editing
    const [info, setInfo] = useState({ periode: '', status: '', link_portal: '' });
    const [jalurList, setJalurList] = useState<any[]>([]);
    const [jadwalList, setJadwalList] = useState<any[]>([]);
    const [syaratList, setSyaratList] = useState<any[]>([]);
    const [faqList, setFaqList] = useState<any[]>([]);
    
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        let cancelled = false;
        // Single batch request instead of 5 parallel /api/settings/* calls.
        cmsService
            .getSettingsBatch<{
                ppdb_info: { periode: string; status: string; link_portal: string };
                ppdb_jalur: any[];
                ppdb_jadwal: any[];
                ppdb_syarat: any[];
                ppdb_faq: any[];
            }>(['ppdb_info', 'ppdb_jalur', 'ppdb_jadwal', 'ppdb_syarat', 'ppdb_faq'])
            .then((data) => {
                if (cancelled) return;
                if (data.ppdb_info && (data.ppdb_info as any).periode) setInfo(data.ppdb_info as any);
                if (Array.isArray(data.ppdb_jalur)) setJalurList(data.ppdb_jalur);
                if (Array.isArray(data.ppdb_jadwal)) setJadwalList(data.ppdb_jadwal);
                if (Array.isArray(data.ppdb_syarat)) setSyaratList(data.ppdb_syarat);
                if (Array.isArray(data.ppdb_faq)) setFaqList(data.ppdb_faq);
            })
            .catch(console.error)
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const saveSetting = async (key: string, value: any) => {
        try {
            await adminApi.post(`/api/settings/${key}`, { value });
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
        } catch (err) {
            console.error(err);
        }
    };

    const handleSaveInfo = (e: React.FormEvent) => {
        e.preventDefault();
        saveSetting('ppdb_info', info);
    };

    return (
        <AdminLayout
            title="Kelola Modul PPDB 2026/2027"
            subtitle="Atur informasi alur, kuota jalur seleksi, jadwal tahapan, persyaratan, dan FAQ pendaftaran."
        >
            {saved && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Pengaturan PPDB berhasil disimpan!</span>
                </div>
            )}

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-6 border-b border-gray-200 pb-3 overflow-x-auto">
                {[
                    { id: 'info', label: 'Informasi Umum' },
                    { id: 'jalur', label: `Jalur Pendaftaran (${jalurList.length})` },
                    { id: 'jadwal', label: `Jadwal & Tahapan (${jadwalList.length})` },
                    { id: 'syarat', label: 'Persyaratan Dokumen' },
                    { id: 'faq', label: `FAQ (${faqList.length})` },
                ].map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id as any)}
                        className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                            activeTab === t.id
                                ? 'bg-galaxy text-white shadow-sm'
                                : 'text-gray-600 hover:bg-gray-100'
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-12 text-gray-500">Memuat pengaturan PPDB...</div>
            ) : (
                <>
                    {/* Tab 1: Informasi Umum */}
                    {activeTab === 'info' && (
                        <form onSubmit={handleSaveInfo} className="bg-white p-6 rounded-xl border border-gray-200 space-y-4 max-w-3xl">
                            <h3 className="font-bold text-sm text-galaxy border-b border-gray-100 pb-3">Informasi Utama PPDB</h3>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Periode Pendaftaran</label>
                                <input
                                    type="text"
                                    value={info.periode || ''}
                                    onChange={(e) => setInfo({ ...info, periode: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Status Gelombang</label>
                                <select 
                                    value={info.status || ''}
                                    onChange={(e) => setInfo({ ...info, status: e.target.value })}
                                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                                >
                                    <option>Dibuka (Pendaftaran Aktif)</option>
                                    <option>Ditutup Sementara (Tahap Verifikasi)</option>
                                    <option>Selesai</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Link Portal Pendaftaran Eksternal (Jika Ada)</label>
                                <input
                                    type="url"
                                    value={info.link_portal || ''}
                                    onChange={(e) => setInfo({ ...info, link_portal: e.target.value })}
                                    className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                                />
                            </div>
                            <div className="pt-3">
                                <button type="submit" className="px-5 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy">
                                    Simpan Perubahan
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Tab 2: Jalur */}
                    {activeTab === 'jalur' && (
                        <div className="grid sm:grid-cols-2 gap-4">
                            {jalurList.map((j, i) => (
                                <div key={i} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h4 className="font-bold text-galaxy text-sm">{j.name}</h4>
                                            <span className="text-xs font-bold text-planetary bg-sky/40 px-2 py-0.5 rounded-full">
                                                Kuota {j.quota}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 leading-relaxed">{j.description}</p>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                                        <button className="text-xs text-gray-400 hover:text-planetary font-medium" onClick={() => alert('Untuk demo: Anda bisa mengubah array jalurList dan memanggil saveSetting("ppdb_jalur", jalurList)')}>Edit Kuota & Syarat</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tab 3: Jadwal */}
                    {activeTab === 'jadwal' && (
                        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden shadow-sm">
                            {jadwalList.map((step, i) => (
                                <div key={i} className="p-5 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <span className="w-8 h-8 rounded-full bg-planetary text-white flex items-center justify-center text-xs font-bold shrink-0">
                                            {step.step}
                                        </span>
                                        <div>
                                            <h4 className="font-bold text-galaxy text-xs sm:text-sm">{step.title}</h4>
                                            <p className="text-[11px] text-planetary font-medium mt-0.5">{step.date}</p>
                                            <p className="text-[11px] text-gray-400 mt-1 max-w-xl">{step.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tab 4: Persyaratan Dokumen */}
                    {activeTab === 'syarat' && (
                        <div className="grid md:grid-cols-2 gap-6">
                            {syaratList.map((group, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h4 className="font-bold text-galaxy text-sm mb-4 pb-2 border-b border-gray-100">{group.category}</h4>
                                    <ul className="space-y-2.5">
                                        {group.items.map((item: string, j: number) => (
                                            <li key={j} className="text-xs text-gray-600 flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-planetary shrink-0" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Tab 5: FAQ */}
                    {activeTab === 'faq' && (
                        <div className="space-y-3">
                            {faqList.map((faq, idx) => (
                                <div key={idx} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                                    <h4 className="font-bold text-galaxy text-xs sm:text-sm">{faq.question}</h4>
                                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </AdminLayout>
    );
}

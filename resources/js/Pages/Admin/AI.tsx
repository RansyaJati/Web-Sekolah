import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useState } from 'react';

interface KnowledgeItem {
    id: string;
    topic: string;
    category: 'Jurusan' | 'PPDB' | 'BLUD' | 'BKK' | 'Prestasi' | 'Sekolah';
    content: string;
    isActive: boolean;
}

const INITIAL_KB: KnowledgeItem[] = [
    {
        id: 'kb-1',
        topic: 'Daftar 9 Program Keahlian Unggulan',
        category: 'Jurusan',
        content: 'RPL (3 Tahun), TOI (3 Tahun), Broadcast/PSPT (3 Tahun), Mekatronika (3 Tahun), TEI (3 Tahun), TEK (3 Tahun), IOP (4 Tahun), TPTU (3 Tahun), SIJA (4 Tahun).',
        isActive: true
    },
    {
        id: 'kb-2',
        topic: 'Jalur dan Kuota PPDB 2026/2027',
        category: 'PPDB',
        content: 'Zonasi (50%), Prestasi Akademik/Kejuaraan (30%), Afirmasi KETM (15%), Perpindahan Tugas Orang Tua (5%). Pendaftaran 100% online gratis.',
        isActive: true
    },
    {
        id: 'kb-3',
        topic: 'Praktik Kerja Lapangan (PKL) & Bursa Kerja',
        category: 'BKK',
        content: 'PKL berlangsung 3-6 bulan untuk kelas XI dan XII. Memiliki 50+ mitra industri termasuk Telkom, Schneider, LEN, Daikin, INTI, dan Biznet. Serapan kerja alumni mencapai 85%.',
        isActive: true
    },
    {
        id: 'kb-4',
        topic: 'Produk BLUD Teaching Factory',
        category: 'BLUD',
        content: 'IoT Development Kit, Perakitan PCB, Jasa Pembuatan Video Broadcast, Panel Kontrol PLC Otomasi, Servis AC TPTU, Instalasi Jaringan SIJA.',
        isActive: true
    }
];

export default function AdminAI() {
    const [kbList, setKbList] = useState<KnowledgeItem[]>(INITIAL_KB);
    const [modalOpen, setModalOpen] = useState(false);
    const [topic, setTopic] = useState('');
    const [category, setCategory] = useState<'Jurusan' | 'PPDB' | 'BLUD' | 'BKK' | 'Prestasi' | 'Sekolah'>('Sekolah');
    const [content, setContent] = useState('');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem: KnowledgeItem = {
            id: 'kb-' + Date.now(),
            topic,
            category,
            content,
            isActive: true
        };
        setKbList([newItem, ...kbList]);
        setModalOpen(false);
        setTopic('');
        setContent('');
    };

    return (
        <AdminLayout
            title="AI Assistant Knowledge Base"
            subtitle="Kelola sumber pengetahuan resmi sekolah yang digunakan oleh asisten virtual SAPA (Google Gemini AI)."
            action={
                <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy transition-colors shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Tambah Knowledge Base</span>
                </button>
            }
        >
            {/* Status Integration Banner */}
            <div className="bg-white p-5 rounded-xl border border-gray-200 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-planetary text-white flex items-center justify-center font-bold">
                        AI
                    </div>
                    <div>
                        <h3 className="font-bold text-galaxy text-sm">Status Engine SAPA</h3>
                        <p className="text-xs text-gray-500">Model aktif: <span className="font-mono text-planetary font-bold">gemini-3.5-flash</span> (Google AI Studio)</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs font-semibold text-green-700">Guardrails Aktif (Strict SMK Only)</span>
                </div>
            </div>

            {/* List Knowledge */}
            <div className="space-y-4">
                {kbList.map((item) => (
                    <div key={item.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="space-y-1.5 flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky/40 text-planetary">
                                    {item.category}
                                </span>
                                <span className="text-xs font-bold text-galaxy">{item.topic}</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-relaxed max-w-3xl">{item.content}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                            <span className="text-[10px] font-semibold text-green-700 bg-green-50 px-2 py-0.5 rounded">
                                Terindeks
                            </span>
                            <button
                                onClick={() => setKbList(kbList.filter((k) => k.id !== item.id))}
                                className="text-xs text-red-600 hover:text-red-700 font-semibold"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Tambah */}
            {modalOpen && (
                <div className="fixed inset-0 bg-galaxy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleSave} className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="font-bold text-galaxy text-sm">Tambah Sumber Pengetahuan AI</h3>
                            <button type="button" onClick={() => setModalOpen(false)} className="text-gray-400">✕</button>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Topik Informasi</label>
                            <input
                                type="text"
                                required
                                value={topic}
                                onChange={(e) => setTopic(e.target.value)}
                                placeholder="Contoh: Jam Operasional Pelayanan PPDB"
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Kategori</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value as any)}
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            >
                                <option value="Sekolah">Sekolah / Umum</option>
                                <option value="Jurusan">Jurusan</option>
                                <option value="PPDB">PPDB</option>
                                <option value="BLUD">BLUD</option>
                                <option value="BKK">BKK & PKL</option>
                                <option value="Prestasi">Prestasi</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Isi Fakta / Pengetahuan</label>
                            <textarea
                                required
                                rows={4}
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Tuliskan fakta spesifik yang akan dijawab oleh AI..."
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 border border-gray-200 text-xs font-semibold rounded-lg text-gray-600 hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy"
                            >
                                Simpan ke Knowledge Base
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AdminLayout>
    );
}

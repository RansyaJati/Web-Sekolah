import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useState } from 'react';
import { INITIAL_ACHIEVEMENTS, AchievementItem } from '@/data/adminContent';

export default function AdminAchievements() {
    const [achievements, setAchievements] = useState<AchievementItem[]>(INITIAL_ACHIEVEMENTS);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<AchievementItem>>({
        level: 'Provinsi',
        year: '2026',
        rank: 'Juara 1',
        isFeatured: true
    });

    const filtered = achievements.filter((a) =>
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.studentName.toLowerCase().includes(search.toLowerCase()) ||
        a.competition.toLowerCase().includes(search.toLowerCase())
    );

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem: AchievementItem = {
            id: 'ach-' + Date.now(),
            title: formData.title || 'Prestasi Baru',
            studentName: formData.studentName || 'Siswa Berprestasi',
            competition: formData.competition || 'Kompetisi',
            level: (formData.level as 'Kota' | 'Provinsi' | 'Nasional' | 'Internasional') || 'Nasional',
            year: formData.year || '2026',
            rank: formData.rank || 'Juara 1',
            photo: '/images/prestasi1.png',
            description: formData.description || 'Pencapaian membanggakan siswa.',
            isFeatured: formData.isFeatured ?? true
        };
        setAchievements([newItem, ...achievements]);
        setModalOpen(false);
        setFormData({ level: 'Provinsi', year: '2026', rank: 'Juara 1', isFeatured: true });
    };

    const handleDelete = (id: string) => {
        setAchievements(achievements.filter((a) => a.id !== id));
    };

    return (
        <AdminLayout
            title="Kelola Prestasi Siswa"
            subtitle="Daftar kejuaraan dan penghargaan akademik/non-akademik siswa SMKN 1 Cimahi."
            action={
                <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy transition-colors shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Tambah Prestasi</span>
                </button>
            }
        >
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex items-center justify-between">
                <div className="relative w-full sm:w-80">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari kejuaraan, nama siswa..."
                        className="w-full text-xs pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary focus:ring-1 focus:ring-planetary"
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Grid Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                        <div className="h-40 bg-galaxy relative overflow-hidden">
                            <img src={item.photo} alt="" className="w-full h-full object-cover opacity-80" />
                            <div className="absolute top-3 left-3 flex gap-1.5">
                                <span className="bg-white/90 backdrop-blur-sm text-galaxy text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                                    {item.rank}
                                </span>
                                <span className="bg-planetary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                                    {item.level}
                                </span>
                            </div>
                        </div>

                        <div className="p-5">
                            <span className="text-[10px] text-gray-400 font-semibold">{item.year}</span>
                            <h3 className="font-bold text-galaxy text-sm mt-1 leading-snug">{item.title}</h3>
                            <p className="text-xs text-planetary font-medium mt-1">Oleh: {item.studentName}</p>
                            <p className="text-[11px] text-gray-500 mt-2 line-clamp-2">{item.description}</p>

                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                    item.isFeatured ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-500'
                                }`}>
                                    {item.isFeatured ? 'Featured di Beranda' : 'Standard'}
                                </span>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-xs text-red-600 hover:text-red-700 font-semibold"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Tambah Prestasi */}
            {modalOpen && (
                <div className="fixed inset-0 bg-galaxy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleSave} className="bg-white rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="font-bold text-galaxy text-sm">Tambah Catatan Prestasi</h3>
                            <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Prestasi / Juara</label>
                            <input
                                type="text"
                                required
                                value={formData.title || ''}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Contoh: Juara 1 LKS Mobile Robotik"
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Siswa / Tim</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.studentName || ''}
                                    onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                                    placeholder="Nama siswa"
                                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Tingkat</label>
                                <select
                                    value={formData.level}
                                    onChange={(e) => setFormData({ ...formData, level: e.target.value as 'Kota' | 'Provinsi' | 'Nasional' | 'Internasional' })}
                                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                                >
                                    <option value="Kota">Tingkat Kota</option>
                                    <option value="Provinsi">Tingkat Provinsi</option>
                                    <option value="Nasional">Tingkat Nasional</option>
                                    <option value="Internasional">Tingkat Internasional</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Penyelenggara / Kompetisi</label>
                            <input
                                type="text"
                                required
                                value={formData.competition || ''}
                                onChange={(e) => setFormData({ ...formData, competition: e.target.value })}
                                placeholder="Contoh: Dinas Pendidikan Jawa Barat"
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi Singkat</label>
                            <textarea
                                rows={2}
                                value={formData.description || ''}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Detail inovasi atau karya yang dilombakan..."
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
                                Simpan Prestasi
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AdminLayout>
    );
}

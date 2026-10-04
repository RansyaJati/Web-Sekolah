import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useState } from 'react';
import { INDUSTRY_PARTNERS, IndustryPartner } from '@/data/career';

export default function AdminPartners() {
    const [partners, setPartners] = useState<IndustryPartner[]>(INDUSTRY_PARTNERS);
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [sector, setSector] = useState('');
    const [desc, setDesc] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newPartner: IndustryPartner = {
            id: 'ptr-' + Date.now(),
            name,
            sector: sector || 'Teknologi & Industri',
            description: desc,
            logo: null,
            partnerSince: '2026'
        };
        setPartners([newPartner, ...partners]);
        setModalOpen(false);
        setName('');
        setSector('');
        setDesc('');
    };

    return (
        <AdminLayout
            title="Kelola Mitra Industri"
            subtitle="Daftar perusahaan rekanan kerja sama PKL, teaching factory, dan rekrutmen lulusan."
            action={
                <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy transition-colors shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Tambah Mitra Baru</span>
                </button>
            }
        >
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {partners.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between shadow-sm">
                        <div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-sky/40 text-planetary font-bold flex items-center justify-center text-sm">
                                    {item.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-galaxy text-sm leading-snug">{item.name}</h3>
                                    <span className="text-[10px] text-planetary font-medium">{item.sector}</span>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 leading-relaxed mb-4">{item.description}</p>
                            <span className="text-[10px] text-gray-400">Kerja sama sejak {item.partnerSince}</span>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded text-[10px] font-bold">
                                MoU Aktif
                            </span>
                            <button
                                onClick={() => setPartners(partners.filter((p) => p.id !== item.id))}
                                className="text-xs text-red-600 hover:text-red-700 font-semibold"
                            >
                                Hapus
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Tambah Mitra */}
            {modalOpen && (
                <div className="fixed inset-0 bg-galaxy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleAdd} className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="font-bold text-galaxy text-sm">Tambah Mitra Industri</h3>
                            <button type="button" onClick={() => setModalOpen(false)} className="text-gray-400">✕</button>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Perusahaan</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="PT Contoh Industri"
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Bidang / Sektor</label>
                            <input
                                type="text"
                                required
                                value={sector}
                                onChange={(e) => setSector(e.target.value)}
                                placeholder="Telekomunikasi / Elektronika"
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Cakupan Kerja Sama</label>
                            <textarea
                                required
                                rows={3}
                                value={desc}
                                onChange={(e) => setDesc(e.target.value)}
                                placeholder="Kerja sama PKL, sertifikasi keahlian, dan guru tamu..."
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
                                Simpan Mitra
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AdminLayout>
    );
}

import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useState, useEffect } from 'react';

interface AlumniItem {
    id: number;
    name: string;
    graduation_year: string;
    program: string;
    current_affiliation: string;
    achievement: string | null;
    testimonial: string;
    photo: string | null;
    is_featured: boolean;
}

export default function AdminAlumni() {
    const [alumni, setAlumni] = useState<AlumniItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [name, setName] = useState('');
    const [year, setYear] = useState('2023');
    const [program, setProgram] = useState('Rekayasa Perangkat Lunak');
    const [affiliation, setAffiliation] = useState('');
    const [testimonial, setTestimonial] = useState('');

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/alumni');
            setAlumni(await res.json());
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/alumni', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': getCsrfToken() },
                body: JSON.stringify({
                    name, graduation_year: year, program,
                    current_affiliation: affiliation, testimonial,
                    achievement: 'Lulusan berprestasi industri',
                    is_featured: true,
                }),
            });
            if (res.ok) {
                const created = await res.json();
                setAlumni([created, ...alumni]);
                setModalOpen(false);
                setName(''); setAffiliation(''); setTestimonial('');
            }
        } catch (err) { console.error(err); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Hapus alumni ini?')) return;
        try {
            const res = await fetch(`/api/alumni/${id}`, {
                method: 'DELETE',
                headers: { 'X-XSRF-TOKEN': getCsrfToken() },
            });
            if (res.ok) setAlumni(alumni.filter((a) => a.id !== id));
        } catch (err) { console.error(err); }
    };

    return (
        <AdminLayout
            title="Kelola Featured Alumni"
            subtitle="Kisah inspiratif lulusan SMKN 1 Cimahi yang sukses di dunia industri dan perguruan tinggi."
            action={
                <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy transition-colors shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Tambah Kisah Alumni</span>
                </button>
            }
        >
            {loading ? (
                <div className="text-center py-16 text-gray-400 text-xs">Memuat data...</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {alumni.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col justify-between shadow-sm">
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-galaxy text-white flex items-center justify-center font-bold text-base shrink-0">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-galaxy text-sm">{item.name}</h3>
                                        <p className="text-[11px] text-planetary font-medium">{item.program} (Lulus {item.graduation_year})</p>
                                    </div>
                                </div>

                                <div className="bg-milky-way p-3 rounded-lg border border-venus/40 mb-3">
                                    <p className="text-xs font-semibold text-galaxy">{item.current_affiliation}</p>
                                </div>

                                <p className="text-xs text-gray-500 italic leading-relaxed">
                                    &ldquo;{item.testimonial}&rdquo;
                                </p>
                            </div>

                            <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                                <span className="text-green-700 bg-green-50 px-2 py-0.5 rounded text-[10px] font-bold">
                                    Tampil di Website
                                </span>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="text-red-600 hover:text-red-700 font-semibold"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Tambah */}
            {modalOpen && (
                <div className="fixed inset-0 bg-galaxy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleSave} className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="font-bold text-galaxy text-sm">Tambah Testimonial Alumni</h3>
                            <button type="button" onClick={() => setModalOpen(false)} className="text-gray-400">&times;</button>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                            <input type="text" required value={name} onChange={(e) => setName(e.target.value)}
                                placeholder="Contoh: Dinda Permata"
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Tahun Lulus</label>
                                <input type="text" required value={year} onChange={(e) => setYear(e.target.value)}
                                    placeholder="2023"
                                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Jurusan</label>
                                <select value={program} onChange={(e) => setProgram(e.target.value)}
                                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary">
                                    <option value="Rekayasa Perangkat Lunak">RPL</option>
                                    <option value="Teknik Otomasi Industri">TOI</option>
                                    <option value="Produksi Siaran TV">Broadcast</option>
                                    <option value="Teknik Mekatronika">Mekatronika</option>
                                    <option value="SIJA">SIJA</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Pekerjaan / Perguruan Tinggi Saat Ini</label>
                            <input type="text" required value={affiliation} onChange={(e) => setAffiliation(e.target.value)}
                                placeholder="Software Engineer di PT Telkom"
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary" />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Kutipan / Testimonial</label>
                            <textarea required rows={3} value={testimonial} onChange={(e) => setTestimonial(e.target.value)}
                                placeholder="Kesan selama belajar di SMKN 1 Cimahi..."
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary" />
                        </div>

                        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                            <button type="button" onClick={() => setModalOpen(false)}
                                className="px-4 py-2 border border-gray-200 text-xs font-semibold rounded-lg text-gray-600 hover:bg-gray-50">
                                Batal
                            </button>
                            <button type="submit" disabled={saving}
                                className="px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy disabled:opacity-60">
                                {saving ? 'Menyimpan...' : 'Simpan Alumni'}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AdminLayout>
    );
}

function getCsrfToken(): string {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
}

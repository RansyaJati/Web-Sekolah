import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useState, useEffect } from 'react';

interface JobListing {
    id: number;
    title: string;
    company: string;
    location: string;
    type: 'Full-time' | 'Part-time' | 'Magang' | 'PKL';
    category: string;
    description: string;
    requirements: string[] | null;
    posted_date: string;
    deadline_date: string | null;
    is_active: boolean;
}

export default function AdminJobs() {
    const [jobs, setJobs] = useState<JobListing[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [location, setLocation] = useState('Bandung, Jawa Barat');
    const [type, setType] = useState<JobListing['type']>('Full-time');
    const [desc, setDesc] = useState('');

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/jobs');
            setJobs(await res.json());
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': getCsrfToken() },
                body: JSON.stringify({
                    title, company, location, type,
                    category: 'Teknologi',
                    description: desc,
                    requirements: ['Lulusan SMK relevan', 'Disiplin dan siap bekerja'],
                    posted_date: new Date().toISOString().split('T')[0],
                    is_active: true,
                }),
            });
            if (res.ok) {
                const created = await res.json();
                setJobs([created, ...jobs]);
                setModalOpen(false);
                setTitle(''); setCompany(''); setDesc('');
            }
        } catch (err) { console.error(err); }
        finally { setSaving(false); }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Hapus lowongan ini?')) return;
        try {
            const res = await fetch(`/api/jobs/${id}`, {
                method: 'DELETE',
                headers: { 'X-XSRF-TOKEN': getCsrfToken() },
            });
            if (res.ok) setJobs(jobs.filter((j) => j.id !== id));
        } catch (err) { console.error(err); }
    };

    return (
        <AdminLayout
            title="Kelola Lowongan Kerja BKK"
            subtitle="Publikasikan informasi rekrutmen kerja dan peluang magang dari perusahaan mitra."
            action={
                <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy transition-colors shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Tambah Lowongan Kerja</span>
                </button>
            }
        >
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-6 py-3.5">Posisi / Pekerjaan</th>
                                <th className="px-6 py-3.5">Perusahaan</th>
                                <th className="px-6 py-3.5">Lokasi</th>
                                <th className="px-6 py-3.5">Tipe</th>
                                <th className="px-6 py-3.5">Tanggal Posting</th>
                                <th className="px-6 py-3.5 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">Memuat data...</td></tr>
                            ) : jobs.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-12 text-center text-gray-400">Belum ada lowongan.</td></tr>
                            ) : jobs.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-galaxy">{item.title}</td>
                                    <td className="px-6 py-4 text-planetary font-medium">{item.company}</td>
                                    <td className="px-6 py-4 text-gray-500">{item.location}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                            item.type === 'Full-time' ? 'bg-green-50 text-green-700' :
                                            item.type === 'Magang' ? 'bg-blue-50 text-blue-700' :
                                            'bg-orange-50 text-orange-700'
                                        }`}>
                                            {item.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{item.posted_date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:text-red-700 font-semibold"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Tambah Lowongan */}
            {modalOpen && (
                <div className="fixed inset-0 bg-galaxy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleSave} className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="font-bold text-galaxy text-sm">Tambah Lowongan Kerja BKK</h3>
                            <button type="button" onClick={() => setModalOpen(false)} className="text-gray-400">&times;</button>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Posisi Jabatan</label>
                            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                                placeholder="Junior Software Developer"
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary" />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Perusahaan</label>
                            <input type="text" required value={company} onChange={(e) => setCompany(e.target.value)}
                                placeholder="PT Telkom Indonesia"
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Lokasi</label>
                                <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
                                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary" />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">Tipe</label>
                                <select value={type} onChange={(e) => setType(e.target.value as JobListing['type'])}
                                    className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary">
                                    <option value="Full-time">Full-time</option>
                                    <option value="Magang">Magang</option>
                                    <option value="PKL">PKL</option>
                                    <option value="Part-time">Part-time</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi Singkat</label>
                            <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)}
                                placeholder="Tugas dan tanggung jawab posisi..."
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary" />
                        </div>

                        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                            <button type="button" onClick={() => setModalOpen(false)}
                                className="px-4 py-2 border border-gray-200 text-xs font-semibold rounded-lg text-gray-600 hover:bg-gray-50">
                                Batal
                            </button>
                            <button type="submit" disabled={saving}
                                className="px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy disabled:opacity-60">
                                {saving ? 'Menyimpan...' : 'Publikasikan Lowongan'}
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

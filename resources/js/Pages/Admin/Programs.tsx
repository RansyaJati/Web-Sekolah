import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useState, useEffect } from 'react';

interface ProgramItem {
    id: number;
    name: string;
    code: string;
    duration: string;
    description: string;
    competencies: string[] | null;
    career_prospects: string[] | null;
    image: string | null;
    is_active: boolean;
    is_featured: boolean;
}

export default function AdminPrograms() {
    const [programs, setPrograms] = useState<ProgramItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'all' | '3thn' | '4thn'>('all');

    useEffect(() => { fetchData(); }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/programs');
            setPrograms(await res.json());
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const filtered = programs.filter((p) => {
        if (activeTab === '3thn') return p.duration.includes('3');
        if (activeTab === '4thn') return p.duration.includes('4');
        return true;
    });

    const toggleStatus = async (id: number, current: boolean) => {
        try {
            const res = await fetch(`/api/programs/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'X-XSRF-TOKEN': getCsrfToken() },
                body: JSON.stringify({ is_active: !current }),
            });
            if (res.ok) {
                setPrograms(programs.map((p) => p.id === id ? { ...p, is_active: !current } : p));
            }
        } catch (err) { console.error(err); }
    };

    return (
        <AdminLayout
            title="Kelola Program Keahlian (Jurusan)"
            subtitle="Atur informasi 9 kompetensi keahlian, materi pembelajaran, dan prospek karier lulusan."
        >
            <div className="flex gap-2 mb-6 border-b border-gray-200 pb-3">
                <button onClick={() => setActiveTab('all')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeTab === 'all' ? 'bg-galaxy text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Semua Jurusan ({programs.length})
                </button>
                <button onClick={() => setActiveTab('3thn')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeTab === '3thn' ? 'bg-galaxy text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Program 3 Tahun
                </button>
                <button onClick={() => setActiveTab('4thn')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${activeTab === '4thn' ? 'bg-galaxy text-white' : 'text-gray-600 hover:bg-gray-100'}`}>
                    Program 4 Tahun
                </button>
            </div>

            {loading ? (
                <div className="text-center py-16 text-gray-400 text-xs">Memuat data...</div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((item) => (
                        <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
                            <div className="h-36 bg-galaxy relative">
                                {item.image && (
                                    <img src={item.image} alt="" className="w-full h-full object-cover opacity-80" />
                                )}
                                <div className="absolute top-3 right-3 bg-galaxy/80 backdrop-blur-sm text-white px-2 py-0.5 rounded text-[10px] font-bold">
                                    {item.duration}
                                </div>
                            </div>

                            <div className="p-5 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-[10px] font-bold tracking-wider text-planetary uppercase">
                                            Kode: {item.code}
                                        </span>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                            item.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {item.is_active ? 'Aktif' : 'Non-aktif'}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-galaxy text-base mb-2">{item.name}</h3>
                                    <p className="text-xs text-gray-500 mb-4 leading-relaxed">{item.description}</p>

                                    {item.competencies && item.competencies.length > 0 && (
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Kompetensi Utama:</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {item.competencies.map((c) => (
                                                    <span key={c} className="text-[10px] bg-sky/30 text-planetary px-2 py-0.5 rounded font-medium">
                                                        {c}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                                    <button
                                        onClick={() => toggleStatus(item.id, item.is_active)}
                                        className="text-xs text-gray-600 hover:text-galaxy font-medium"
                                    >
                                        {item.is_active ? 'Nonaktifkan' : 'Aktifkan'}
                                    </button>
                                    <button className="text-xs text-planetary hover:underline font-semibold">
                                        Edit Rincian &rarr;
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    );
}

function getCsrfToken(): string {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
}

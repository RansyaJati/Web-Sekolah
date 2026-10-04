import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useEffect, useState } from 'react';
import { adminApi, type Paginated } from '@/services/adminApi';

interface ActivityItem {
    id: number;
    user_name: string | null;
    action: string;
    module: string;
    target: string | null;
    status: string;
    created_at: string;
}

export default function AdminActivity() {
    const [items, setItems] = useState<ActivityItem[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        adminApi
            .get<Paginated<ActivityItem>>(`/api/activity-logs?per_page=20&page=${page}`)
            .then((data) => {
                if (cancelled) return;
                setItems(data.data);
                setLastPage(data.last_page);
                setTotal(data.total);
            })
            .catch((err: unknown) => {
                if (!cancelled) setError(err instanceof Error ? err.message : 'Gagal memuat log.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, [page]);

    return (
        <AdminLayout
            title="Activity Audit Log"
            subtitle="Catatan riwayat perubahan data dan aktivitas penting di sistem Admin Panel."
        >
            {error ? (
                <div className="bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl p-4">{error}</div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-6 py-3.5">Waktu</th>
                                <th className="px-6 py-3.5">Pengguna</th>
                                <th className="px-6 py-3.5">Aktivitas</th>
                                <th className="px-6 py-3.5">Modul</th>
                                <th className="px-6 py-3.5">Target Data</th>
                                <th className="px-6 py-3.5">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">Memuat log...</td>
                                </tr>
                            ) : items.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-400">Belum ada aktivitas tercatat.</td>
                                </tr>
                            ) : (
                                items.map((act) => (
                                    <tr key={act.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-gray-400 font-mono text-[11px] whitespace-nowrap">
                                            {new Date(act.created_at).toLocaleString('id-ID')}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-galaxy">{act.user_name ?? 'System'}</td>
                                        <td className="px-6 py-4 text-gray-700">{act.action}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded font-semibold text-[10px] bg-sky/30 text-planetary">
                                                {act.module}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{act.target ?? '–'}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-green-50 text-green-700">
                                                {act.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <div className="flex items-center justify-between px-6 py-3 border-t border-gray-100 text-xs text-gray-500">
                        <span>Total {total} aktivitas</span>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={page <= 1}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                            >
                                &larr; Sebelumnya
                            </button>
                            <span>Halaman {page} / {lastPage}</span>
                            <button
                                disabled={page >= lastPage}
                                onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
                                className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40"
                            >
                                Berikutnya &rarr;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}

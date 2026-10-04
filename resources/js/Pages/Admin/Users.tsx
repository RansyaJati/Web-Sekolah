import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useEffect, useState } from 'react';
import { adminApi } from '@/services/adminApi';

interface UserRow {
    id: number;
    name: string;
    email: string;
    role: string | null;
    is_active: boolean;
}

function roleBadge(role: string | null): string {
    switch (role) {
        case 'super_admin':
        case 'Super Admin':
            return 'Super Admin';
        case 'editor':
        case 'Editor':
            return 'Editor';
        case 'admin_ppdb':
        case 'Admin PPDB':
            return 'Admin PPDB';
        case 'admin_bkk':
        case 'Admin BKK':
            return 'Admin BKK';
        case 'admin_blud':
        case 'Admin BLUD':
            return 'Admin BLUD';
        default:
            return role ?? '–';
    }
}

function roleAccess(role: string | null): string {
    switch (role) {
        case 'super_admin':
        case 'Super Admin':
            return 'Seluruh Akses Penuh';
        case 'editor':
        case 'Editor':
            return 'Berita, Prestasi, Jurusan, Alumni';
        case 'admin_ppdb':
        case 'Admin PPDB':
            return 'Modul PPDB (Jalur, Jadwal, Syarat)';
        case 'admin_bkk':
        case 'Admin BKK':
            return 'Modul PKL, Lowongan, Mitra';
        case 'admin_blud':
        case 'Admin BLUD':
            return 'Modul Produk & Jasa BLUD';
        default:
            return '–';
    }
}

export default function AdminUsers() {
    const [users, setUsers] = useState<UserRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        adminApi
            .get<UserRow[]>('/api/users')
            .then((data) => {
                if (!cancelled) setUsers(Array.isArray(data) ? data : []);
            })
            .catch((err: unknown) => {
                if (!cancelled) setError(err instanceof Error ? err.message : 'Gagal memuat pengguna.');
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <AdminLayout
            title="Kelola Pengguna & Hak Akses (Roles)"
            subtitle="Manajemen akun pengelola konten berdasarkan divisi tugas di SMK Negeri 1 Cimahi."
        >
            {error ? (
                <div className="bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-xl p-4">
                    {error} Hanya Super Admin yang dapat melihat daftar pengguna.
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <table className="w-full text-left text-xs">
                        <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-200 uppercase tracking-wider text-[10px]">
                            <tr>
                                <th className="px-6 py-3.5">Nama Pengguna</th>
                                <th className="px-6 py-3.5">Email</th>
                                <th className="px-6 py-3.5">Peran (Role)</th>
                                <th className="px-6 py-3.5">Hak Akses Modul</th>
                                <th className="px-6 py-3.5">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">Memuat pengguna...</td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">Belum ada pengguna.</td>
                                </tr>
                            ) : (
                                users.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-galaxy">{u.name}</td>
                                        <td className="px-6 py-4 text-gray-500 font-mono text-[11px]">{u.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-sky/40 text-planetary">
                                                {roleBadge(u.role)}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{roleAccess(u.role)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${u.is_active ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                                {u.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </AdminLayout>
    );
}

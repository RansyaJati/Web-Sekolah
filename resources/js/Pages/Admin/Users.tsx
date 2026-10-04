import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useState } from 'react';

interface UserRoleItem {
    id: string;
    name: string;
    email: string;
    role: 'Super Admin' | 'Editor' | 'Admin PPDB' | 'Admin BKK' | 'Admin BLUD';
    status: 'Active' | 'Inactive';
}

const INITIAL_USERS: UserRoleItem[] = [
    { id: 'u-1', name: 'Administrator Utama', email: 'admin@smkn1cimahi.sch.id', role: 'Super Admin', status: 'Active' },
    { id: 'u-2', name: 'Humas & Berita', email: 'editor@smkn1cimahi.sch.id', role: 'Editor', status: 'Active' },
    { id: 'u-3', name: 'Panitia PPDB', email: 'ppdb@smkn1cimahi.sch.id', role: 'Admin PPDB', status: 'Active' },
    { id: 'u-4', name: 'Koordinator BKK & PKL', email: 'bkk@smkn1cimahi.sch.id', role: 'Admin BKK', status: 'Active' },
    { id: 'u-5', name: 'Pengelola BLUD', email: 'blud@smkn1cimahi.sch.id', role: 'Admin BLUD', status: 'Active' },
];

export default function AdminUsers() {
    const [users] = useState<UserRoleItem[]>(INITIAL_USERS);

    return (
        <AdminLayout
            title="Kelola Pengguna & Hak Akses (Roles)"
            subtitle="Manajemen akun pengelola konten berdasarkan divisi tugas di SMK Negeri 1 Cimahi."
        >
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
                        {users.map((u) => (
                            <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-bold text-galaxy">{u.name}</td>
                                <td className="px-6 py-4 text-gray-500 font-mono text-[11px]">{u.email}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-sky/40 text-planetary">
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">
                                    {u.role === 'Super Admin' && 'Seluruh Akses Penuh'}
                                    {u.role === 'Editor' && 'Berita, Prestasi, Jurusan, Alumni'}
                                    {u.role === 'Admin PPDB' && 'Modul PPDB (Jalur, Jadwal, Syarat)'}
                                    {u.role === 'Admin BKK' && 'Modul PKL, Lowongan, Mitra'}
                                    {u.role === 'Admin BLUD' && 'Modul Produk & Jasa BLUD'}
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-50 text-green-700">
                                        {u.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
}

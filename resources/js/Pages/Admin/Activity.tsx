import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { INITIAL_ACTIVITIES } from '@/data/adminContent';

export default function AdminActivity() {
    return (
        <AdminLayout
            title="Activity Audit Log"
            subtitle="Catatan riwayat perubahan data dan aktivitas penting di sistem Admin Panel."
        >
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
                        {INITIAL_ACTIVITIES.map((act) => (
                            <tr key={act.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-gray-400 font-mono text-[11px] whitespace-nowrap">{act.timestamp}</td>
                                <td className="px-6 py-4 font-semibold text-galaxy">{act.user}</td>
                                <td className="px-6 py-4 text-gray-700">{act.action}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-0.5 rounded font-semibold text-[10px] bg-sky/30 text-planetary">
                                        {act.module}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-500">{act.target}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-green-50 text-green-700">
                                        {act.status}
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

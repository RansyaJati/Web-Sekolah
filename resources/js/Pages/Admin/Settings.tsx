import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useEffect, useState } from 'react';
import { adminApi } from '@/services/adminApi';

export default function AdminSettings() {
    const [schoolName, setSchoolName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        let cancelled = false;
        adminApi
            .get<{ school_name?: string; phone?: string; email?: string; address?: string } | null>('/api/settings/site_profile')
            .then((data) => {
                if (cancelled || !data) return;
                if (data.school_name) setSchoolName(data.school_name);
                if (data.phone) setPhone(data.phone);
                if (data.email) setEmail(data.email);
                if (data.address) setAddress(data.address);
            })
            .catch((err: unknown) => {
                // 404 = belum diatur, gunakan default tampilan.
                if (err instanceof Error && !err.message.includes('404')) {
                    if (!cancelled) setError(err.message);
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setError('');
        try {
            await adminApi.post('/api/settings/site_profile', {
                value: { school_name: schoolName, phone, email, address },
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 2500);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Gagal menyimpan.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <AdminLayout
            title="Pengaturan Website Sekolah"
            subtitle="Informasi kontak umum, media sosial resmi, dan konfigurasi umum website SMKN 1 Cimahi."
        >
            {saved && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-xs rounded-xl flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Pengaturan sekolah berhasil diperbarui!</span>
                </div>
            )}

            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl">{error}</div>
            )}

            {loading ? (
                <div className="bg-white p-6 rounded-xl border border-gray-200 max-w-3xl text-xs text-gray-400 text-center">
                    Memuat pengaturan...
                </div>
            ) : (
                <form onSubmit={handleSave} className="bg-white p-6 rounded-xl border border-gray-200 space-y-5 max-w-3xl shadow-sm">
                    <h3 className="font-bold text-sm text-galaxy border-b border-gray-100 pb-3">Profil & Kontak Institusi</h3>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Resmi Sekolah</label>
                        <input
                            type="text"
                            required
                            value={schoolName}
                            onChange={(e) => setSchoolName(e.target.value)}
                            className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Telepon Sekolah</label>
                            <input
                                type="text"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Email Resmi</label>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Alamat Lengkap</label>
                        <textarea
                            rows={3}
                            required
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full text-xs px-3.5 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                        />
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 bg-planetary hover:bg-galaxy text-white text-xs font-semibold rounded-lg shadow-sm transition-colors disabled:opacity-50"
                        >
                            {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
                        </button>
                    </div>
                </form>
            )}
        </AdminLayout>
    );
}

import { useState, useEffect } from 'react';
import { adminAuthService, AdminUser } from '@/services/admin/adminAuthService';

interface AdminTopbarProps {
    onToggleSidebar: () => void;
}

export default function AdminTopbar({ onToggleSidebar }: AdminTopbarProps) {
    const [user, setUser] = useState<AdminUser | null>(null);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        setUser(adminAuthService.getUser());
    }, []);

    const handleLogout = () => {
        adminAuthService.logout();
        window.location.href = '/admin/login';
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
                <button
                    onClick={onToggleSidebar}
                    className="p-2 text-gray-500 hover:text-galaxy hover:bg-gray-100 rounded-lg lg:hidden"
                    aria-label="Toggle menu"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400">
                    <span className="font-medium text-galaxy">SMK Negeri 1 Cimahi</span>
                    <span>/</span>
                    <span>Admin Control Center</span>
                </div>
            </div>

            <div className="flex items-center gap-3">
                {/* Status indicator */}
                <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-green-50 border border-green-200 text-green-700 text-[11px] font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span>Sistem Aktif</span>
                </div>

                {/* Profile menu */}
                <div className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center gap-3 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-galaxy text-white flex items-center justify-center text-xs font-bold">
                            {user?.name ? user.name.charAt(0) : 'A'}
                        </div>
                        <div className="text-left hidden sm:block">
                            <p className="text-xs font-semibold text-galaxy leading-tight">{user?.name || 'Admin'}</p>
                            <p className="text-[10px] text-gray-500 leading-tight">{user?.role || 'Super Admin'}</p>
                        </div>
                        <svg className="w-3.5 h-3.5 text-gray-400 hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {dropdownOpen && (
                        <div
                            onMouseLeave={() => setDropdownOpen(false)}
                            className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-1.5 text-xs text-gray-700 z-50 animate-in fade-in slide-in-from-top-1"
                        >
                            <div className="px-4 py-2 border-b border-gray-100">
                                <p className="font-medium text-galaxy">{user?.name}</p>
                                <p className="text-gray-400 text-[10px] truncate">{user?.email}</p>
                            </div>
                            <a href="/admin/settings" className="block px-4 py-2 hover:bg-gray-50 text-gray-600">
                                Pengaturan Akun
                            </a>
                            <a href="/admin/activity" className="block px-4 py-2 hover:bg-gray-50 text-gray-600">
                                Log Aktivitas
                            </a>
                            <div className="border-t border-gray-100 my-1" />
                            <button
                                onClick={handleLogout}
                                className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 font-medium"
                            >
                                Keluar (Logout)
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

import { Head } from '@inertiajs/react';
import { PropsWithChildren, useState } from 'react';
import AdminSidebar from '@/Components/Admin/AdminSidebar';
import AdminTopbar from '@/Components/Admin/AdminTopbar';

interface AdminLayoutProps extends PropsWithChildren {
    title: string;
    subtitle?: string;
    action?: React.ReactNode;
}

export default function AdminLayout({ title, subtitle, action, children }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 flex text-gray-900 font-sans antialiased">
            <Head title={`${title} - Admin Panel SMKN 1 Cimahi`} />

            {/* Sidebar */}
            <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            {/* Main Area */}
            <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
                <AdminTopbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

                <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                    {/* Page Header */}
                    <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="font-display text-2xl sm:text-3xl font-bold text-galaxy">
                                {title}
                            </h1>
                            {subtitle && (
                                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                        {action && <div className="shrink-0">{action}</div>}
                    </div>

                    {/* Page Content */}
                    <div>{children}</div>
                </main>
            </div>
        </div>
    );
}

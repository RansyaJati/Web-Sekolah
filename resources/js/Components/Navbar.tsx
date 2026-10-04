import { Link } from '@inertiajs/react';
import { useState } from 'react';

const NAV_LINKS = [
    { href: '/', label: 'Beranda' },
    { href: '/ppdb', label: 'PPDB' },
    { href: '/produk-unggulan', label: 'Produk Unggulan' },
    { href: '/career-center', label: 'PKL & Career Center' },
];

interface NavbarProps {
    currentPath?: string;
}

export default function Navbar({ currentPath = '/' }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    const isActive = (href: string) => {
        if (href === '/') return currentPath === '/';
        return currentPath.startsWith(href);
    };

    return (
        <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
            <div className="max-w-container mx-auto px-6 lg:px-12 h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2.5 shrink-0">
                    <img
                        src="/images/logosmk.png"
                        alt="Logo SMK Negeri 1 Cimahi"
                        className="w-9 h-9 object-contain"
                    />
                    <span className="text-[15px] font-bold text-galaxy">
                        SMK Negeri 1 Cimahi
                    </span>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-galaxy">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-lg transition-colors ${
                                isActive(link.href)
                                    ? 'text-planetary bg-sky/30'
                                    : 'hover:text-planetary hover:bg-gray-50'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Hamburger */}
                <button
                    onClick={() => setMobileOpen(!mobileOpen)}
                    className="lg:hidden p-2 text-galaxy"
                    aria-label="Menu navigasi"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {mobileOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Nav */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-100 ${
                    mobileOpen ? 'max-h-[400px]' : 'max-h-0'
                }`}
            >
                <div className="px-6 py-2">
                    {NAV_LINKS.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block py-3 text-sm border-b border-gray-50 transition-colors ${
                                isActive(link.href)
                                    ? 'text-planetary font-semibold'
                                    : 'text-gray-700'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </header>
    );
}

import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { cmsService, type ProgramDTO } from '@/services/cms';

const NAV_LINKS = [
    { href: '/', label: 'Beranda' },
    { href: '/tentang', label: 'Tentang' },
    { href: '/informasi', label: 'Informasi' },
    { href: '/ppdb', label: 'PPDB' },
    { href: '/produk-unggulan', label: 'Produk Unggulan' },
    { href: '/career-center', label: 'PKL & Career Center' },
    { href: '/kontak', label: 'Kontak' },
];

interface NavbarProps {
    currentPath?: string;
}

export default function Navbar({ currentPath = '/' }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [programOpen, setProgramOpen] = useState(false);
    const [mobileProgramOpen, setMobileProgramOpen] = useState(false);
    const [programs, setPrograms] = useState<ProgramDTO[]>([]);

    // Dynamic dropdown: program list always mirrors the database.
    useEffect(() => {
        let cancelled = false;
        cmsService
            .getPrograms({ active: true, limit: 24 })
            .then((data) => {
                if (!cancelled) setPrograms(data);
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, []);

    const isActive = (href: string) => {
        if (href === '/') return currentPath === '/';
        return currentPath.startsWith(href);
    };
    const programActive = currentPath.startsWith('/program-keahlian');

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
                <nav className="hidden lg:flex items-center gap-0.5 text-sm font-medium text-galaxy">
                    {NAV_LINKS.slice(0, 2).map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-3 py-2 rounded-lg transition-colors ${
                                isActive(link.href)
                                    ? 'text-planetary bg-sky/30'
                                    : 'hover:text-planetary hover:bg-gray-50'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}

                    {/* Program Keahlian dropdown */}
                    <div
                        className="relative"
                        onMouseEnter={() => setProgramOpen(true)}
                        onMouseLeave={() => setProgramOpen(false)}
                    >
                        <Link
                            href="/program-keahlian"
                            className={`px-3 py-2 rounded-lg transition-colors inline-flex items-center gap-1 ${
                                programActive
                                    ? 'text-planetary bg-sky/30'
                                    : 'hover:text-planetary hover:bg-gray-50'
                            }`}
                        >
                            Program Keahlian
                            <svg className={`w-3.5 h-3.5 transition-transform ${programOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </Link>
                        {programOpen && (
                            <div className="absolute left-0 top-full pt-2 w-72">
                                <div className="bg-white rounded-xl shadow-xl border border-gray-100 py-2 max-h-[70vh] overflow-y-auto">
                                    <Link
                                        href="/program-keahlian"
                                        className="block px-4 py-2.5 text-sm font-semibold text-planetary hover:bg-sky/20 transition-colors"
                                    >
                                        Semua Program Keahlian
                                    </Link>
                                    <div className="border-t border-gray-100 my-1" />
                                    {programs.map((p) => (
                                        <Link
                                            key={p.id}
                                            href={`/program-keahlian/${p.id}`}
                                            className="block px-4 py-2.5 text-sm text-gray-700 hover:text-planetary hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="font-medium">{p.name}</span>
                                            <span className="block text-[11px] text-gray-400">{p.code} • {p.duration}</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {NAV_LINKS.slice(2).map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-3 py-2 rounded-lg transition-colors ${
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
                    mobileOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0'
                }`}
            >
                <div className="px-6 py-2">
                    {NAV_LINKS.slice(0, 2).map((link) => (
                        <MobileLink key={link.href} href={link.href} label={link.label} active={isActive(link.href)} onNavigate={() => setMobileOpen(false)} />
                    ))}

                    {/* Mobile program accordion */}
                    <button
                        onClick={() => setMobileProgramOpen(!mobileProgramOpen)}
                        className={`w-full flex items-center justify-between py-3 text-sm border-b border-gray-50 ${
                            programActive ? 'text-planetary font-semibold' : 'text-gray-700'
                        }`}
                        aria-expanded={mobileProgramOpen}
                    >
                        <span>Program Keahlian</span>
                        <svg className={`w-4 h-4 transition-transform ${mobileProgramOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <div className={`overflow-hidden transition-all ${mobileProgramOpen ? 'max-h-96 overflow-y-auto' : 'max-h-0'}`}>
                        <Link
                            href="/program-keahlian"
                            onClick={() => setMobileOpen(false)}
                            className="block py-2.5 pl-4 text-sm font-semibold text-planetary"
                        >
                            Semua Program Keahlian
                        </Link>
                        {programs.map((p) => (
                            <Link
                                key={p.id}
                                href={`/program-keahlian/${p.id}`}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2.5 pl-4 text-sm text-gray-600"
                            >
                                {p.name}
                            </Link>
                        ))}
                    </div>

                    {NAV_LINKS.slice(2).map((link) => (
                        <MobileLink key={link.href} href={link.href} label={link.label} active={isActive(link.href)} onNavigate={() => setMobileOpen(false)} />
                    ))}
                </div>
            </div>
        </header>
    );
}

function MobileLink({ href, label, active, onNavigate }: { href: string; label: string; active: boolean; onNavigate: () => void }) {
    return (
        <Link
            href={href}
            onClick={onNavigate}
            className={`block py-3 text-sm border-b border-gray-50 transition-colors ${
                active ? 'text-planetary font-semibold' : 'text-gray-700'
            }`}
        >
            {label}
        </Link>
    );
}

import { Link } from '@inertiajs/react';

const QUICK_LINKS = [
    { href: '/', label: 'Beranda' },
    { href: '/ppdb', label: 'PPDB' },
    { href: '/produk-unggulan', label: 'Produk Unggulan' },
    { href: '/career-center', label: 'PKL & Career Center' },
];

export default function Footer() {
    return (
        <footer className="bg-galaxy text-white">
            <div className="max-w-container mx-auto px-6 lg:px-12 py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {/* Brand */}
                <div>
                    <div className="flex items-center gap-2.5 mb-4">
                        <img
                            src="/images/logosmk.png"
                            alt="Logo SMKN 1 Cimahi"
                            className="w-10 h-10 object-contain brightness-0 invert"
                        />
                        <p className="text-lg font-bold leading-tight">
                            SMKN 1<br />Cimahi
                        </p>
                    </div>
                    <p className="text-sm leading-relaxed text-white/70 max-w-[260px]">
                        Menghadirkan pendidikan vokasi unggulan yang menghasilkan SDM bermutu, kompeten, dan berdaya saing tinggi di tingkat nasional maupun internasional.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-sm font-semibold mb-5">Tautan Cepat</h4>
                    <ul className="space-y-2.5 text-sm text-white/80">
                        {QUICK_LINKS.map((l) => (
                            <li key={l.label}>
                                <Link href={l.href} className="hover:text-white transition-colors">
                                    {l.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-sm font-semibold mb-5">Kontak Kami</h4>
                    <ul className="space-y-3 text-sm leading-relaxed text-white/80">
                        <li className="flex gap-2.5">
                            <svg className="w-4 h-4 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span>Jl. Mahar Martanegara No.48, Utama, Kec. Cimahi Sel., Kota Cimahi, Jawa Barat 40533</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 6V3z" />
                            </svg>
                            <span>(022) 6629683</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span>info@smkn1cimahi.sch.id</span>
                        </li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h4 className="text-sm font-semibold mb-5">Media Sosial</h4>
                    <div className="flex gap-2.5">
                        {[
                            { label: 'Facebook', icon: 'M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2-.1-2 0-3.4 1.2-3.4 3.5V11H8.5v3H11v7h2.5z' },
                            { label: 'YouTube', icon: 'M21 8.2a2.5 2.5 0 00-1.8-1.7C17.7 6 12 6 12 6s-5.7 0-7.2.5A2.5 2.5 0 003 8.2 26 26 0 002.6 12 26 26 0 003 15.8a2.5 2.5 0 001.8 1.7c1.5.5 7.2.5 7.2.5s5.7 0 7.2-.5a2.5 2.5 0 001.8-1.7A26 26 0 0021.4 12 26 26 0 0021 8.2zM10 15V9l5.2 3L10 15z' },
                            { label: 'Instagram', icon: 'M12 8.8A3.2 3.2 0 1012 15.2 3.2 3.2 0 0012 8.8zm0-2.1a5.3 5.3 0 110 10.6 5.3 5.3 0 010-10.6zm6.8-.3a1.2 1.2 0 11-2.4 0 1.2 1.2 0 012.4 0zM12 4.2c-2.5 0-2.9 0-3.9.1a5.2 5.2 0 00-1.7.3 3.5 3.5 0 00-2 2 5.2 5.2 0 00-.3 1.7c-.1 1-.1 1.4-.1 3.9s0 2.9.1 3.9a5.2 5.2 0 00.3 1.7 3.5 3.5 0 002 2 5.2 5.2 0 001.7.3c1 .1 1.4.1 3.9.1s2.9 0 3.9-.1a5.2 5.2 0 001.7-.3 3.5 3.5 0 002-2 5.2 5.2 0 00.3-1.7c.1-1 .1-1.4.1-3.9s0-2.9-.1-3.9a5.2 5.2 0 00-.3-1.7 3.5 3.5 0 00-2-2 5.2 5.2 0 00-1.7-.3c-1-.1-1.4-.1-3.9-.1z' },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href="#"
                                aria-label={social.label}
                                className="w-9 h-9 rounded-md bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                            >
                                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                                    <path d={social.icon} />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="max-w-container mx-auto px-6 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-2">
                    <div>
                        &copy; {new Date().getFullYear()} SMK Negeri 1 Cimahi. Hak Cipta Dilindungi.
                    </div>
                    <div>
                        <Link href="/admin/login" className="hover:text-white/80 transition-colors">
                            Admin Portal
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

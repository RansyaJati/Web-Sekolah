import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeader from '@/Components/SectionHeader';
import Reveal from '@/Components/Reveal';
import { useEffect, useState } from 'react';
import { cmsService, type SiteProfile } from '@/services/cms';

const FALLBACK_PROFILE: Required<SiteProfile> = {
    school_name: 'SMK Negeri 1 Cimahi',
    phone: '(022) 6629683',
    email: 'info@smkn1cimahi.sch.id',
    address: 'Jl. Mahar Martanegara No.48, Utama, Kec. Cimahi Selatan, Kota Cimahi, Jawa Barat 40533',
};

const JAM_LAYANAN = [
    { hari: 'Senin – Jumat', jam: '07.00 – 15.30 WIB' },
    { hari: 'Sabtu', jam: '08.00 – 12.00 WIB' },
    { hari: 'Minggu & Libur Nasional', jam: 'Tutup' },
];

export default function Kontak() {
    const [profil, setProfil] = useState<Required<SiteProfile>>(FALLBACK_PROFILE);
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [pesan, setPesan] = useState('');
    const [sent, setSent] = useState(false);

    useEffect(() => {
        let cancelled = false;
        cmsService
            .getSettingsBatch<{ site_profile: SiteProfile }>(['site_profile'])
            .then((data) => {
                if (cancelled || !data.site_profile) return;
                setProfil({ ...FALLBACK_PROFILE, ...data.site_profile });
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Pesan dari ${nama} via Website Sekolah`);
        const body = encodeURIComponent(`Nama: ${nama}\nEmail: ${email}\n\n${pesan}`);
        window.location.href = `mailto:${profil.email}?subject=${subject}&body=${body}`;
        setSent(true);
        setTimeout(() => setSent(false), 4000);
    };

    const mapQuery = encodeURIComponent(profil.address);

    return (
        <PublicLayout
            title="Kontak - SMK Negeri 1 Cimahi"
            description="Hubungi SMKN 1 Cimahi: alamat, telepon, email, jam layanan, dan formulir pesan."
        >
            {/* HERO */}
            <section className="relative bg-galaxy overflow-hidden">
                <img
                    src="/images/smkn.jpg"
                    alt="Gedung SMK Negeri 1 Cimahi"
                    fetchPriority="low"
                    decoding="async"
                    className="absolute inset-0 w-full h-full object-cover anim-hero-settle"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-galaxy/95 via-galaxy/60 to-galaxy/5" />
                <div className="absolute inset-0 bg-gradient-to-t from-galaxy/90 via-transparent to-transparent" />
                <div className="relative max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-24">
                    <div className="anim-fade-up">
                    <span className="inline-block text-sm font-medium text-venus mb-4">Hubungi Kami</span>
                    <h1 className="font-display text-white text-4xl sm:text-5xl leading-[1.1]">
                        Kontak Sekolah
                    </h1>
                    <p className="mt-4 text-white/70 text-base max-w-lg leading-relaxed">
                        Ada pertanyaan seputar PPDB, program, atau kerja sama? Silakan hubungi kami.
                    </p>
                    </div>
                </div>
            </section>

            {/* CONTENT */}
            <section className="bg-milky-way py-16 lg:py-20">
                <div className="max-w-container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-8 items-start">
                    {/* Info + jam layanan */}
                    <Reveal className="space-y-6">
                        <div className="bg-white rounded-2xl border border-gray-200 p-7">
                            <SectionHeader title={profil.school_name} centered={false} />
                            <ul className="mt-5 space-y-4 text-sm text-gray-600">
                                <li className="flex gap-3">
                                    <span className="w-9 h-9 shrink-0 rounded-lg bg-sky/30 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-planetary" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <span className="leading-relaxed">{profil.address}</span>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <span className="w-9 h-9 shrink-0 rounded-lg bg-sky/30 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-planetary" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 6V3z" />
                                        </svg>
                                    </span>
                                    <a href={`tel:${profil.phone.replace(/[^+\d]/g, '')}`} className="hover:text-planetary transition-colors font-medium">
                                        {profil.phone}
                                    </a>
                                </li>
                                <li className="flex gap-3 items-center">
                                    <span className="w-9 h-9 shrink-0 rounded-lg bg-sky/30 flex items-center justify-center">
                                        <svg className="w-4 h-4 text-planetary" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </span>
                                    <a href={`mailto:${profil.email}`} className="hover:text-planetary transition-colors font-medium">
                                        {profil.email}
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white rounded-2xl border border-gray-200 p-7">
                            <h3 className="font-bold text-galaxy">Jam Layanan</h3>
                            <ul className="mt-4 divide-y divide-gray-100">
                                {JAM_LAYANAN.map((j) => (
                                    <li key={j.hari} className="py-3 flex items-center justify-between text-sm">
                                        <span className="text-gray-600">{j.hari}</span>
                                        <span className="font-semibold text-galaxy">{j.jam}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Map */}
                        <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                            <iframe
                                title="Peta lokasi SMKN 1 Cimahi"
                                src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
                                loading="lazy"
                                className="w-full h-72"
                            />
                        </div>
                    </Reveal>

                    {/* Form */}
                    <Reveal delay={120} className="bg-white rounded-2xl border border-gray-200 p-7 lg:p-9 lg:sticky lg:top-24">
                        <h3 className="font-bold text-galaxy text-lg">Kirim Pesan</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            Pesan akan dibuka melalui aplikasi email Anda ke {profil.email}.
                        </p>
                        {sent && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 text-xs rounded-lg">
                                Aplikasi email Anda telah dibuka. Terima kasih telah menghubungi kami!
                            </div>
                        )}
                        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                            <div>
                                <label htmlFor="kontak-nama" className="block text-xs font-semibold text-gray-700 mb-1">Nama Lengkap</label>
                                <input
                                    id="kontak-nama"
                                    type="text"
                                    required
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    placeholder="Nama Anda"
                                    className="w-full text-sm px-4 py-3 rounded-[10px] border border-gray-200 focus:outline-none focus:border-planetary focus:ring-1 focus:ring-planetary/30"
                                />
                            </div>
                            <div>
                                <label htmlFor="kontak-email" className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                                <input
                                    id="kontak-email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="nama@email.com"
                                    className="w-full text-sm px-4 py-3 rounded-[10px] border border-gray-200 focus:outline-none focus:border-planetary focus:ring-1 focus:ring-planetary/30"
                                />
                            </div>
                            <div>
                                <label htmlFor="kontak-pesan" className="block text-xs font-semibold text-gray-700 mb-1">Pesan</label>
                                <textarea
                                    id="kontak-pesan"
                                    required
                                    rows={5}
                                    value={pesan}
                                    onChange={(e) => setPesan(e.target.value)}
                                    placeholder="Tulis pertanyaan atau keperluan Anda..."
                                    className="w-full text-sm px-4 py-3 rounded-[10px] border border-gray-200 focus:outline-none focus:border-planetary focus:ring-1 focus:ring-planetary/30"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-3.5 bg-planetary hover:bg-galaxy text-white text-sm font-semibold rounded-[10px] transition-colors"
                            >
                                Kirim via Email
                            </button>
                        </form>
                    </Reveal>
                </div>
            </section>
        </PublicLayout>
    );
}

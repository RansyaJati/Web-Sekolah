import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Welcome({ auth }: PageProps) {
    return (
        <>
            <Head title="SMA Nusantara - Sekolah Menengah Atas Terbaik" />

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-blue-700">SMA Nusantara</span>
                        </div>

                        {/* Nav Links */}
                        <div className="hidden md:flex items-center gap-6">
                            <a href="#beranda" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Beranda</a>
                            <a href="#tentang" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Tentang</a>
                            <a href="#program" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Program</a>
                            <a href="#berita" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Berita</a>
                            <a href="#galeri" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Galeri</a>
                            <a href="#kontak" className="text-gray-600 hover:text-blue-700 font-medium transition-colors">Kontak</a>
                        </div>

                        {/* Auth */}
                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-gray-600 hover:text-blue-700 font-medium transition-colors"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="bg-blue-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-800 transition-colors"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="beranda" className="pt-16 min-h-screen bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 flex items-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-white">
                            <span className="inline-block bg-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
                                Sekolah Unggulan Terpercaya
                            </span>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                                Meraih Masa Depan<br />
                                <span className="text-yellow-300">Bersama Kami</span>
                            </h1>
                            <p className="text-blue-100 text-lg mb-8 max-w-lg">
                                SMA Nusantara hadir untuk mencetak generasi unggul yang berkarakter, berprestasi, dan siap menghadapi tantangan masa depan.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <a
                                    href="#tentang"
                                    className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-yellow-300 transition-colors shadow-lg"
                                >
                                    Pelajari Lebih Lanjut
                                </a>
                                <a
                                    href="#program"
                                    className="bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors"
                                >
                                    Program Kami
                                </a>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/20">
                                <div>
                                    <p className="text-3xl font-bold text-white">25+</p>
                                    <p className="text-blue-200 text-sm mt-1">Tahun Berdiri</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">1500+</p>
                                    <p className="text-blue-200 text-sm mt-1">Siswa Aktif</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white">98%</p>
                                    <p className="text-blue-200 text-sm mt-1">Tingkat Lulus</p>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <div className="relative">
                                <div className="w-full h-96 bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <svg className="w-32 h-32 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <p className="text-blue-200 font-medium">Gedung SMA Nusantara</p>
                                    </div>
                                </div>
                                <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg">
                                    <svg className="w-10 h-10 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tentang Section */}
            <section id="tentang" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Tentang Kami</span>
                        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">Mengenal SMA Nusantara</h2>
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                            Kami berkomitmen untuk memberikan pendidikan berkualitas yang membentuk karakter dan kompetensi siswa.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                ),
                                title: 'Visi Kami',
                                desc: 'Menjadi sekolah unggulan yang mencetak generasi berkarakter kuat, berilmu tinggi, dan berwawasan global.'
                            },
                            {
                                icon: (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                ),
                                title: 'Misi Kami',
                                desc: 'Menyelenggarakan pembelajaran inovatif, membangun lingkungan belajar yang kondusif, dan mengembangkan potensi setiap siswa.'
                            },
                            {
                                icon: (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                ),
                                title: 'Nilai Kami',
                                desc: 'Integritas, kedisiplinan, kreativitas, dan semangat kolaborasi menjadi pondasi utama dalam setiap aktivitas belajar mengajar.'
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                                    <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {item.icon}
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Program Unggulan */}
            <section id="program" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Program</span>
                        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">Program Unggulan</h2>
                        <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
                            Berbagai program dirancang untuk mengembangkan potensi akademik dan non-akademik siswa.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { color: 'bg-blue-500', label: 'IPA', title: 'Jurusan IPA', desc: 'Program ilmu pengetahuan alam dengan laboratorium modern dan pengajar berpengalaman.' },
                            { color: 'bg-green-500', label: 'IPS', title: 'Jurusan IPS', desc: 'Program ilmu pengetahuan sosial yang membekali siswa dengan pemahaman mendalam tentang masyarakat.' },
                            { color: 'bg-purple-500', label: 'BHS', title: 'Jurusan Bahasa', desc: 'Program bahasa dan sastra yang mengembangkan kemampuan komunikasi lintas budaya.' },
                            { color: 'bg-orange-500', label: 'EXT', title: 'Ekstrakurikuler', desc: 'Lebih dari 20 kegiatan ekstrakurikuler mulai dari olahraga, seni, hingga teknologi.' },
                            { color: 'bg-red-500', label: 'OSN', title: 'Olimpiade Sains', desc: 'Bimbingan intensif bagi siswa berprestasi untuk mengikuti olimpiade tingkat nasional dan internasional.' },
                            { color: 'bg-teal-500', label: 'BK', title: 'Bimbingan Karir', desc: 'Program konseling dan persiapan perguruan tinggi untuk membantu siswa meraih cita-cita.' },
                        ].map((prog, i) => (
                            <div key={i} className="group bg-gray-50 rounded-2xl p-6 hover:bg-blue-700 transition-all duration-300 cursor-pointer border border-gray-100">
                                <span className={`inline-block ${prog.color} text-white text-xs font-bold px-3 py-1 rounded-full mb-4 group-hover:bg-white group-hover:text-blue-700 transition-colors`}>
                                    {prog.label}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">{prog.title}</h3>
                                <p className="text-gray-500 group-hover:text-blue-100 text-sm leading-relaxed transition-colors">{prog.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Berita Terbaru */}
            <section id="berita" className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-12">
                        <div>
                            <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Berita</span>
                            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">Berita Terbaru</h2>
                        </div>
                        <a href="#" className="mt-4 sm:mt-0 text-blue-700 font-medium hover:underline">Lihat Semua &rarr;</a>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            {
                                category: 'Prestasi',
                                date: '20 Sep 2026',
                                title: 'Siswa SMA Nusantara Raih Medali Emas OSN Matematika',
                                desc: 'Tiga siswa terbaik kami berhasil meraih medali emas pada Olimpiade Sains Nasional bidang Matematika tahun ini.',
                                categoryColor: 'bg-yellow-100 text-yellow-700',
                            },
                            {
                                category: 'Kegiatan',
                                date: '15 Sep 2026',
                                title: 'Pelaksanaan Hari Olahraga Nasional di SMA Nusantara',
                                desc: 'Memperingati Hari Olahraga Nasional, seluruh warga sekolah berpartisipasi dalam berbagai lomba olahraga yang meriah.',
                                categoryColor: 'bg-green-100 text-green-700',
                            },
                            {
                                category: 'Pengumuman',
                                date: '10 Sep 2026',
                                title: 'Pendaftaran Peserta Didik Baru Tahun Ajaran 2027',
                                desc: 'Pendaftaran peserta didik baru tahun ajaran 2026/2027 telah dibuka. Segera daftarkan diri Anda dan raih kesempatan terbaik.',
                                categoryColor: 'bg-blue-100 text-blue-700',
                            },
                        ].map((berita, i) => (
                            <article key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                                <div className="h-44 bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                                    <svg className="w-16 h-16 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                    </svg>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${berita.categoryColor}`}>
                                            {berita.category}
                                        </span>
                                        <span className="text-gray-400 text-xs">{berita.date}</span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors leading-snug">
                                        {berita.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed">{berita.desc}</p>
                                    <a href="#" className="inline-block mt-4 text-blue-700 text-sm font-medium hover:underline">
                                        Baca Selengkapnya &rarr;
                                    </a>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Galeri */}
            <section id="galeri" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="text-blue-700 font-semibold text-sm uppercase tracking-wide">Galeri</span>
                        <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900">Galeri Kegiatan</h2>
                        <p className="mt-4 text-gray-500 max-w-xl mx-auto">
                            Sekilas aktivitas dan momen berharga di SMA Nusantara.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {[
                            { color: 'from-blue-400 to-blue-600', label: 'Upacara Bendera' },
                            { color: 'from-purple-400 to-purple-600', label: 'Pentas Seni' },
                            { color: 'from-green-400 to-green-600', label: 'Kegiatan Olahraga' },
                            { color: 'from-orange-400 to-orange-600', label: 'Laboratorium IPA' },
                            { color: 'from-red-400 to-red-600', label: 'Pramuka' },
                            { color: 'from-teal-400 to-teal-600', label: 'Study Tour' },
                            { color: 'from-indigo-400 to-indigo-600', label: 'Lomba Debat' },
                            { color: 'from-pink-400 to-pink-600', label: 'Wisuda Kelas XII' },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className={`bg-gradient-to-br ${item.color} rounded-xl aspect-square flex items-end p-4 cursor-pointer hover:opacity-90 transition-opacity`}
                            >
                                <span className="text-white text-sm font-medium bg-black/30 px-2 py-1 rounded-lg w-full text-center truncate">
                                    {item.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Kontak */}
            <section id="kontak" className="py-20 bg-blue-700">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div className="text-white">
                            <span className="text-blue-200 font-semibold text-sm uppercase tracking-wide">Kontak</span>
                            <h2 className="mt-2 text-3xl sm:text-4xl font-bold mb-6">Hubungi Kami</h2>
                            <p className="text-blue-100 mb-8 leading-relaxed">
                                Punya pertanyaan atau ingin tahu lebih lanjut tentang SMA Nusantara? Jangan ragu untuk menghubungi kami.
                            </p>

                            <div className="space-y-5">
                                {[
                                    {
                                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
                                        label: 'Alamat',
                                        value: 'Jl. Pendidikan No. 1, Kec. Maju, Kota Nusantara, 12345'
                                    },
                                    {
                                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
                                        label: 'Telepon',
                                        value: '(021) 1234-5678'
                                    },
                                    {
                                        icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
                                        label: 'Email',
                                        value: 'info@smanusantara.sch.id'
                                    },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                {item.icon}
                                            </svg>
                                        </div>
                                        <div>
                                            <p className="text-blue-200 text-sm">{item.label}</p>
                                            <p className="text-white font-medium">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Form Kontak */}
                        <div className="bg-white rounded-2xl p-8 shadow-xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Kirim Pesan</h3>
                            <form className="space-y-5">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Lengkap</label>
                                        <input
                                            type="text"
                                            placeholder="Nama Anda"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                                        <input
                                            type="email"
                                            placeholder="email@contoh.com"
                                            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Subjek</label>
                                    <input
                                        type="text"
                                        placeholder="Subjek pesan"
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Pesan</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tulis pesan Anda di sini..."
                                        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl hover:bg-blue-800 transition-colors"
                                >
                                    Kirim Pesan
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-gray-400 py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-10">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                    </svg>
                                </div>
                                <span className="text-white font-bold text-lg">SMA Nusantara</span>
                            </div>
                            <p className="text-sm leading-relaxed max-w-sm">
                                Mencetak generasi unggul, berkarakter, dan berwawasan luas untuk masa depan bangsa yang lebih gemilang.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Tautan Cepat</h4>
                            <ul className="space-y-2 text-sm">
                                {['Beranda', 'Tentang Kami', 'Program', 'Berita', 'Galeri', 'Kontak'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="hover:text-white transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-white font-semibold mb-4">Informasi</h4>
                            <ul className="space-y-2 text-sm">
                                {['Pendaftaran', 'Jadwal Pelajaran', 'Kalender Akademik', 'Pengumuman', 'PPDB Online'].map((link) => (
                                    <li key={link}>
                                        <a href="#" className="hover:text-white transition-colors">{link}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm">&copy; 2026 SMA Nusantara. Hak Cipta Dilindungi.</p>
                        <div className="flex gap-4 text-sm">
                            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
                            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

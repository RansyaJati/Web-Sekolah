import PublicLayout from '@/Layouts/PublicLayout';
import SectionHeader from '@/Components/SectionHeader';
import { useState, useEffect } from 'react';
import { cmsService, type ProductDTO } from '@/services/cms';
import { BLUD_INFO } from '@/data/products';

const PRODUCT_CATEGORIES = ['Semua', 'Teknologi', 'Elektronika', 'Multimedia', 'Jasa'];

export default function ProdukUnggulan() {
    const [activeCategory, setActiveCategory] = useState('Semua');
    const [products, setProducts] = useState<ProductDTO[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        cmsService
            .getProducts({ limit: 24 })
            .then((data) => {
                if (!cancelled) setProducts(data);
            })
            .catch(console.error)
            .finally(() => {
                if (!cancelled) setLoading(false);
            });
        return () => {
            cancelled = true;
        };
    }, []);

    const filteredProducts =
        activeCategory === 'Semua'
            ? products
            : products.filter((p) => p.category === activeCategory);

    return (
        <PublicLayout
            title="Produk Unggulan BLUD - SMK Negeri 1 Cimahi"
            description="Produk dan jasa unggulan SMKN 1 Cimahi yang dikelola melalui Badan Layanan Umum Daerah (BLUD)."
        >
            {/* ═══════════ HERO ═══════════ */}
            <section className="relative bg-galaxy overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-20 w-80 h-80 rounded-full bg-universe blur-3xl" />
                    <div className="absolute -bottom-10 left-10 w-96 h-96 rounded-full bg-planetary blur-3xl" />
                </div>
                <div className="relative max-w-container mx-auto px-6 lg:px-12 py-20 lg:py-28">
                    <div className="max-w-2xl">
                        <span className="inline-block text-sm font-medium text-venus mb-4">
                            Badan Layanan Umum Daerah
                        </span>
                        <h1 className="font-display text-white text-4xl sm:text-5xl lg:text-[56px] leading-[1.1]">
                            Produk Unggulan<br />SMKN 1 Cimahi
                        </h1>
                        <p className="mt-5 text-white/70 text-base lg:text-lg leading-relaxed max-w-lg">
                            {BLUD_INFO.description}
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══════════ KEUNGGULAN BLUD ═══════════ */}
            <section className="bg-white py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <SectionHeader
                        title="Mengapa Produk Kami?"
                        description="Keunggulan produk dan jasa dari teaching factory SMKN 1 Cimahi."
                    />
                    <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {BLUD_INFO.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-start gap-3 p-5 bg-milky-way rounded-lg">
                                <div className="w-8 h-8 rounded-full bg-sky/50 flex items-center justify-center shrink-0 mt-0.5">
                                    <svg className="w-4 h-4 text-planetary" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <p className="text-sm text-galaxy leading-relaxed font-medium">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════ KATALOG PRODUK ═══════════ */}
            <section className="bg-milky-way py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12">
                    <SectionHeader
                        title="Katalog Produk & Jasa"
                        description="Jelajahi berbagai produk dan jasa yang dihasilkan oleh siswa SMKN 1 Cimahi."
                    />

                    {/* Filter */}
                    <div className="mt-10 flex flex-wrap justify-center gap-2">
                        {PRODUCT_CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                                    activeCategory === cat
                                        ? 'bg-planetary text-white'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:border-planetary hover:text-planetary'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Product Grid */}
                    {loading ? (
                        <div className="mt-10 text-center py-12 text-gray-500">Memuat produk...</div>
                    ) : (
                    <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <article
                                key={product.id}
                                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                            >
                                {/* Product Image Placeholder */}
                                <div className="h-48 bg-gradient-to-br from-sky/30 to-venus/40 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
                                        <svg className="w-8 h-8 text-planetary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                        </svg>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <span className="inline-block text-xs font-medium text-planetary bg-sky/30 px-2.5 py-1 rounded-full mb-3">
                                        {product.category}
                                    </span>
                                    <h3 className="font-semibold text-galaxy text-base">{product.name}</h3>
                                    <p className="mt-2 text-sm text-gray-500 leading-relaxed line-clamp-3">
                                        {product.description}
                                    </p>

                                    {/* Features */}
                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {(product.features || []).slice(0, 3).map((f) => (
                                            <span key={f} className="text-xs text-gray-500 bg-gray-50 px-2 py-0.5 rounded">
                                                {f}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="mt-5 flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-sm font-medium text-galaxy">
                                            {product.price || 'Hubungi kami'}
                                        </span>
                                        <a
                                            href="#"
                                            className="text-sm font-semibold text-planetary hover:text-galaxy transition-colors flex items-center gap-1"
                                        >
                                            Detail
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                    )}

                    {filteredProducts.length === 0 && (
                        <div className="mt-10 text-center py-12">
                            <p className="text-gray-500 text-sm">Belum ada produk untuk kategori ini.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* ═══════════ CTA ═══════════ */}
            <section className="bg-planetary py-20 lg:py-24">
                <div className="max-w-container mx-auto px-6 lg:px-12 text-center">
                    <h2 className="font-display text-white text-3xl sm:text-4xl leading-[1.15]">
                        Tertarik dengan Produk Kami?
                    </h2>
                    <p className="mt-4 text-white/70 text-base max-w-lg mx-auto leading-relaxed">
                        Hubungi kami untuk informasi lebih lanjut mengenai produk dan jasa SMKN 1 Cimahi.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:info@smkn1cimahi.sch.id"
                            className="inline-flex items-center gap-2 bg-white text-planetary text-sm font-semibold px-8 py-3.5 rounded-[10px] hover:bg-milky-way transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                            Kirim Email
                        </a>
                        <a
                            href="tel:+62226629683"
                            className="inline-flex items-center gap-2 text-white text-sm font-semibold px-8 py-3.5 rounded-[10px] border border-white/30 hover:bg-white/10 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                            </svg>
                            Hubungi Kami
                        </a>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}

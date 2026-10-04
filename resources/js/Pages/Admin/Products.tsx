import AdminLayout from '@/Layouts/Admin/AdminLayout';
import { useState } from 'react';
import { PRODUCTS, Product } from '@/data/products';

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>(PRODUCTS);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('Teknologi');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const filtered = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        const newProduct: Product = {
            id: 'prod-' + Date.now(),
            name,
            category,
            description,
            price: price || 'Hubungi untuk penawaran',
            image: null,
            features: ['Standar Industri', 'Teaching Factory']
        };
        setProducts([newProduct, ...products]);
        setModalOpen(false);
        setName('');
        setDescription('');
        setPrice('');
    };

    return (
        <AdminLayout
            title="Kelola Produk Unggulan BLUD"
            subtitle="Katalog inovasi produk dan jasa teaching factory yang diproduksi oleh siswa SMKN 1 Cimahi."
            action={
                <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy transition-colors shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    <span>Tambah Produk BLUD</span>
                </button>
            }
        >
            <div className="bg-white p-4 rounded-xl border border-gray-200 mb-6 flex items-center justify-between">
                <div className="relative w-full sm:w-80">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Cari produk atau layanan..."
                        className="w-full text-xs pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary focus:ring-1 focus:ring-planetary"
                    />
                    <svg className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                        <div className="h-36 bg-gradient-to-br from-sky/30 to-venus/40 flex items-center justify-center">
                            <span className="font-display font-bold text-galaxy/40 text-lg">{item.category}</span>
                        </div>

                        <div className="p-5 flex-1 flex flex-col justify-between">
                            <div>
                                <span className="text-[10px] font-bold text-planetary bg-sky/30 px-2 py-0.5 rounded-full">
                                    {item.category}
                                </span>
                                <h3 className="font-bold text-galaxy text-sm mt-2">{item.name}</h3>
                                <p className="text-xs text-gray-500 mt-1 line-clamp-3">{item.description}</p>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                                <span className="text-xs font-semibold text-galaxy">{item.price}</span>
                                <button
                                    onClick={() => setProducts(products.filter((p) => p.id !== item.id))}
                                    className="text-xs text-red-600 hover:text-red-700 font-semibold"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Tambah */}
            {modalOpen && (
                <div className="fixed inset-0 bg-galaxy/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <form onSubmit={handleAdd} className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                            <h3 className="font-bold text-galaxy text-sm">Tambah Produk BLUD</h3>
                            <button type="button" onClick={() => setModalOpen(false)} className="text-gray-400">✕</button>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Produk / Jasa</label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Contoh: Jasa Perakitan PCB"
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Kategori</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            >
                                <option value="Teknologi">Teknologi</option>
                                <option value="Elektronika">Elektronika</option>
                                <option value="Multimedia">Multimedia</option>
                                <option value="Jasa">Jasa & Servis</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Estimasi Harga / Tarif</label>
                            <input
                                type="text"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="Contoh: Mulai dari Rp 150.000"
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Deskripsi Produk</label>
                            <textarea
                                required
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Jelaskan spesifikasi dan keunggulan produk..."
                                className="w-full text-xs px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-planetary"
                            />
                        </div>

                        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 border border-gray-200 text-xs font-semibold rounded-lg text-gray-600 hover:bg-gray-50"
                            >
                                Batal
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-planetary text-white text-xs font-semibold rounded-lg hover:bg-galaxy"
                            >
                                Simpan Produk
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AdminLayout>
    );
}

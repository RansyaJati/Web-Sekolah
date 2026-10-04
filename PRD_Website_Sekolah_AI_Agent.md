# PRD — Pengembangan Website Sekolah

## 1. Tujuan

Mengembangkan website sekolah yang saat ini **Landing Page Utama sudah tersedia**.

Tugas AI Agentic CLI:
1. Memahami dan mempertahankan Landing Page yang sudah dibuat.
2. Membuat halaman/fitur yang belum tersedia.
3. Mengintegrasikan seluruh halaman melalui navigasi yang konsisten.
4. Setelah semua fitur selesai, melakukan **refactor dan polishing seluruh website** agar terasa sebagai satu produk yang utuh.
5. Jangan mengganti desain Landing Page secara besar-besaran sebelum memahami struktur dan komponen yang sudah ada.

---

# 2. Scope Utama

Berdasarkan kebutuhan proyek, website terdiri dari:

### 1. Landing Page Utama — SUDAH ADA
Konten utama:
- Lulusan Terbaik
- Kerja Sama Industri
- Jurusan
- Prestasi

Status: **Existing / jangan dibuat ulang.**

Landing Page boleh dirapikan setelah seluruh fitur selesai, terutama:
- konsistensi spacing
- typography
- responsive layout
- navigation
- button/link
- visual consistency
- accessibility
- performance

---

### 2. Website PPDB

Buat halaman/section khusus PPDB yang informatif dan mudah digunakan calon peserta didik.

Minimal mencakup:
- Hero/banner PPDB
- Informasi umum PPDB
- Jalur pendaftaran
- Persyaratan
- Jadwal/tahapan
- Alur pendaftaran
- Informasi dokumen yang diperlukan
- FAQ
- CTA menuju pendaftaran
- Kontak/informasi bantuan

Kebutuhan UX:
- Informasi penting harus mudah ditemukan.
- Jadwal dan persyaratan harus mudah dibaca.
- CTA pendaftaran harus terlihat jelas.
- Responsive untuk mobile, tablet, dan desktop.

Jika belum tersedia backend/API PPDB, gunakan data statis/mock data yang terstruktur agar mudah diganti kemudian.

---

### 3. Promosi Produk Unggulan Sekolah — BLUD

Buat halaman untuk mempromosikan produk/jasa unggulan sekolah yang dikelola melalui BLUD.

Minimal mencakup:
- Hero section
- Penjelasan singkat BLUD
- Daftar produk unggulan
- Foto/gambar produk
- Deskripsi produk
- Keunggulan
- Informasi harga jika data tersedia
- CTA/order/contact
- Informasi kontak

Gunakan komponen card/product listing yang reusable.

Jika data produk belum tersedia:
- Buat mock data yang mudah diedit.
- Jangan mengarang data resmi sekolah.
- Tandai data contoh secara internal melalui struktur data, bukan dengan membuat UI terlihat seperti data resmi.

---

### 4. PKL & Career Center — BKK

Buat halaman Career Center/BKK yang menjadi pusat informasi:
- PKL
- Lowongan kerja
- Informasi karier
- Mitra industri
- Informasi alumni/lulusan
- Persiapan memasuki dunia kerja

Minimal mencakup:
- Hero
- Statistik/informasi singkat jika data tersedia
- Informasi PKL
- Daftar lowongan kerja
- Daftar mitra industri
- Informasi career center/BKK
- CTA atau kontak BKK
- FAQ atau informasi bantuan

Gunakan komponen reusable untuk:
- Job card
- Partner/industry card
- Information card
- Filter/search jika memang sesuai dengan struktur aplikasi.

Jika backend belum tersedia, gunakan mock data terstruktur.

---

### 5. AI Integrated Website — Chatbot

Integrasikan fitur chatbot AI ke website.

Tujuan:
Membantu pengunjung mendapatkan informasi mengenai sekolah secara conversational.

Minimal UI:
- Floating chatbot button
- Chat window/panel
- Header chatbot
- Area pesan user dan AI
- Input message
- Send button
- Loading state
- Empty state
- Error state
- Responsive mobile layout

Contoh topik yang dapat ditanyakan:
- Jurusan
- PPDB
- Prestasi
- PKL
- Career Center/BKK
- Produk unggulan
- Informasi sekolah

### Catatan penting AI

Jika API AI/backend belum tersedia:
- Buat UI chatbot terlebih dahulu.
- Pisahkan logic chatbot dari UI.
- Gunakan service/API abstraction agar provider AI dapat diganti dengan mudah.
- Jangan memasukkan API key secara langsung ke frontend.
- Jangan membuat integrasi backend palsu yang seolah-olah sudah terhubung ke AI production.

Jika project sudah memiliki backend/API AI, gunakan arsitektur yang sudah ada dan jangan membuat sistem kedua yang redundant.

---

# 3. Integrasi Navigasi

Semua fitur harus dapat diakses dari navigasi website.

Minimal navigasi:

- Beranda
- PPDB
- Produk Unggulan / BLUD
- PKL & Career Center
- Tentang/Jurusan/Prestasi sesuai struktur Landing Page yang sudah ada
- Chatbot AI melalui floating button

Pastikan:
- Link tidak broken.
- Active state tersedia jika sesuai desain.
- Mobile navigation berfungsi.
- CTA dari Landing Page menuju halaman terkait.
- Tombol kembali/home bekerja dengan baik.

---

# 4. Design System

**Jangan membuat setiap halaman dengan desain berbeda.**

Terlebih dahulu inspect komponen dan styling Landing Page yang sudah ada.

Pertahankan:
- visual identity
- typography
- warna utama
- border radius
- shadow
- spacing
- button style
- card style
- navbar
- footer

Jika sudah terdapat design tokens/variables, gunakan kembali.

Jika belum ada, buat sistem yang sederhana dan konsisten.

Prioritas:
1. Consistency
2. Readability
3. Accessibility
4. Responsive
5. Visual polish

---

# 5. Component Architecture

Gunakan komponen reusable jika project menggunakan component-based framework.

Contoh:

- Navbar
- Footer
- Button
- SectionHeader
- Card
- ProductCard
- JobCard
- PartnerCard
- FAQ
- Modal
- Chatbot
- LoadingState
- EmptyState

Jangan melakukan copy-paste komponen yang sebenarnya dapat digunakan kembali.

Pisahkan:
- UI components
- page/section components
- data/mock data
- services/API
- utility/helper

Ikuti arsitektur project yang sudah ada jika sudah ditentukan.

---

# 6. Data

Untuk data yang belum memiliki backend:

Buat struktur data terpisah dari UI.

Contoh:
- `data/ppdb`
- `data/products`
- `data/jobs`
- `data/partners`
- `data/faq`

Sesuaikan dengan struktur folder project yang sudah ada.

Tujuan:
Data dapat diganti kemudian tanpa harus mengubah komponen UI.

---

# 7. Responsive Design

Website wajib nyaman digunakan pada:

- Mobile
- Tablet
- Laptop
- Desktop

Perhatikan:
- navbar
- hero
- grid/card
- typography
- spacing
- image sizing
- chatbot
- footer
- CTA

Hindari:
- horizontal overflow
- text terpotong
- button keluar viewport
- card dengan tinggi tidak wajar
- layout yang hanya bagus di desktop

---

# 8. Accessibility

Perhatikan minimal:
- semantic HTML
- alt text pada gambar
- keyboard navigation
- focus state
- contrast
- button/link yang jelas
- form label
- aria-label jika diperlukan

Jangan menggunakan elemen non-semantic sebagai pengganti button/link jika tidak diperlukan.

---

# 9. Performance

Setelah semua halaman selesai:
- Optimalkan ukuran gambar.
- Hindari asset yang tidak digunakan.
- Hindari render/re-render yang tidak diperlukan.
- Lazy-load asset/section jika memang diperlukan.
- Pastikan tidak ada console error.
- Pastikan route tidak menghasilkan error.

Jika project memiliki konfigurasi build/linter, gunakan konfigurasi yang sudah ada.

---

# 10. SEO

Pastikan halaman penting memiliki:
- title
- meta description
- heading hierarchy
- semantic structure
- image alt
- URL/route yang masuk akal

Jika framework mendukung metadata per halaman, gunakan mekanisme bawaan framework.

---

# 11. Tahapan Pengerjaan

## Phase 1 — Audit Existing Project

Sebelum coding:

1. Inspect seluruh struktur project.
2. Identifikasi framework dan package manager.
3. Identifikasi routing.
4. Identifikasi komponen existing.
5. Identifikasi design system/style.
6. Identifikasi Landing Page yang sudah dibuat.
7. Identifikasi asset yang tersedia.
8. Jalankan project.
9. Pastikan Landing Page existing dapat berjalan.

**Jangan langsung menghapus atau mengganti kode existing.**

---

## Phase 2 — Implementasi Fitur

Kerjakan berurutan:

1. PPDB
2. BLUD / Produk Unggulan
3. PKL & Career Center / BKK
4. AI Chatbot
5. Integrasi navigasi
6. Footer dan shared components jika diperlukan

Setiap fitur harus selesai secara fungsional sebelum lanjut ke fitur berikutnya.

---

## Phase 3 — Integration

Setelah semua halaman selesai:

- Hubungkan seluruh route.
- Hubungkan CTA.
- Pastikan navbar konsisten.
- Pastikan footer konsisten.
- Pastikan chatbot tersedia di halaman yang sesuai.
- Pastikan tidak ada broken link.
- Pastikan semua halaman responsive.

---

# 12. Phase 4 — Final Polish

Ini WAJIB dilakukan setelah semua fitur selesai.

Audit seluruh website sebagai satu produk.

Periksa:

### Visual
- spacing
- typography
- color consistency
- card consistency
- button consistency
- border radius
- shadows
- icon usage
- image ratio

### UX
- navigation
- CTA
- hierarchy informasi
- loading state
- empty state
- error state
- mobile experience

### Technical
- console error
- broken route
- broken image
- unused import
- duplicated code
- unnecessary dependency
- lint/build error

### Responsive
Test minimal:
- mobile
- tablet
- desktop

### Landing Page
Setelah halaman lain selesai, kembali ke Landing Page dan lakukan polishing agar:
- visualnya konsisten dengan halaman baru
- navigasinya terhubung
- spacing tidak berbeda jauh
- CTA menuju fitur baru bekerja
- tidak ada bagian yang terlihat seperti berasal dari website berbeda

---

# 13. Aturan untuk AI Agent

1. **Inspect first, modify second.**
2. Jangan menghapus fitur existing tanpa alasan.
3. Jangan mengganti framework.
4. Jangan mengganti dependency utama tanpa alasan kuat.
5. Jangan membuat ulang Landing Page dari nol.
6. Reuse existing components dan styles jika memungkinkan.
7. Prioritaskan konsistensi desain.
8. Jangan hardcode data berulang di banyak komponen.
9. Jangan memasukkan API key/secret ke frontend.
10. Jangan membuat fitur yang tidak ada dalam scope hanya karena terlihat menarik.
11. Jika menemukan masalah pada existing code, perbaiki jika aman dan relevan.
12. Setelah perubahan besar, jalankan build/lint/test yang tersedia.
13. Jangan berhenti setelah halaman selesai dibuat; lakukan integration dan final polish.
14. Jangan mengklaim fitur AI production jika backend/API belum benar-benar tersedia.

---

# 14. Definition of Done

Project dianggap selesai apabila:

- [ ] Landing Page existing tetap berfungsi.
- [ ] Halaman PPDB tersedia.
- [ ] Halaman BLUD/Produk Unggulan tersedia.
- [ ] Halaman PKL & Career Center/BKK tersedia.
- [ ] UI chatbot AI tersedia dan terintegrasi sesuai kemampuan backend.
- [ ] Semua halaman terhubung melalui navigasi.
- [ ] CTA berfungsi.
- [ ] Responsive mobile/tablet/desktop.
- [ ] Tidak ada broken image.
- [ ] Tidak ada broken route.
- [ ] Tidak ada console error yang berasal dari implementasi baru.
- [ ] Tidak ada build/lint error yang diperkenalkan oleh perubahan.
- [ ] Komponen utama reusable.
- [ ] Data/mock data terpisah dari UI.
- [ ] Accessibility dasar terpenuhi.
- [ ] SEO dasar terpenuhi.
- [ ] Landing Page sudah dipoles kembali.
- [ ] Seluruh website memiliki visual identity yang konsisten.
- [ ] Final review dilakukan terhadap seluruh halaman, bukan hanya halaman baru.

---

# 15. Prioritas

### P0 — Wajib
- PPDB
- BLUD / Produk Unggulan
- PKL & Career Center / BKK
- Integrasi navigasi
- Responsive
- Landing Page tetap berfungsi

### P1 — Penting
- AI Chatbot
- Shared components
- Loading/empty/error state
- Accessibility
- SEO dasar

### P2 — Polish
- Animasi/transisi
- Micro-interaction
- Performance optimization
- Detail visual tambahan

Jangan mengorbankan P0 hanya untuk mengejar P2.

---

# Instruksi Awal untuk Agent

Mulai dengan **audit project existing**.

Jangan langsung menulis ulang Landing Page.

Setelah memahami struktur project, implementasikan fitur P0 satu per satu. Setelah semua fitur P0 selesai, lanjutkan AI Chatbot dan polishing.

Pada tahap akhir, lakukan audit menyeluruh terhadap website dan rapikan Landing Page agar seluruh website terlihat seperti **satu produk sekolah yang konsisten**, bukan kumpulan halaman yang dibuat terpisah.

# Website Resmi SMK Negeri 1 Cimahi

Website institusi modern, elegan, dan profesional untuk **SMK Negeri 1 Cimahi**, dilengkapi dengan integrasi AI Chatbot (SAPA) bertenaga Google Gemini, informasi PPDB 2026/2027, katalog produk BLUD teaching factory, serta Career Center / Bursa Kerja Khusus (BKK).

---

## 🌟 Fitur Utama

1. **Landing Page Interaktif:**
   - Hero section editorial dengan typography Merriweather & DM Sans.
   - Strip informasi 4 pilar (Kurikulum, Pendaftaran, Fasilitas, Prestasi).
   - Carousel interaktif 9 Program Keahlian dengan snap scrolling halus.
   - Berita terkini dan daftar pencapaian prestasi siswa tingkat kota hingga nasional.
2. **Halaman PPDB (Penerimaan Peserta Didik Baru):**
   - Rincian 4 jalur pendaftaran (Zonasi, Prestasi, Afirmasi, Perpindahan).
   - Timeline interaktif tahapan seleksi tahun ajaran 2026/2027.
   - Rincian dokumen persyaratan wajib dan tambahan.
   - Accordion FAQ dan CTA pendaftaran langsung.
3. **Katalog Produk Unggulan BLUD:**
   - Showcase produk dan jasa teaching factory siswa & guru.
   - Filter kategori produk (Teknologi, Elektronika, Multimedia, Jasa).
   - Rincian spesifikasi, keunggulan, estimasi harga, dan kontak pemesanan.
4. **PKL & Career Center (BKK):**
   - Statistik serapan kerja alumni (85%) dan 50+ mitra industri.
   - Panduan dan persyaratan Praktik Kerja Lapangan (PKL).
   - Papan informasi lowongan pekerjaan aktif beserta filter kategori industri.
   - Daftar profil perusahaan mitra industri nasional & multinasional.
5. **AI Integrated Chatbot — "SAPA":**
   - Asisten virtual cerdas berbasis **Google Gemini API** (`gemini-3.5-flash`).
   - Dilengkapi *system prompt knowledge base* resmi SMKN 1 Cimahi.
   - Multi-turn conversation context.
   - Aman melalui backend proxy Laravel (API Key tidak terekspos ke publik).
   - Dilengkapi *graceful fallback* ke basis data lokal jika server AI offline.

---

## 🛠️ Tech Stack

- **Backend:** Laravel 11 / 12 (PHP 8.2+)
- **Frontend:** React 18 + TypeScript + Inertia.js 2.0
- **Styling:** Tailwind CSS 3 (Custom palette: Galaxy Navy, Planetary Blue, Universe, Meteor, Milky Way)
- **AI Engine:** Google Gemini Generative Language API
- **Build Tool:** Vite 6 / 8

---

## 💻 Instalasi Lokal (Local Development)

### 1. Clone Repository
```bash
git clone https://github.com/RansyaJati/Web-Sekolah.git
cd Web-Sekolah
```

### 2. Pasang Dependencies
```bash
composer install
npm install
```

### 3. Setup Environment
Salin file `.env.example` ke `.env`:
```bash
cp .env.example .env
```
Generate application key:
```bash
php artisan key:generate
```

Isi konfigurasi Gemini API di `.env`:
```env
APP_NAME="SMK Negeri 1 Cimahi"
GEMINI_API_KEY=masukkan_api_key_gemini_anda
GEMINI_MODEL=gemini-3.5-flash
```

### 4. Database Setup
```bash
touch database/database.sqlite
php artisan migrate
```

### 5. Jalankan Server Lokal
Jalankan di dua terminal terpisah:
```bash
# Terminal 1: Laravel Backend
php artisan serve

# Terminal 2: Vite HMR Frontend
npm run dev
```
Buka browser di `http://127.0.0.1:8000`.

---

## 🚀 Panduan Deployment VPS
Untuk panduan lengkap setup dan deployment di server Linux (Ubuntu/Debian) menggunakan Nginx dan PHP-FPM, silakan baca file **[PANDUAN_VPS.md](./PANDUAN_VPS.md)**.

---

## 📄 Lisensi
Project ini dibuat untuk keperluan perlombaan dan pengembangan website institusi SMK Negeri 1 Cimahi.

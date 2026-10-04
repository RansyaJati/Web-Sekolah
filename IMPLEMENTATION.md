# BAGIAN B — INSTRUKSI IMPLEMENTASI AI AGENTIC

> Bagian ini bukan fakta tentang SMKN 1 Cimahi.
> Bagian ini adalah instruksi kerja untuk AI agent dalam membangun dan mengelola website.

---

# 1. SUMBER DATA

Gunakan **Bagian A — Fakta & Knowledge Base SMKN 1 Cimahi** sebagai sumber konten sekolah.

Pisahkan:

**CONTENT / FACT**

* informasi sekolah;
* motto;
* identitas;
* program keahlian;
* kompetensi;
* prospek kerja.

**IMPLEMENTATION**

* cara menyimpan data;
* cara menampilkan data;
* arsitektur frontend;
* arsitektur backend;
* database;
* API;
* CMS;
* SEO;
* responsive design.

Jangan mencampurkan kedua jenis informasi tersebut.

---

# 2. ATURAN KONTEN

Saat membuat konten:

1. Gunakan fakta dari knowledge base.
2. Jangan mengarang fakta.
3. Jangan mengubah nama jurusan.
4. Jangan mengubah motto.
5. Jangan membuat statistik palsu.
6. Jangan membuat prestasi palsu.
7. Jangan membuat data sekolah yang belum tersedia.
8. Jangan membuat klaim "terbaik", "nomor satu", atau sejenisnya tanpa data resmi.
9. Jika informasi belum tersedia, tandai sebagai data yang belum tersedia.
10. Jangan menganggap informasi teknis website sebagai informasi sekolah.

---

# 3. ATURAN IMPLEMENTASI DATA

Jika website menggunakan database, data sekolah yang bersifat dinamis harus berasal dari database.

Contoh entitas:

```text
SchoolProfile
Program
Competency
Career
Achievement
News
Event
Facility
Announcement
```

Program keahlian minimal memiliki struktur:

```text
Program
├── id
├── name
├── code
├── slug
├── short_description
├── description
├── competencies
├── career_prospects
├── industry_fields
├── image
├── icon
├── is_active
├── sort_order
├── created_at
└── updated_at
```

Sesuaikan struktur dengan teknologi dan database yang digunakan project.

---

# 4. SINGLE SOURCE OF TRUTH

Hindari menulis informasi jurusan secara berulang di banyak file.

Contoh yang salah:

```text
Homepage → data RPL hardcoded
Jurusan → data RPL hardcoded
Search → data RPL hardcoded
Footer → data RPL hardcoded
```

Gunakan satu sumber data:

```text
Database / CMS
       ↓
Backend / API
       ↓
Frontend
       ↓
Homepage
Jurusan
Search
Detail Jurusan
```

Dengan demikian ketika admin mengubah deskripsi RPL, seluruh halaman menggunakan data terbaru.

---

# 5. HALAMAN TENTANG

Gunakan fakta sekolah untuk membangun halaman:

```text
/about
```

Section yang dapat digunakan:

1. Hero / Introduction
2. Profil sekolah
3. Identitas MAUNG
4. Motto
5. Karakter pendidikan
6. Bidang keahlian
7. Hubungan dengan dunia industri
8. Prestasi
9. CTA

Section yang membutuhkan data yang belum tersedia jangan dibuat menggunakan data fiktif.

---

# 6. HALAMAN PROGRAM KEAHLIAN

Gunakan route dinamis:

```text
/jurusan
/jurusan/[slug]
```

Contoh:

```text
/jurusan/rpl
/jurusan/sija
/jurusan/teknik-mekatronika
```

Halaman detail jurusan minimal memiliki:

* nama jurusan;
* singkatan;
* deskripsi;
* kompetensi;
* prospek kerja;
* bidang industri;
* CTA.

---

# 7. HOMEPAGE

Homepage dapat mengambil:

### Hero

Identitas sekolah dan motto.

### Tentang

Ringkasan profil sekolah.

### Program Keahlian

Ambil data program dari database/API.

### Keunggulan

Ambil dari konten resmi.

### Prestasi

Ambil dari database prestasi.

### Berita

Ambil dari database berita.

### Agenda

Ambil dari database event.

### CTA

Arahkan pengguna ke halaman yang relevan.

---

# 8. ADMIN / CMS

Jika project memiliki dashboard admin, sediakan pengelolaan untuk:

* profil sekolah;
* program keahlian;
* kompetensi;
* prospek karier;
* berita;
* agenda;
* prestasi;
* fasilitas;
* pengumuman.

Admin harus dapat mengubah konten tanpa mengubah source code.

---

# 9. VALIDASI DATA

Sebelum menampilkan konten:

```text
Apakah data berasal dari Knowledge Base?
        ↓
      YA
        ↓
Tampilkan
        ↓
      TIDAK
        ↓
Apakah terdapat sumber resmi?
        ↓
     YA → Verifikasi
        ↓
     TIDAK
        ↓
Jangan membuat fakta
```

---

# 10. SEO

Setiap halaman program keahlian harus memiliki:

* title;
* meta description;
* canonical URL;
* slug;
* heading structure;
* structured content;
* Open Graph metadata.

Contoh:

```text
Title:
Jurusan Rekayasa Perangkat Lunak | SMKN 1 Cimahi

Description:
Pelajari program Rekayasa Perangkat Lunak SMKN 1 Cimahi, kompetensi yang dipelajari, serta prospek karier di bidang teknologi informasi.
```

Jangan membuat klaim SEO yang berupa fakta sekolah jika tidak tersedia dalam knowledge base.

---

# 11. RESPONSIVE DESIGN

Website harus optimal pada:

* mobile;
* tablet;
* laptop;
* desktop.

Prioritaskan:

* readability;
* accessibility;
* navigasi;
* performance;
* touch interaction;
* responsive typography.

---

# 12. KONSISTENSI BRANDING

Gunakan identitas:

**SMKN 1 Cimahi**

dan motto:

**"Tiada Hari Tanpa Prestasi"**

Gunakan identitas **MAUNG** secara konsisten namun jangan membuat klaim tambahan yang tidak terdapat pada knowledge base.

---

# 13. KONTEN DINAMIS

Jangan hardcode konten berikut jika sistem database/CMS tersedia:

* program keahlian;
* berita;
* agenda;
* prestasi;
* pengumuman;
* fasilitas;
* profil sekolah.

Konten tersebut harus dapat diperbarui dari backend/admin.

---

# 14. QUALITY CHECK

Sebelum menyelesaikan implementasi, lakukan pemeriksaan:

### Content

* Apakah fakta sekolah benar?
* Apakah motto benar?
* Apakah semua jurusan konsisten?
* Apakah tidak ada informasi fiktif?

### Data

* Apakah data dinamis berasal dari database?
* Apakah tidak ada duplikasi data?
* Apakah API bekerja?

### UI

* Apakah responsive?
* Apakah typography terbaca?
* Apakah navigasi jelas?

### SEO

* Apakah setiap halaman memiliki metadata?
* Apakah URL bersih?
* Apakah heading terstruktur?

### Production

Cari dan hapus:

```text
Lorem ipsum
Dummy text
Placeholder
Fake statistics
Fake achievements
Hardcoded school data
Template content
```

Jangan mengganti data yang belum tersedia dengan data fiktif.

---

# 15. PRIORITAS PENGAMBILAN KEPUTUSAN

Jika terjadi konflik:

```text
FAKTA RESMI
    ↓
KNOWLEDGE BASE
    ↓
DATABASE / CMS
    ↓
DESIGN SYSTEM
    ↓
IMPLEMENTATION
```

Akurasi informasi sekolah lebih penting daripada membuat konten terlihat lengkap.

Jika informasi tidak diketahui:

**Jangan mengarang.**

Jika informasi tersedia di database:

**Gunakan database.**

Jika informasi tersedia di knowledge base tetapi belum ada di database:

**Gunakan knowledge base untuk seed/default content dan pertimbangkan memasukkannya ke CMS.**

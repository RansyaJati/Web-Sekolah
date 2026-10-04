# PERFORMANCE.md — SMKN 1 Cimahi

Prinsip: performance adalah bagian arsitektur. Correctness dan security
tidak dikorbankan demi benchmark.

## Data fetching

- Semua list memakai **limit/paginasi di query layer** (`?limit`, `?per_page`
  maks 50/100). Tidak ada fetch-all lalu `slice()` di browser.
- `news` listing tidak memuat kolom `content` (diambil via `show()` bila perlu).
- PPDB: 5 request settings → **1 batch** `GET /api/settings?keys=a,b,c`.
- Jobs: lowongan expired disembunyikan **di DB** (`deadline_date`), bukan di browser.
- Chatbot: maks 5 baris KB yang cocok kata kunci (bukan seluruh tabel);
  riwayat dibatasi 6 pesan terakhir; `timeout 25s` + fallback lokal.
- Dashboard admin: **1 request** `GET /api/stats` (`COUNT(*)` + select kolom
  minimal) menggantikan 6+ request.

## Caching & request control (`services/cms.ts`)

- Satu-satunya abstraksi CMS publik: Component → Service → `/api` → DB.
- TTL: programs/partners 10 mnt, settings 5 mnt, default 1 mnt.
- Deduplikasi request in-flight yang identik (aman untuk concurrent users).
- Search admin Media di-debounce 400ms; search tidak mengambil seluruh tabel.
- Login 5x rate-limit; chat 20/mnt/IP.

## Frontend

- Code-splitting per halaman via Inertia/Vite (build: `Welcome ~15KB`,
  `cms service ~19KB`, `app shared ~350KB`). Admin tidak membebani homepage.
- Hero image eager (kritis); image di bawah viewport `loading=lazy`.
- Kontainer image bertinggi tetap → tanpa layout shift.

## Stress-test readiness (skenario A–G)

- Landing/news/PPDB/jobs: query ber-index + limit + cache → tahan concurrent read.
- CRUD admin saat traffic publik: mutasi ringan + `LogActivity` best-effort
  (gagal log tidak menggagalkan mutasi).
- DB lambat/gagal: semua section dinamis punya loading/empty/error state;
  chatbot fallback lokal; website tidak crash total.
- Baseline build: `tsc` bersih, `pest` 25/25, `vite build` ~2–4 dtk.

## Keterbatasan yang diketahui

- Fetch CRUD admin lama masih direct `fetch` (bekerja via cookie same-origin,
  halaman admin sudah di balik `auth`); migrasi ke `adminApi` dilakukan bertahap.
- Upload media memakai disk lokal (`storage/app/public`) — untuk multi-server
  perlu object storage (S3/Supabase Storage).
- believers `per_page` maksimum 50 untuk mencegah payload raksasa.
- Belum ada CDN/Redis cache; cache saat ini in-memory per tab browser +
  query efisien di DB.

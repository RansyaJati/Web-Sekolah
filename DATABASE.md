# DATABASE.md — SMKN 1 Cimahi CMS

Backend: **Laravel Eloquent → Supabase PostgreSQL** (via `DB_*` env, `DB_SSLMODE=require`).
Frontend tidak pernah menyentuh database langsung — selalu via `services/cms.ts`
→ Laravel `/api` → database. Tidak ada Supabase client/key di browser.

## Schema

| Tabel | Fungsi | Kunci penting |
|---|---|---|
| `news` | Berita | `slug` unique, `status` (Published/Draft/Archived), `is_featured`, `published_at` |
| `achievements` | Prestasi | `year`, `level`, `rank`, `is_featured` |
| `programs` | 9 program keahlian | `code` unique, `is_active`, `is_featured`, `competencies`/`career_prospects` JSON |
| `products` | Katalog BLUD | `category`, `features` JSON, `is_available` |
| `job_vacancies` | Lowongan BKK | `type`, `category`, `posted_date`, `deadline_date`, `is_active` |
| `industry_partners` | Mitra industri | `partner_since`, `is_active` |
| `alumni` | Testimoni alumni | `graduation_year`, `is_featured` |
| `knowledge_bases` | Fakta chatbot SAPA | `category`, `is_active` |
| `settings` | PPDB (`ppdb_*`) + `site_profile`, key→value JSON | `key` unique |
| `users` | Akun admin (`role`, `is_active`) | `email` unique |
| `activity_logs` | Audit CRUD admin (`user_id`→users nullOnDelete) | `module`, `created_at` |
| `media` | Metadata file upload (`path` unique, mime/size/dimensi) | `path` unique |

Relasi: `activity_logs.user_id → users.id`. Sisanya tabel konten independen
(disengaja — profil sekolah tidak butuh join kompleks; hindari N+1).

## Indexes (migrasi `2026_10_05_000001_cms_performance_hardening`)

Berdasarkan pola query nyata (filter/sort/search):

- `news(status, published_at)`, `news(category)`, `news(is_featured)`
- `achievements(year, is_featured)`, `achievements(level)`
- `programs(is_active, is_featured)`
- `products(category, is_available)`
- `job_vacancies(is_active, deadline_date)`, `job_vacancies(category)`
- `industry_partners(is_active)`, `alumni(is_featured, graduation_year)`
- `knowledge_bases(category, is_active)`, `users(role)`, `activity_logs(created_at)`

## Auth & keamanan data

- `/admin/*` (kecuali login) = middleware `auth`; guest `/admin/*` → `/admin/login`.
- Mutasi `POST/PUT/DELETE /api/*` = `auth` + `log.activity`; GET publik tetap terbuka.
- `GET /api/users` = super_admin saja (403 enforced di controller).
- Login rate-limit 5x (Breeze `LoginRequest`); akun `is_active=false` ditolak.
- `POST /api/chat` = `throttle:20,1`.
- Secret (`GEMINI_API_KEY`, `DB_PASSWORD`) hanya di `.env`/server — tidak di frontend.

## Seed (idempoten, aman dijalankan ulang)

- `CmsSeeder`: news 1, achievements 4, programs 9, partners 6, products 6,
  jobs 6, alumni 2, knowledge 6, activity_logs 3 (dilewati jika sudah ada).
- `SettingSeeder`: `ppdb_info/jalur/jadwal/syarat/faq` + `site_profile`.
- `DatabaseSeeder`: admin via `firstOrCreate` (tidak lagi crash duplikat).
- Perintah: `php artisan migrate --force` lalu
  `php artisan db:seed --class="Database\Seeders\CmsSeeder" --force`.

## Environment variables

`DB_CONNECTION=pgsql`, `DB_HOST/PORT/DATABASE/USERNAME/PASSWORD`,
`DB_SSLMODE=require`, `GEMINI_API_KEY`, `GEMINI_MODEL`.
Upload media memakai disk `public` (`php artisan storage:link`).

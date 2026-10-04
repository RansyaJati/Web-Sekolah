# DESIGN GUIDE — Website SMKN 1 Cimahi

> Dokumen ini adalah panduan visual dan UI untuk AI Agentic CLI.
> Mockup/reference dan color scheme sudah tersedia di source project. Gunakan dokumen ini bersama file reference tersebut.

---

# 1. Design Direction

## Konsep

Arah visual website:

**Modern — Elegant — Educational — Professional — Trustworthy**

Website harus terasa seperti website institusi pendidikan modern, bukan dashboard aplikasi dan bukan landing page startup yang terlalu ramai.

Karakter visual:
- Clean
- Banyak white space
- Editorial
- Premium tetapi tetap formal
- Dominan navy/blue
- Typography serif untuk headline
- Sans-serif untuk informasi dan navigasi
- Foto sekolah/siswa sebagai elemen visual utama
- Rounded corner secukupnya
- Tidak menggunakan terlalu banyak efek dekoratif

### Prinsip utama

> **Editorial typography + institutional blue + photography + clean information hierarchy**

Jangan membuat setiap halaman memiliki gaya visual sendiri.

Seluruh halaman:
- Landing Page
- PPDB
- BLUD / Produk Unggulan
- PKL & Career Center
- Chatbot

harus terlihat sebagai bagian dari satu design system.

---

# 2. Reference Files

Gunakan reference yang tersedia di source sebagai acuan visual utama.

Reference mencakup:
- Landing Page
- PKL / Career Center
- Chatbot
- Color Scheme
- Logo

**Penting:**
Jangan menginterpretasikan reference sebagai gambar yang harus disalin pixel-per-pixel.

Gunakan reference untuk memahami:
- hierarchy
- spacing
- typography
- warna
- komposisi
- bentuk card
- navbar
- hero
- footer
- visual language

---

# 3. Typography

## Primary Display Font — Merriweather

Gunakan **Merriweather** untuk:

- Hero headline
- Page title
- Section heading
- Heading besar
- Judul artikel
- Judul program
- Headline editorial

Karakter:
- Elegant
- Formal
- Humanis
- Editorial
- Cocok untuk institusi pendidikan

Contoh:

```text
SMK Negeri 1 Cimahi:
Excellence in Vocational Education
```

atau:

```text
Program Keahlian untuk
Para Pemimpin Masa Depan
```

### Weight

Prioritas:
- Regular 400
- Bold 700

Gunakan 400 untuk headline editorial jika ukuran besar sudah cukup memberikan emphasis.

Gunakan 700 hanya ketika diperlukan.

---

## Secondary/UI Font — DM Sans

Gunakan **DM Sans** untuk:

- Navbar
- Button
- Body text
- Caption
- Label
- Metadata
- Card description
- Form
- Search
- Chatbot
- Navigation
- Footer

DM Sans harus menjadi font utama untuk UI.

### Weight

Gunakan:
- Regular 400
- Medium 500
- SemiBold 600
- Bold 700

---

## Typography Rule

### Jangan

Jangan menggunakan:
- Merriweather untuk semua teks.
- DM Sans untuk headline editorial besar jika Merriweather lebih sesuai.
- Lebih dari dua family font.
- Font random dari component/library.

### Rule sederhana

```text
Merriweather = "apa yang ingin dibaca"
DM Sans      = "apa yang ingin digunakan"
```

---

# 4. Font Scale

Gunakan responsive typography.

Recommended desktop:

| Element | Font | Size |
|---|---|---:|
| Hero H1 | Merriweather | 52–68px |
| Page H1 | Merriweather | 48–60px |
| Section H2 | Merriweather | 36–48px |
| H3 | Merriweather | 26–32px |
| Body Large | DM Sans | 18–20px |
| Body | DM Sans | 15–17px |
| Small | DM Sans | 13–14px |
| Button | DM Sans | 14–16px |
| Navigation | DM Sans | 14–16px |
| Caption | DM Sans | 12–13px |

Untuk mobile, turunkan ukuran heading secara proporsional.

Contoh:

```text
Desktop H1: 60px
Tablet H1: 48px
Mobile H1: 34–40px
```

Jangan membuat heading mobile terlalu besar sehingga memenuhi seluruh layar.

---

# 5. Color System

Gunakan color scheme yang tersedia di reference.

## Primary Colors

### Planetary
```text
#334EAC
```

Gunakan sebagai:
- primary brand blue
- link
- heading tertentu
- CTA
- icon
- accent

---

### Galaxy
```text
#081F5C
```

Gunakan sebagai:
- dark navy
- navbar/hero background
- footer
- dark section
- overlay
- high-contrast CTA

Ini adalah warna paling gelap dalam system.

---

### Universe
```text
#7096D1
```

Gunakan sebagai:
- secondary blue
- icon background
- supporting section
- decorative element
- hover/accent

---

### Venus
```text
#BAD6EB
```

Gunakan sebagai:
- light blue background
- subtle section
- card background
- secondary accent

---

### Sky
```text
#D0E3FF
```

Gunakan sebagai:
- lightest blue accent
- background
- highlight
- subtle UI state

---

### Meteor
```text
#F7F2EB
```

Gunakan sebagai:
- warm off-white
- alternative page background
- section background
- card background

---

### Milky Way
```text
#FFF9F0
```

Gunakan sebagai:
- warm white
- editorial background
- alternative surface
- large whitespace section

---

# 6. Color Hierarchy

Default hierarchy:

```text
Galaxy       → strongest / dark
Planetary    → primary brand
Universe     → secondary
Venus        → light blue
Sky          → very light blue
Meteor       → warm neutral
Milky Way    → warmest neutral
```

Jangan menggunakan semua warna dalam satu section.

Recommended rule:

### 60%
Neutral:
- White
- Milky Way
- Meteor

### 30%
Blue:
- Galaxy
- Planetary

### 10%
Accent:
- Universe
- Venus
- Sky

Gunakan warna sebagai hierarchy, bukan dekorasi semata.

---

# 7. Background

Default website background:

```text
#FFFFFF
```

atau:

```text
#FFF9F0
```

Gunakan background biru gelap hanya untuk section yang memang membutuhkan emphasis.

Contoh:
- Hero
- Footer
- CTA
- Career highlight
- Important information

Hindari seluruh halaman berwarna biru gelap.

---

# 8. Navbar

Reference menunjukkan navbar putih dengan logo sekolah dan navigasi horizontal.

## Desktop

Struktur:

```text
[LOGO] [Nama Sekolah]        Tentang  Informasi  PPDB  Program Keahlian  Berita  Kontak  Lainnya  [Search] [Toggle]
```

Karakter:
- White background
- Clean
- Tidak terlalu tinggi
- Bottom border/shadow sangat subtle
- DM Sans
- Navy text

Logo:
- Gunakan logo asli yang tersedia.
- Jangan mengubah proporsi logo.

### Navigation

Default:
```text
DM Sans 14–16px
Weight 500
Color #081F5C
```

Hover:
```text
#334EAC
```

Active:
Gunakan:
- primary blue
- underline kecil
- atau subtle background

Jangan menggunakan efek hover yang berlebihan.

---

# 9. Hero Section

Hero adalah area visual terkuat.

Reference menggunakan:
- Foto sekolah
- Dark blue gradient overlay
- White serif heading
- White/soft body text
- CTA
- Carousel indicator

## Struktur

```text
Hero
 ├── Background Image
 ├── Blue Gradient Overlay
 ├── Content
 │    ├── Eyebrow
 │    ├── H1
 │    ├── Description
 │    └── CTA
 └── Slider Indicator
```

### Overlay

Gunakan Galaxy / Planetary sebagai overlay.

Contoh konsep:

```text
transparent → #081F5C
```

Overlay harus cukup gelap supaya teks terbaca.

Jangan membuat foto terlalu gelap hingga detail foto hilang.

---

# 10. Hero Typography

H1:

```text
Merriweather
White
52–68px desktop
Line-height 1.05–1.15
```

Body:

```text
DM Sans
White / very light
16–20px
Line-height 1.5
```

CTA:

```text
DM Sans
14–16px
SemiBold
```

---

# 11. CTA / Button

Gunakan dua jenis utama.

## Primary Button

Background:

```text
#334EAC
```

Text:

```text
#FFFFFF
```

Radius:
```text
8–12px
```

Padding:
```text
12px 20px
```

Hover:
- sedikit lebih gelap
- atau naikkan contrast

---

## Secondary Button

Untuk hero:

```text
transparent
border: 1px solid rgba(255,255,255,.8)
text: white
```

Pada light background:

```text
transparent
border: #334EAC
text: #334EAC
```

---

# 12. Section Layout

Gunakan container terpusat.

Recommended:

```text
max-width: 1200–1280px
margin: auto
padding-inline: 24–32px
```

Desktop:
```text
padding-inline: 48–64px
```

Mobile:
```text
padding-inline: 20–24px
```

---

# 13. Section Spacing

Gunakan white space yang cukup.

Recommended:

Desktop:
```text
Section top/bottom: 80–120px
```

Tablet:
```text
64–88px
```

Mobile:
```text
48–72px
```

Jangan membuat setiap section terlalu rapat.

---

# 14. Section Heading

Reference menunjukkan heading section yang besar dan centered.

Contoh:

```text
Program Teknik, Ketenagalistrikan, PPLG,
dan Broadcast bagi Para Pemimpin Masa Depan
```

Style:

```text
Merriweather
#334EAC / #081F5C
36–48px
line-height: 1.15
text-align: center
```

Description:

```text
DM Sans
13–16px
#4B5563
max-width: 700px
margin: auto
```

---

# 15. Feature Strip

Landing Page reference memiliki empat feature item:

- Kurikulum
- Pendaftaran
- Fasilitas
- Prestasi

Gunakan layout 4 kolom desktop.

```text
[Icon]       [Icon]       [Icon]       [Icon]
Judul        Judul        Judul        Judul
Deskripsi    Deskripsi    Deskripsi    Deskripsi
```

Divider vertikal dapat digunakan.

Warna:
- Icon: Galaxy / Planetary
- Heading: Galaxy
- Body: neutral gray

Mobile:
- ubah menjadi 2 kolom atau 1 kolom sesuai viewport.

---

# 16. Program Keahlian Cards

Reference menggunakan foto siswa dengan gradient navy di bagian bawah.

Card:

```text
Image
  ↓
Dark gradient
  ↓
Program title
```

Recommended:
- aspect ratio konsisten
- radius 10–14px
- overflow hidden
- image cover

Judul:

```text
Merriweather
White
26–32px
```

Hover:
- image scale sangat ringan
- gradient tetap
- jangan menggunakan animasi berlebihan

---

# 17. News / Berita

Layout editorial:

```text
[Featured News]     [Achievement / News List]
```

Featured news:
- image besar
- title
- category
- date
- short description

List:
- compact cards
- icon/category
- title
- date

Gunakan DM Sans untuk metadata dan Merriweather untuk title.

---

# 18. PPDB Design

PPDB harus terasa lebih actionable daripada Landing Page.

Visual hierarchy:

```text
Hero
↓
CTA Pendaftaran
↓
Jadwal
↓
Persyaratan
↓
Alur
↓
Jalur
↓
FAQ
↓
Contact
```

Gunakan accent:

```text
Planetary #334EAC
Universe #7096D1
Sky #D0E3FF
```

Jadwal PPDB sebaiknya menggunakan card/timeline.

Contoh:

```text
[01] Pendaftaran
     tanggal

[02] Seleksi
     tanggal

[03] Pengumuman
     tanggal
```

---

# 19. BLUD / Product Design

Produk harus menjadi fokus visual.

Gunakan:

```text
Product Image
Product Name
Short Description
Category
Price / CTA jika tersedia
```

Grid:

Desktop:
```text
3–4 columns
```

Tablet:
```text
2 columns
```

Mobile:
```text
1 column
```

Product card:
- white background
- subtle border
- radius 12–16px
- minimal shadow
- image ratio konsisten

Jangan membuat card terlalu glossy.

---

# 20. PKL & Career Center

Reference PKL menggunakan hero dark navy dengan heading besar.

Pertahankan karakter tersebut.

Hero:

```text
Galaxy background
Merriweather H1
DM Sans description
School emblem/background watermark
```

Content:
- informasi PKL
- pengajuan
- mitra
- lowongan
- karier

Gunakan card dengan border subtle.

Career/job card:

```text
[Company Logo]

Job Title
Company
Location
Type

[View Detail]
```

Gunakan hierarchy yang jelas.

---

# 21. Chatbot UI

Chatbot reference menggunakan floating window putih di atas website.

Pertahankan konsep ini.

## Floating Button

Position:

```text
fixed
right: 24px
bottom: 24px
```

Desktop:

```text
56–64px
```

Mobile:

```text
52–56px
right: 16px
bottom: 16px
```

Background:

```text
#081F5C
```

---

## Chat Window

Desktop:

```text
width: 360–400px
height: 520–600px
```

Mobile:

```text
width: calc(100vw - 24px)
max-height: calc(100vh - 32px)
```

Radius:
```text
20–24px
```

Background:
```text
#FFFFFF
```

Shadow:
subtle, not excessive.

---

## Chat Header

Isi:
- Logo/avatar
- Nama AI
- status
- close button

Contoh:

```text
[SAPA Logo]

SAPA
Asisten SMKN 1 Cimahi
```

Gunakan DM Sans.

---

## Chat Bubble

User:

```text
background: #081F5C
text: white
```

AI:

```text
background: #F7F2EB / #F1F5F9
text: #111827
```

Radius:
```text
14–18px
```

---

# 22. Forms

Untuk:
- PPDB
- Contact
- Career
- Search

Gunakan:

```text
DM Sans
border: #BAD6EB / neutral
radius: 8–10px
height: 44–48px
```

Focus:

```text
border: #334EAC
box-shadow: subtle
```

Label harus selalu terlihat.

Jangan hanya mengandalkan placeholder.

---

# 23. Cards

Default card:

```text
background: #FFFFFF
border: 1px solid rgba(...)
border-radius: 12–16px
```

Shadow:
Gunakan sangat ringan.

Card hierarchy:

```text
Title
Description
Metadata
Action
```

Jangan menambahkan shadow besar pada semua card.

---

# 24. Icons

Gunakan satu icon style yang konsisten.

Recommended:
- simple
- solid/outline konsisten
- navy/blue
- tidak terlalu detail

Jangan mencampur:
- 3D icon
- emoji
- outline icon
- flat icon

dalam satu section.

---

# 25. Photography

Foto adalah bagian penting dari visual identity.

Gunakan foto:
- kegiatan siswa
- fasilitas
- kegiatan sekolah
- prestasi
- industri
- siswa

Treatment:
- natural
- high quality
- tidak terlalu banyak filter
- gunakan blue overlay hanya ketika diperlukan untuk readability

Untuk card:
```text
object-fit: cover
```

Jaga focal point foto.

---

# 26. Border Radius

Gunakan sistem sederhana:

```text
Small: 6px
Default: 10–12px
Card: 12–16px
Large / Chatbot: 20–24px
Pill: 999px
```

Jangan semua elemen dibuat pill.

---

# 27. Shadow

Gunakan shadow secara hemat.

Default card:

```text
subtle shadow
```

Hover:

```text
slightly stronger shadow
```

Modal/chatbot:

```text
medium shadow
```

Jangan menggunakan shadow besar pada navbar atau seluruh section.

---

# 28. Animation

Animation harus subtle.

Recommended:
- fade
- slide-up ringan
- image scale ringan
- hover transition

Duration:
```text
150–300ms
```

Gunakan easing natural.

Jangan:
- parallax berlebihan
- bouncing
- rotating cards
- animasi setiap elemen ketika scroll

Website harus tetap terasa sebagai website sekolah profesional.

---

# 29. Responsive Rules

## Desktop

```text
≥ 1200px
```

Gunakan:
- multi-column layout
- full navbar
- large hero
- side-by-side content

## Tablet

```text
768–1199px
```

- kurangi gap
- grid 2 kolom
- navbar dapat disederhanakan

## Mobile

```text
< 768px
```

- hamburger navigation
- single column
- heading lebih kecil
- button dapat full-width
- chatbot hampir full screen
- card menjadi stacked
- kurangi decorative element

---

# 30. Mobile Priority

Di mobile, prioritas informasi:

```text
1. Page title
2. Main information
3. Primary CTA
4. Supporting information
5. Secondary CTA
```

Jangan memindahkan informasi penting terlalu jauh ke bawah hanya untuk mempertahankan layout desktop.

---

# 31. Footer

Reference Landing Page menggunakan footer dark navy.

Gunakan:

```text
background: #081F5C
text: white
```

Struktur:

```text
SMKN 1 Cimahi
deskripsi

Tautan Cepat
- Home
- Tentang
- Program Keahlian
- Berita
- Kontak

Kontak Kami
alamat
telepon
email

Media Sosial
icons
```

Typography:
- Heading: DM Sans 600
- Body: DM Sans 400

Footer harus konsisten di seluruh halaman.

---

# 32. Accessibility

Minimal:

- Contrast harus cukup.
- Semua image memiliki alt text.
- Button dapat difokuskan keyboard.
- Link dapat dibedakan.
- Form memiliki label.
- Chatbot dapat ditutup dengan keyboard.
- Focus state terlihat.
- Jangan menggunakan warna sebagai satu-satunya indikator.

---

# 33. Do / Don't

## DO

- Gunakan Merriweather untuk editorial heading.
- Gunakan DM Sans untuk UI.
- Gunakan navy sebagai visual anchor.
- Gunakan banyak white space.
- Gunakan foto sekolah secara natural.
- Reuse component.
- Gunakan consistent spacing.
- Gunakan hierarchy yang jelas.
- Pertahankan visual reference.

## DON'T

- Jangan menggunakan font ketiga.
- Jangan memakai terlalu banyak warna.
- Jangan membuat semua section biru.
- Jangan menggunakan gradient berlebihan.
- Jangan menggunakan glassmorphism.
- Jangan menggunakan neon.
- Jangan membuat card terlalu rounded.
- Jangan membuat website terasa seperti dashboard.
- Jangan membuat setiap halaman berbeda style.
- Jangan mengubah identitas Landing Page secara drastis.

---

# 34. Design Tokens

Gunakan CSS variables / theme tokens bila project memungkinkan.

Contoh:

```css
:root {
  --color-galaxy: #081F5C;
  --color-planetary: #334EAC;
  --color-universe: #7096D1;
  --color-venus: #BAD6EB;
  --color-sky: #D0E3FF;
  --color-meteor: #F7F2EB;
  --color-milky-way: #FFF9F0;

  --font-display: "Merriweather", serif;
  --font-body: "DM Sans", sans-serif;

  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 999px;

  --container-width: 1280px;
}
```

Jika project sudah mempunyai token system, **gunakan system existing dan sesuaikan nilainya**, jangan membuat dua sistem yang berbeda.

---

# 35. Page-Specific Visual Direction

## Landing Page

Style:
```text
Editorial + institutional
```

Dominan:
- White
- Navy
- Photography
- Large serif headings

---

## PPDB

Style:
```text
Clear + informative + actionable
```

Dominan:
- White
- Planetary
- Sky
- Cards/timeline

---

## BLUD

Style:
```text
Product showcase + institutional
```

Dominan:
- White
- Meteor
- Planetary
- Product photography

---

## PKL & Career Center

Style:
```text
Professional + career-oriented
```

Dominan:
- Galaxy
- Planetary
- White
- Industry photography

---

## Chatbot

Style:
```text
Friendly + clean + modern
```

Dominan:
- White
- Galaxy
- Planetary
- Meteor for AI messages

---

# 36. Implementation Priority

Saat membuat halaman baru:

### Step 1
Reuse:
- Navbar
- Footer
- Button
- Container
- Typography
- Card
- Section heading

### Step 2
Gunakan:
- color tokens
- font tokens
- spacing tokens

### Step 3
Bangun page-specific components.

### Step 4
Test responsive.

### Step 5
Bandingkan dengan reference.

### Step 6
Polish visual.

---

# 37. Final Design Quality Checklist

Sebelum menyatakan design selesai:

- [ ] Merriweather hanya digunakan untuk display/editorial heading.
- [ ] DM Sans digunakan untuk UI/body.
- [ ] Tidak ada font ketiga.
- [ ] Color palette sesuai reference.
- [ ] Galaxy digunakan sebagai dark anchor.
- [ ] Planetary digunakan sebagai primary blue.
- [ ] White space cukup.
- [ ] Navbar konsisten.
- [ ] Footer konsisten.
- [ ] Button konsisten.
- [ ] Card konsisten.
- [ ] Border radius konsisten.
- [ ] Foto memiliki treatment konsisten.
- [ ] Hero mengikuti visual language reference.
- [ ] Mobile responsive.
- [ ] Chatbot tidak menutupi konten penting.
- [ ] Tidak ada horizontal overflow.
- [ ] Semua halaman terlihat sebagai satu website.
- [ ] Landing Page tidak kehilangan karakter desain awal.

---

# Instruksi untuk AI Agent

Gunakan file ini sebagai **DESIGN SYSTEM / UI GUIDELINE**.

Sebelum membuat halaman baru:

1. Baca PRD.
2. Baca DESIGN GUIDE ini.
3. Inspect reference/mockup yang tersedia di source.
4. Inspect komponen existing.
5. Reuse komponen dan token yang sudah ada.
6. Implementasikan halaman baru dengan visual language yang sama.
7. Setelah implementasi, lakukan visual consistency review.

**Prioritas desain:**

```text
Consistency
    ↓
Hierarchy
    ↓
Readability
    ↓
Accessibility
    ↓
Responsive
    ↓
Visual polish
```

Jangan mengejar efek visual jika mengurangi usability.

Target akhir:

> Website SMKN 1 Cimahi yang modern, elegan, informatif, profesional, dan terasa seperti satu sistem desain yang konsisten dari Landing Page hingga PPDB, BLUD, Career Center, dan AI Chatbot.

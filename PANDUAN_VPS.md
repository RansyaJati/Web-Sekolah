# 📋 Panduan Deploy Website SMKN 1 Cimahi ke VPS (Ubuntu / Debian)

Panduan langkah demi langkah untuk menginstal dan menjalankan project Laravel + React Inertia ini di VPS publik (Ubuntu 22.04 LTS / 24.04 LTS).

---

## 📑 Daftar Isi
1. [Prasyarat Server](#1-prasyarat-server)
2. [Instalasi Paket yang Dibutuhkan](#2-instalasi-paket-yang-dibutuhkan)
3. [Clone Repository & Permissions](#3-clone-repository--permissions)
4. [Konfigurasi Environment (.env)](#4-konfigurasi-environment-env)
5. [Build Asset & Migrasi Database](#5-build-asset--migrasi-database)
6. [Konfigurasi Nginx Web Server](#6-konfigurasi-nginx-web-server)
7. [SSL / HTTPS dengan Let's Encrypt (Opsional)](#7-ssl--https-dengan-lets-encrypt-opsional)
8. [Panduan Update Rutin (Git Pull)](#8-panduan-update-rutin-git-pull)
9. [Troubleshooting Umum](#9-troubleshooting-umum)

---

## 1. Prasyarat Server
- VPS dengan OS Ubuntu 20.04/22.04/24.04 atau Debian 11/12
- Akses user dengan hak `sudo` atau `root`
- RAM minimal 1 GB (disarankan 2 GB agar proses `npm run build` lancar, atau aktifkan swap memory)

---

## 2. Instalasi Paket yang Dibutuhkan

Update sistem operasi dan pasang software pokok:
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl unzip zip nginx ufw
```

### Pasang PHP 8.3 & Ekstensi
```bash
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:ondrej/php -y
sudo apt update

sudo apt install -y php8.3-fpm php8.3-cli php8.3-common php8.3-curl \
    php8.3-mbstring php8.3-xml php8.3-zip php8.3-bcmath php8.3-sqlite3 \
    php8.3-intl php8.3-readline
```

### Pasang Composer (PHP Package Manager)
```bash
curl -sS https://getcomposer.org/installer | php
sudo mv composer.phar /usr/local/bin/composer
composer --version
```

### Pasang Node.js & NPM (Versi 20 LTS)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
node -v
npm -v
```

---

## 3. Clone Repository & Permissions

Pindahkan ke direktori web `/var/www` dan lakukan clone:
```bash
cd /var/www
sudo git clone https://github.com/RansyaJati/Web-Sekolah.git web-sekolah
cd web-sekolah
```

Atur kepemilikan folder ke user web server (`www-data`):
```bash
sudo chown -R $USER:www-data /var/www/web-sekolah
```

---

## 4. Konfigurasi Environment (`.env`)

Salin template konfigurasi:
```bash
cp .env.example .env
nano .env
```

Sesuaikan nilai-nilai berikut di dalam file `.env`:
```env
APP_NAME="SMK Negeri 1 Cimahi"
APP_ENV=production
APP_DEBUG=false
APP_URL=http://IP_VPS_ANDA_ATAU_DOMAIN

DB_CONNECTION=sqlite

# Konfigurasi AI Chatbot (Gemini)
GEMINI_API_KEY=masukkan_api_key_gemini_disini
GEMINI_MODEL=gemini-3.5-flash
```
> **Catatan:** Tekan `Ctrl + O` lalu `Enter` untuk menyimpan, lalu `Ctrl + X` untuk keluar dari nano.

---

## 5. Build Asset & Migrasi Database

Jalankan perintah berikut di dalam folder `/var/www/web-sekolah`:

```bash
# 1. Pasang dependensi PHP (production mode)
composer install --no-dev --optimize-autoloader

# 2. Generate Application Key
php artisan key:generate

# 3. Buat database SQLite & jalankan migrasi
touch database/database.sqlite
php artisan migrate --force

# 4. Pasang dependensi frontend & build asset produksi
npm ci
npm run build

# 5. Beri izin write ke folder storage dan cache
sudo chown -R www-data:www-data storage bootstrap/cache
sudo chmod -R 775 storage bootstrap/cache

# 6. Cache konfigurasi dan route Laravel agar loading maksimal
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

> **Tips Jika Server RAM 1GB freeze saat `npm run build`:**
> Buat swap memory 2GB terlebih dahulu:
> ```bash
> sudo fallocate -l 2G /swapfile
> sudo chmod 600 /swapfile
> sudo mkswap /swapfile
> sudo swapon /swapfile
> ```

---

## 6. Konfigurasi Nginx Web Server

Buat file blok server Nginx baru:
```bash
sudo nano /etc/nginx/sites-available/web-sekolah
```

Tempelkan script konfigurasi berikut (ganti `example.com` dengan domain atau IP server Anda):
```nginx
server {
    listen 80;
    listen [::]:80;
    server_name example.com IP_VPS_ANDA;
    root /var/www/web-sekolah/public;

    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";

    index index.php;
    charset utf-8;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }

    error_page 404 /index.php;

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.3-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

Aktifkan konfigurasi dan restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/web-sekolah /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

Buka browser dan akses IP server atau domain Anda. Website SMKN 1 Cimahi sudah online!

---

## 7. SSL / HTTPS dengan Let's Encrypt (Opsional)

Jika server sudah mengarah ke nama domain asli, pasang sertifikat SSL gratis:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d domainanda.sch.id
```

---

## 8. Panduan Update Rutin (Git Pull)

Jika rekan tim Anda melakukan push fitur baru ke GitHub dan ingin memperbarui website di VPS, cukup jalankan satu perintah ringkas ini:

```bash
cd /var/www/web-sekolah
git pull origin main
composer install --no-dev --optimize-autoloader
npm ci
npm run build
php artisan migrate --force
php artisan optimize
```

---

## 9. Troubleshooting Umum

1. **Error 500 (Server Error):**
   - Periksa izin folder storage: `sudo chmod -R 775 storage bootstrap/cache` dan `sudo chown -R www-data:www-data storage bootstrap/cache`.
   - Cek log error: `tail -n 50 /var/www/web-sekolah/storage/logs/laravel.log`.

2. **Chatbot tidak merespon:**
   - Pastikan variabel `GEMINI_API_KEY` di file `.env` sudah diisi dengan benar.
   - Bersihkan cache config: `php artisan config:clear && php artisan config:cache`.
   - Pastikan model yang digunakan adalah `gemini-3.5-flash`.

3. **Tampilan CSS/JS tidak termuat:**
   - Jalankan `npm run build` kembali dan pastikan folder `public/build` berhasil terisi.

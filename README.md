# PAPERLY – Stationery Store

Website e-commerce alat tulis sekolah, kuliah, dan kantor yang dibangun menggunakan **Vue.js 3**, **JavaScript**, **HTML5**, **CSS3**, **Vite (Multi-Page Application)**, dan **localStorage** sebagai proyek akhir perkuliahan.

- **Tagline:** Everything You Need to Write Your Story.
- **Palet Warna:** Sage Green, Cream, Putih, dan Soft Orange.
- **Tipografi:** Poppins.

## Halaman Multi-Page
1. `index.html` – Beranda (Hero promosi, kategori, produk terlaris, produk terbaru, keunggulan toko, tentang, kontak, footer)
2. `Product.html` – Katalog Produk (12 produk, 4 kategori, pencarian, filter kategori, pengurutan harga)
3. `Detail.html` – Detail Produk (foto, harga, deskripsi, spesifikasi, stok, pilihan jumlah, tambah ke keranjang)
4. `Cart.html` – Keranjang Belanja (ubah jumlah, hapus item, hitung subtotal & total otomatis, tersimpan di `localStorage`)
5. `Checkout.html` – Checkout Pesanan (form pengiriman, metode pembayaran simulasi, ringkasan pesanan, konfirmasi & pengosongan keranjang)
6. `Login.html` – Login Pengguna (simulasi frontend berbasis `localStorage`)
7. `Register.html` – Registrasi Pengguna (validasi input, pencegahan email duplikat)

## Cara Menjalankan
```bash
npm install
npm run dev
```

Untuk membuat build produksi:
```bash
npm run build
npm run preview
```

> **Catatan Akademik:** Fitur autentikasi (Login/Register) dan checkout pembayaran pada website ini merupakan **simulasi frontend** menggunakan `localStorage`, bukan sistem keamanan atau transaksi pembayaran produksi.


<script setup>
import { CATEGORIES } from '../data/products.js';
import { buildCategoryUrl } from '../utils/format.js';
</script>

<template>
  <footer class="site-footer">
    <div class="container footer-grid">
      <div class="footer-brand">
        <a href="index.html" class="footer-logo">
          <span class="footer-logo-mark" aria-hidden="true">P</span>
          <div>
            <strong>PAPERLY</strong>
            <span>Stationery Store</span>
          </div>
        </a>
        <p class="footer-tagline">
          Everything You Need to Write Your Story.
        </p>
        <p class="footer-desc">
          Menghadirkan perlengkapan alat tulis estetik, fungsional, dan berkualitas untuk pelajar, mahasiswa, dan profesional.
        </p>
      </div>

      <div>
        <h3 class="footer-heading">Navigasi</h3>
        <ul class="footer-list">
          <li><a href="index.html">Beranda</a></li>
          <li><a href="Product.html">Katalog Produk</a></li>
          <li><a href="Cart.html">Keranjang Belanja</a></li>
          <li><a href="Checkout.html">Checkout Pesanan</a></li>
          <li><a href="Login.html">Masuk Akun</a></li>
          <li><a href="Register.html">Daftar Akun</a></li>
        </ul>
      </div>

      <div>
        <h3 class="footer-heading">Kategori Produk</h3>
        <ul class="footer-list">
          <li v-for="category in CATEGORIES" :key="category.id">
            <a :href="buildCategoryUrl(category.name)">{{ category.name }}</a>
          </li>
        </ul>
      </div>

      <div>
        <h3 class="footer-heading">Hubungi Kami</h3>
        <ul class="footer-list footer-contact">
          <li>Jl. Pendidikan No. 28, Bandung</li>
          <li>halo@paperly-store.id</li>
          <li>+62 812-3456-7890</li>
          <li>Senin – Sabtu, 08.00 – 17.00 WIB</li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <span>&copy; 2026 PAPERLY Stationery Store. Proyek Akhir Perkuliahan Web E-Commerce.</span>
        <span>Dibangun dengan Vue 3 &amp; Vite</span>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: var(--color-ink);
  color: #e6ebe6;
  padding-top: 60px;
  margin-top: auto;
}

.footer-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.1fr;
  gap: 36px;
  padding-bottom: 48px;
}

.footer-logo {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.footer-logo-mark {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  background-color: var(--color-sage);
  color: var(--color-white);
  font-weight: 700;
  font-size: 1.1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.footer-logo strong {
  display: block;
  font-size: 1.05rem;
  letter-spacing: 0.06em;
  color: var(--color-white);
}

.footer-logo span {
  font-size: 0.72rem;
  color: #b7c3b8;
}

.footer-tagline {
  color: var(--color-accent);
  font-weight: 500;
  font-size: 0.92rem;
  margin-bottom: 10px;
}

.footer-desc {
  font-size: 0.88rem;
  color: #b7c3b8;
  max-width: 320px;
}

.footer-heading {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-white);
  margin-bottom: 16px;
}

.footer-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.88rem;
  color: #c6d0c7;
}

.footer-list a {
  transition: color var(--transition);
}

.footer-list a:hover {
  color: var(--color-accent);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 18px 0;
  font-size: 0.82rem;
  color: #a6b4a8;
}

.footer-bottom-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

@media (max-width: 960px) {
  .footer-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>


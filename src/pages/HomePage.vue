<script setup>
import { computed, reactive, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import CategoryCard from '../components/CategoryCard.vue';
import ProductCard from '../components/ProductCard.vue';
import { CATEGORIES, PRODUCTS, getCategoryCount } from '../data/products.js';
import { showToast } from '../utils/toast.js';
import heroImage from '../assets/images/hero-stationery.svg';

const bestSellers = computed(() => PRODUCTS.filter((item) => item.isBestSeller).slice(0, 4));
const newArrivals = computed(() => PRODUCTS.filter((item) => item.isNew).slice(0, 4));

const benefits = [
  {
    title: 'Kertas Ramah Pena',
    desc: 'Menggunakan kertas 90–100 gsm pilihan yang nyaman dipakai menulis tanpa tinta tembus.',
  },
  {
    title: 'Desain Minimalis & Rapi',
    desc: 'Palet warna lembut yang menenangkan fokus saat belajar di kampus maupun bekerja.',
  },
  {
    title: 'Kemas Aman & Cepat',
    desc: 'Setiap buku dan binder dilapisi pelindung sudut agar tiba dalam kondisi mulus.',
  },
  {
    title: 'Harga Bersahabat',
    desc: 'Kualitas stationery studio dengan harga yang tetap terjangkau untuk pelajar dan mahasiswa.',
  },
];

const contactForm = reactive({
  name: '',
  email: '',
  message: '',
});

const contactSent = ref(false);
const contactError = ref('');

function handleContactSubmit() {
  contactError.value = '';
  if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
    contactError.value = 'Mohon lengkapi nama, email, dan pesan Anda.';
    return;
  }
  contactSent.value = true;
  showToast('Pesan Anda telah dicatat (simulasi). Terima kasih telah menghubungi PAPERLY!', 'success');
  contactForm.name = '';
  contactForm.email = '';
  contactForm.message = '';
}
</script>

<template>
  <div class="page-shell">
    <Navbar active-page="home" />

    <main class="page-main">
      <!-- Hero Banner -->
      <section class="hero-section">
        <div class="container hero-grid">
          <div class="hero-content">
            <span class="hero-promo">Promo Semester Baru &bull; Gratis Ongkir Simulasi</span>
            <h1 class="hero-title">
              Alat Tulis Minimalis untuk Setiap Cerita &amp; Catatan Terbaikmu.
            </h1>
            <p class="hero-tagline">
              <strong>PAPERLY</strong> &mdash; Everything You Need to Write Your Story.
            </p>
            <p class="hero-desc">
              Temukan notebook linen, binder estetik, pulpen gel halus, dan perlengkapan meja belajar yang dirancang untuk mendukung produktivitas sekolah, kuliah, dan kantor.
            </p>
            <div class="hero-actions">
              <a href="Product.html" class="btn btn-primary btn-lg">Belanja Sekarang</a>
              <a href="#best-sellers" class="btn btn-outline btn-lg">Lihat Produk Terlaris</a>
            </div>
            <div class="hero-stats">
              <div>
                <strong>12+</strong>
                <span>Produk Pilihan</span>
              </div>
              <div>
                <strong>4</strong>
                <span>Kategori Utama</span>
              </div>
              <div>
                <strong>100%</strong>
                <span>Kualitas Terkurasi</span>
              </div>
            </div>
          </div>

          <div class="hero-visual">
            <div class="hero-card">
              <img :src="heroImage" alt="Koleksi alat tulis minimalis PAPERLY" />
              <div class="hero-floating-badge">
                <span class="badge badge-accent">Koleksi 2026</span>
                <strong>Back to Campus Set</strong>
                <small>Mulai dari Rp 29.000</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Kategori Produk -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="section-eyebrow">Kategori Produk</span>
              <h2 class="section-title">Pilih Perlengkapan Sesuai Kebutuhanmu</h2>
              <p class="section-subtitle">
                Jelajahi koleksi alat tulis PAPERLY dari buku catatan hingga aksesori meja kerja.
              </p>
            </div>
            <a href="Product.html" class="btn btn-ghost">Semua Produk &rarr;</a>
          </div>

          <div class="grid-4">
            <CategoryCard
              v-for="category in CATEGORIES"
              :key="category.id"
              :category="category"
              :product-count="getCategoryCount(category.name)"
            />
          </div>
        </div>
      </section>

      <!-- Produk Terlaris -->
      <section id="best-sellers" class="section">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="section-eyebrow">Favorit Pelanggan</span>
              <h2 class="section-title">Produk Terlaris</h2>
              <p class="section-subtitle">
                Pilihan perlengkapan tulis yang paling sering menemani aktivitas kuliah dan kerja harian.
              </p>
            </div>
            <a href="Product.html" class="btn btn-outline">Jelajahi Katalog</a>
          </div>

          <div class="grid-4">
            <ProductCard v-for="product in bestSellers" :key="product.id" :product="product" />
          </div>
        </div>
      </section>

      <!-- Produk Terbaru -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-header">
            <div>
              <span class="section-eyebrow">Rilisan Terbaru</span>
              <h2 class="section-title">Produk Terbaru</h2>
              <p class="section-subtitle">
                Koleksi baru dengan sentuhan sage green, krem hangat, dan material tahan lama.
              </p>
            </div>
            <a href="Product.html?sort=price-asc" class="btn btn-ghost">Lihat Semua &rarr;</a>
          </div>

          <div class="grid-4">
            <ProductCard v-for="product in newArrivals" :key="product.id" :product="product" />
          </div>
        </div>
      </section>

      <!-- Keunggulan Toko & About -->
      <section id="about" class="section section-cream">
        <div class="container about-grid">
          <div class="about-story">
            <span class="section-eyebrow">Tentang PAPERLY</span>
            <h2 class="section-title">Menulis Lebih Nyaman, Belajar Lebih Terarah</h2>
            <p>
              PAPERLY lahir dari keyakinan bahwa alat tulis yang rapi dan berkualitas dapat membuat proses mencatat ide, menyusun jadwal kuliah, dan menyelesaikan pekerjaan terasa jauh lebih menyenangkan.
            </p>
            <p>
              Setiap produk di toko kami dipilih dengan perhatian pada ketebalan kertas, kenyamanan genggaman pena, serta desain minimalis yang tetap relevan untuk suasana akademik maupun ruang kerja modern.
            </p>
            <a href="Product.html" class="btn btn-accent">Mulai Pilih Alat Tulis</a>
          </div>

          <div class="benefits-grid">
            <div v-for="(benefit, index) in benefits" :key="benefit.title" class="benefit-card card-surface">
              <span class="benefit-num">0{{ index + 1 }}</span>
              <h3>{{ benefit.title }}</h3>
              <p>{{ benefit.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contact" class="section section-alt">
        <div class="container contact-grid">
          <div>
            <span class="section-eyebrow">Hubungi Kami</span>
            <h2 class="section-title">Ada Pertanyaan Seputar Produk?</h2>
            <p class="section-subtitle">
              Tim PAPERLY siap membantu rekomendasi perlengkapan kuliah, pemesanan paket seminar, maupun informasi stok.
            </p>

            <div class="contact-cards">
              <div class="contact-item card-surface">
                <strong>Alamat Studio</strong>
                <span>Jl. Pendidikan No. 28, Coblong, Kota Bandung</span>
              </div>
              <div class="contact-item card-surface">
                <strong>Email &amp; Telepon</strong>
                <span>halo@paperly-store.id &bull; +62 812-3456-7890</span>
              </div>
              <div class="contact-item card-surface">
                <strong>Jam Operasional</strong>
                <span>Senin &ndash; Sabtu, 08.00 &ndash; 17.00 WIB</span>
              </div>
            </div>
          </div>

          <form class="contact-form card-surface" @submit.prevent="handleContactSubmit">
            <h3>Kirim Pesan Cepat</h3>
            <div v-if="contactError" class="alert alert-error" style="margin-bottom: 14px;">
              {{ contactError }}
            </div>
            <div v-if="contactSent" class="alert alert-success" style="margin-bottom: 14px;">
              Pesan berhasil dikirim (simulasi frontend). Kami akan segera merespons!
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-name">Nama Lengkap</label>
              <input
                id="contact-name"
                v-model="contactForm.name"
                type="text"
                class="form-control"
                placeholder="Contoh: Nadya Putri"
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-email">Email</label>
              <input
                id="contact-email"
                v-model="contactForm.email"
                type="email"
                class="form-control"
                placeholder="nama@email.com"
              />
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-msg">Pesan</label>
              <textarea
                id="contact-msg"
                v-model="contactForm.message"
                rows="3"
                class="form-control"
                placeholder="Tulis pertanyaan Anda di sini..."
              ></textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width: 100%;">
              Kirim Pesan
            </button>
          </form>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.hero-section {
  padding: 54px 0 72px;
  background: radial-gradient(circle at top right, var(--color-sage-light) 0%, var(--color-cream) 62%);
  border-bottom: 1px solid var(--color-border);
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  align-items: center;
  gap: 44px;
}

.hero-promo {
  display: inline-flex;
  align-items: center;
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  background-color: var(--color-accent-light);
  color: #a95125;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 16px;
}

.hero-title {
  font-size: clamp(2rem, 3.8vw, 2.9rem);
  line-height: 1.18;
  font-weight: 700;
  color: var(--color-ink);
  margin-bottom: 14px;
}

.hero-tagline {
  font-size: 1.04rem;
  color: var(--color-sage-dark);
  margin-bottom: 12px;
}

.hero-desc {
  color: var(--color-muted);
  font-size: 0.98rem;
  max-width: 540px;
  margin-bottom: 26px;
}

.hero-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 34px;
}

.hero-stats {
  display: flex;
  gap: 32px;
  padding-top: 22px;
  border-top: 1px solid var(--color-border);
  flex-wrap: wrap;
}

.hero-stats strong {
  display: block;
  font-size: 1.35rem;
  color: var(--color-sage-dark);
  line-height: 1.2;
}

.hero-stats span {
  font-size: 0.82rem;
  color: var(--color-muted);
}

.hero-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
}

.hero-card img {
  width: 100%;
  height: auto;
}

.hero-floating-badge {
  position: absolute;
  left: 20px;
  bottom: 20px;
  background-color: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  padding: 12px 16px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.hero-floating-badge strong {
  font-size: 0.94rem;
  color: var(--color-ink);
}

.hero-floating-badge small {
  font-size: 0.78rem;
  color: var(--color-muted);
}

.about-grid {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 44px;
  align-items: center;
}

.about-story p {
  color: var(--color-text);
  margin-top: 14px;
  font-size: 0.96rem;
}

.about-story .btn {
  margin-top: 24px;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.benefit-card {
  padding: 22px;
}

.benefit-num {
  display: inline-block;
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--color-accent-hover);
  background-color: var(--color-accent-light);
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  margin-bottom: 10px;
}

.benefit-card h3 {
  font-size: 1rem;
  margin-bottom: 6px;
}

.benefit-card p {
  font-size: 0.86rem;
  color: var(--color-muted);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.contact-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.contact-item {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.contact-item strong {
  font-size: 0.88rem;
  color: var(--color-sage-dark);
}

.contact-item span {
  font-size: 0.92rem;
  color: var(--color-text);
}

.contact-form {
  padding: 28px;
}

.contact-form h3 {
  font-size: 1.15rem;
  margin-bottom: 16px;
}

@media (max-width: 960px) {
  .hero-grid,
  .about-grid,
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}

@media (max-width: 560px) {
  .benefits-grid {
    grid-template-columns: 1fr;
  }
}
</style>


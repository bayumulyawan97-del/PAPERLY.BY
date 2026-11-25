<script setup>
import { computed, onMounted, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import ProductCard from '../components/ProductCard.vue';
import { PRODUCTS, getProductById } from '../data/products.js';
import { addToCart } from '../utils/cart.js';
import { buildCategoryUrl, formatRupiah, getQueryParam } from '../utils/format.js';

const product = ref(null);
const quantity = ref(1);

onMounted(() => {
  const idParam = getQueryParam('id');
  const found = getProductById(idParam);
  product.value = found;
});

const relatedProducts = computed(() => {
  if (!product.value) return [];
  return PRODUCTS.filter(
    (item) => item.category === product.value.category && item.id !== product.value.id
  ).slice(0, 4);
});

function decreaseQty() {
  if (quantity.value > 1) {
    quantity.value -= 1;
  }
}

function increaseQty() {
  if (product.value && quantity.value < product.value.stock) {
    quantity.value += 1;
  }
}

function handleAddToCart() {
  if (!product.value) return;
  addToCart(product.value, quantity.value);
}
</script>

<template>
  <div class="page-shell">
    <Navbar active-page="detail" />

    <main class="page-main">
      <section class="page-banner">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="index.html">Home</a>
            <span>/</span>
            <a href="Product.html">Products</a>
            <template v-if="product">
              <span>/</span>
              <span>{{ product.name }}</span>
            </template>
          </nav>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div v-if="product" class="detail-layout">
            <div class="detail-media card-surface">
              <img :src="product.image" :alt="product.name" />
            </div>

            <div class="detail-info">
              <div class="detail-tags">
                <a :href="buildCategoryUrl(product.category)" class="badge badge-sage">
                  {{ product.category }}
                </a>
                <span v-if="product.isBestSeller" class="badge badge-accent">Produk Terlaris</span>
                <span v-else-if="product.isNew" class="badge badge-muted">Produk Baru</span>
              </div>

              <h1 class="detail-title">{{ product.name }}</h1>

              <div class="detail-price-row">
                <span class="detail-price">{{ formatRupiah(product.price) }}</span>
                <span class="detail-stock" :class="{ empty: product.stock <= 0 }">
                  {{ product.stock > 0 ? `Tersedia ${product.stock} stok` : 'Stok Habis' }}
                </span>
              </div>

              <p class="detail-description">{{ product.description }}</p>

              <div v-if="product.specs?.length" class="detail-specs card-surface">
                <h2>Spesifikasi Produk</h2>
                <ul>
                  <li v-for="spec in product.specs" :key="spec">{{ spec }}</li>
                </ul>
              </div>

              <div class="detail-purchase">
                <div class="qty-group">
                  <span class="qty-label">Jumlah</span>
                  <div class="qty-stepper">
                    <button
                      type="button"
                      class="qty-btn"
                      :disabled="quantity <= 1"
                      aria-label="Kurangi jumlah"
                      @click="decreaseQty"
                    >
                      &minus;
                    </button>
                    <span class="qty-value">{{ quantity }}</span>
                    <button
                      type="button"
                      class="qty-btn"
                      :disabled="quantity >= product.stock"
                      aria-label="Tambah jumlah"
                      @click="increaseQty"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div class="detail-actions">
                  <button
                    type="button"
                    class="btn btn-primary btn-lg"
                    :disabled="product.stock <= 0"
                    @click="handleAddToCart"
                  >
                    Tambah ke Keranjang
                  </button>
                  <a href="Product.html" class="btn btn-outline btn-lg">
                    Kembali ke Produk
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="empty-state">
            <h3>Produk Tidak Ditemukan</h3>
            <p>
              Produk yang Anda cari belum tersedia atau parameter ID produk tidak valid. Silakan pilih produk dari halaman katalog.
            </p>
            <a href="Product.html" class="btn btn-primary">Kembali ke Produk</a>
          </div>

          <div v-if="relatedProducts.length > 0" class="related-section">
            <div class="section-header">
              <div>
                <span class="section-eyebrow">Produk Serupa</span>
                <h2 class="section-title">Rekomendasi Kategori {{ product.category }}</h2>
              </div>
            </div>
            <div class="grid-4">
              <ProductCard v-for="item in relatedProducts" :key="item.id" :product="item" />
            </div>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.detail-layout {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 44px;
  align-items: start;
}

.detail-media {
  overflow: hidden;
  border-radius: var(--radius-lg);
  background-color: var(--color-cream);
}

.detail-media img {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
}

.detail-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.detail-title {
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  line-height: 1.25;
  margin-bottom: 14px;
}

.detail-price-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 18px;
}

.detail-price {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-sage-dark);
}

.detail-stock {
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--color-success);
  background-color: var(--color-success-light);
  padding: 5px 12px;
  border-radius: var(--radius-pill);
}

.detail-stock.empty {
  color: var(--color-danger);
  background-color: var(--color-danger-light);
}

.detail-description {
  color: var(--color-text);
  font-size: 0.97rem;
  margin-bottom: 22px;
}

.detail-specs {
  padding: 18px 22px;
  margin-bottom: 24px;
}

.detail-specs h2 {
  font-size: 0.95rem;
  margin-bottom: 10px;
}

.detail-specs ul {
  padding-left: 18px;
  color: var(--color-muted);
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail-purchase {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding-top: 18px;
  border-top: 1px solid var(--color-border);
}

.qty-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.qty-label {
  font-weight: 600;
  font-size: 0.92rem;
}

.qty-stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background-color: var(--color-white);
  padding: 4px;
}

.qty-btn {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background-color: var(--color-cream);
  color: var(--color-ink);
  font-weight: 600;
  font-size: 1.05rem;
}

.qty-btn:hover:not(:disabled) {
  background-color: var(--color-sage-light);
}

.qty-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.qty-value {
  min-width: 44px;
  text-align: center;
  font-weight: 600;
}

.detail-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.related-section {
  margin-top: 68px;
  padding-top: 48px;
  border-top: 1px solid var(--color-border);
}

@media (max-width: 900px) {
  .detail-layout {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
</style>


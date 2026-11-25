<script setup>
import { computed, onMounted, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import ProductCard from '../components/ProductCard.vue';
import { CATEGORIES, PRODUCTS } from '../data/products.js';
import { getQueryParam } from '../utils/format.js';

const searchQuery = ref('');
const selectedCategory = ref('Semua');
const sortBy = ref('default');

const categoryOptions = computed(() => ['Semua', ...CATEGORIES.map((c) => c.name)]);

onMounted(() => {
  const urlCategory = getQueryParam('category');
  const urlSort = getQueryParam('sort');

  if (urlCategory && categoryOptions.value.includes(urlCategory)) {
    selectedCategory.value = urlCategory;
  }
  if (urlSort === 'price-asc' || urlSort === 'price-desc') {
    sortBy.value = urlSort;
  }
});

const filteredProducts = computed(() => {
  const keyword = searchQuery.value.trim().toLowerCase();

  let list = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory.value === 'Semua' || product.category === selectedCategory.value;
    const matchesSearch =
      !keyword ||
      product.name.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword) ||
      product.description.toLowerCase().includes(keyword);

    return matchesCategory && matchesSearch;
  });

  if (sortBy.value === 'price-asc') {
    list = [...list].sort((a, b) => a.price - b.price);
  } else if (sortBy.value === 'price-desc') {
    list = [...list].sort((a, b) => b.price - a.price);
  }

  return list;
});

function selectCategory(category) {
  selectedCategory.value = category;
}

function resetFilters() {
  searchQuery.value = '';
  selectedCategory.value = 'Semua';
  sortBy.value = 'default';
}
</script>

<template>
  <div class="page-shell">
    <Navbar active-page="products" />

    <main class="page-main">
      <section class="page-banner">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="index.html">Home</a>
            <span>/</span>
            <span>Katalog Produk</span>
          </nav>
          <h1 class="section-title">Katalog Alat Tulis PAPERLY</h1>
          <p class="section-subtitle">
            Temukan buku catatan, binder, pena presisi, perlengkapan sekolah, dan aksesori meja berkualitas.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <!-- Controls Bar -->
          <div class="catalog-controls card-surface">
            <div class="search-box">
              <label for="search-product" class="sr-only">Cari produk</label>
              <input
                id="search-product"
                v-model="searchQuery"
                type="search"
                class="form-control"
                placeholder="Cari notebook, gel pen, binder, sticky notes..."
              />
            </div>

            <div class="sort-box">
              <label for="sort-price" class="sort-label">Urutkan:</label>
              <select id="sort-price" v-model="sortBy" class="form-control">
                <option value="default">Rekomendasi</option>
                <option value="price-asc">Harga Termurah</option>
                <option value="price-desc">Harga Termahal</option>
              </select>
            </div>
          </div>

          <!-- Category Filter Pills -->
          <div class="filter-bar">
            <div class="category-pills" role="group" aria-label="Filter kategori produk">
              <button
                v-for="cat in categoryOptions"
                :key="cat"
                type="button"
                class="pill-btn"
                :class="{ active: selectedCategory === cat }"
                @click="selectCategory(cat)"
              >
                {{ cat }}
              </button>
            </div>

            <span class="result-count">
              Menampilkan <strong>{{ filteredProducts.length }}</strong> dari {{ PRODUCTS.length }} produk
            </span>
          </div>

          <!-- Products Grid -->
          <div v-if="filteredProducts.length > 0" class="grid-4">
            <ProductCard
              v-for="product in filteredProducts"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- Empty State -->
          <div v-else class="empty-state">
            <h3>Produk tidak ditemukan</h3>
            <p>
              Tidak ada produk yang cocok dengan kata kunci atau kategori yang dipilih. Coba ubah filter pencarian Anda.
            </p>
            <button type="button" class="btn btn-primary" @click="resetFilters">
              Reset Filter
            </button>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
}

.catalog-controls {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 16px;
  padding: 18px;
  margin-bottom: 20px;
  align-items: center;
}

.sort-box {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-label {
  font-size: 0.88rem;
  font-weight: 500;
  color: var(--color-muted);
  white-space: nowrap;
}

.filter-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.category-pills {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.pill-btn {
  padding: 8px 16px;
  border-radius: var(--radius-pill);
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  color: var(--color-text);
  font-size: 0.85rem;
  font-weight: 500;
  transition: all var(--transition);
}

.pill-btn:hover {
  border-color: var(--color-sage);
  color: var(--color-sage-dark);
}

.pill-btn.active {
  background-color: var(--color-sage);
  border-color: var(--color-sage);
  color: var(--color-white);
}

.result-count {
  font-size: 0.88rem;
  color: var(--color-muted);
}

@media (max-width: 720px) {
  .catalog-controls {
    grid-template-columns: 1fr;
  }
}
</style>


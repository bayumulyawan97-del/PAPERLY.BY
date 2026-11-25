<script setup>
import { computed } from 'vue';
import { addToCart } from '../utils/cart.js';
import { buildCategoryUrl, buildDetailUrl, formatRupiah } from '../utils/format.js';

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const detailUrl = computed(() => buildDetailUrl(props.product.id));
const categoryUrl = computed(() => buildCategoryUrl(props.product.category));

function handleAddToCart() {
  addToCart(props.product, 1);
}
</script>

<template>
  <article class="product-card">
    <a :href="detailUrl" class="product-media">
      <img :src="props.product.image" :alt="props.product.name" loading="lazy" />
      <div class="product-badges">
        <span v-if="props.product.isBestSeller" class="badge badge-accent">Terlaris</span>
        <span v-else-if="props.product.isNew" class="badge badge-sage">Terbaru</span>
      </div>
    </a>

    <div class="product-body">
      <a :href="categoryUrl" class="product-category">
        {{ props.product.category }}
      </a>

      <h3 class="product-title">
        <a :href="detailUrl">{{ props.product.name }}</a>
      </h3>

      <div class="product-meta">
        <span class="product-price">{{ formatRupiah(props.product.price) }}</span>
        <span class="product-stock" :class="{ 'out-of-stock': props.product.stock <= 0 }">
          {{ props.product.stock > 0 ? `Stok: ${props.product.stock}` : 'Stok habis' }}
        </span>
      </div>

      <div class="product-actions">
        <a :href="detailUrl" class="btn btn-outline btn-sm">Detail</a>
        <button
          type="button"
          class="btn btn-primary btn-sm"
          :disabled="props.product.stock <= 0"
          @click="handleAddToCart"
        >
          + Keranjang
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.product-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-sage-soft);
}

.product-media {
  position: relative;
  aspect-ratio: 1 / 1;
  background-color: var(--color-cream);
  overflow: hidden;
}

.product-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
}

.product-card:hover .product-media img {
  transform: scale(1.04);
}

.product-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  display: flex;
  gap: 6px;
}

.product-body {
  display: flex;
  flex-direction: column;
  padding: 18px;
  gap: 8px;
  flex: 1;
}

.product-category {
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--color-sage);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.product-category:hover {
  text-decoration: underline;
}

.product-title {
  font-size: 0.98rem;
  font-weight: 600;
  color: var(--color-ink);
  line-height: 1.4;
  min-height: 2.75em;
}

.product-title a:hover {
  color: var(--color-sage-dark);
}

.product-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-top: auto;
  padding-top: 6px;
}

.product-price {
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--color-sage-dark);
}

.product-stock {
  font-size: 0.78rem;
  color: var(--color-muted);
}

.product-stock.out-of-stock {
  color: var(--color-danger);
  font-weight: 600;
}

.product-actions {
  display: grid;
  grid-template-columns: 1fr 1.35fr;
  gap: 8px;
  margin-top: 8px;
}
</style>


<script setup>
import { computed } from 'vue';
import { buildCategoryUrl } from '../utils/format.js';

const props = defineProps({
  category: {
    type: Object,
    required: true,
  },
  productCount: {
    type: Number,
    default: 0,
  },
});

const categoryUrl = computed(() => buildCategoryUrl(props.category.name));
</script>

<template>
  <a :href="categoryUrl" class="category-card">
    <div class="category-icon" aria-hidden="true">
      <svg v-if="props.category.icon === 'book'" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        <path d="M8 7h8" />
        <path d="M8 11h6" />
      </svg>
      <svg v-else-if="props.category.icon === 'pen'" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19 19 12l3 3-7 7-3-3Z" />
        <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5Z" />
        <path d="m2 2 7.586 7.586" />
        <circle cx="11" cy="11" r="2" />
      </svg>
      <svg v-else-if="props.category.icon === 'backpack'" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z" />
        <path d="M9 6V4a3 3 0 0 1 6 0v2" />
        <path d="M8 21v-5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v5" />
        <path d="M8 10h8" />
      </svg>
      <svg v-else width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3l1.9 5.8L20 10.5l-5 3.6 1.9 5.9L12 16.4 7.1 20 9 14.1 4 10.5l6.1-1.7Z" />
      </svg>
    </div>

    <div class="category-body">
      <div class="category-top">
        <h3>{{ props.category.name }}</h3>
        <span class="category-count">{{ props.productCount }} produk</span>
      </div>
      <p>{{ props.category.description }}</p>
      <span class="category-cta">Lihat Koleksi &rarr;</span>
    </div>
  </a>
</template>

<style scoped>
.category-card {
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 24px;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  transition: transform var(--transition), box-shadow var(--transition), border-color var(--transition);
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  border-color: var(--color-sage-soft);
}

.category-icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background-color: var(--color-sage-light);
  color: var(--color-sage-dark);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.category-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.category-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.category-top h3 {
  font-size: 1.04rem;
  font-weight: 600;
  color: var(--color-ink);
}

.category-count {
  font-size: 0.76rem;
  font-weight: 600;
  color: var(--color-sage-dark);
  background-color: var(--color-cream);
  padding: 3px 10px;
  border-radius: var(--radius-pill);
  white-space: nowrap;
}

.category-body p {
  font-size: 0.87rem;
  color: var(--color-muted);
  flex: 1;
}

.category-cta {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--color-sage-dark);
  margin-top: 4px;
}
</style>


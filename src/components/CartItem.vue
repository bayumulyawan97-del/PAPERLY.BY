<script setup>
import { computed } from 'vue';
import { buildDetailUrl, formatRupiah } from '../utils/format.js';

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update-qty', 'remove']);

const detailUrl = computed(() => buildDetailUrl(props.item.id));
const lineTotal = computed(() => props.item.price * props.item.quantity);

function decrease() {
  if (props.item.quantity > 1) {
    emit('update-qty', props.item.id, props.item.quantity - 1);
  }
}

function increase() {
  if (props.item.quantity < props.item.stock) {
    emit('update-qty', props.item.id, props.item.quantity + 1);
  }
}

function removeItem() {
  emit('remove', props.item.id);
}
</script>

<template>
  <div class="cart-item card-surface">
    <a :href="detailUrl" class="cart-item-img">
      <img :src="props.item.image" :alt="props.item.name" />
    </a>

    <div class="cart-item-info">
      <span class="cart-item-category">{{ props.item.category }}</span>
      <h3 class="cart-item-name">
        <a :href="detailUrl">{{ props.item.name }}</a>
      </h3>
      <p class="cart-item-unit">{{ formatRupiah(props.item.price) }} / pcs</p>
      <p class="cart-item-stock">Tersedia {{ props.item.stock }} unit</p>
    </div>

    <div class="cart-item-controls">
      <div class="qty-stepper" aria-label="Pengatur jumlah produk">
        <button
          type="button"
          class="qty-btn"
          :disabled="props.item.quantity <= 1"
          aria-label="Kurangi jumlah"
          @click="decrease"
        >
          &minus;
        </button>
        <span class="qty-value">{{ props.item.quantity }}</span>
        <button
          type="button"
          class="qty-btn"
          :disabled="props.item.quantity >= props.item.stock"
          aria-label="Tambah jumlah"
          @click="increase"
        >
          +
        </button>
      </div>

      <div class="cart-item-subtotal">
        <small>Subtotal</small>
        <strong>{{ formatRupiah(lineTotal) }}</strong>
      </div>

      <button type="button" class="btn btn-danger-outline btn-sm" @click="removeItem">
        Hapus
      </button>
    </div>
  </div>
</template>

<style scoped>
.cart-item {
  display: grid;
  grid-template-columns: 96px 1fr auto;
  align-items: center;
  gap: 20px;
  padding: 18px;
}

.cart-item-img {
  width: 96px;
  height: 96px;
  border-radius: var(--radius-sm);
  overflow: hidden;
  background-color: var(--color-cream);
  border: 1px solid var(--color-border);
}

.cart-item-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-category {
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--color-sage);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.cart-item-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 2px 0 4px;
}

.cart-item-name a:hover {
  color: var(--color-sage-dark);
}

.cart-item-unit {
  font-size: 0.88rem;
  color: var(--color-text);
  font-weight: 500;
}

.cart-item-stock {
  font-size: 0.78rem;
  color: var(--color-muted);
}

.cart-item-controls {
  display: flex;
  align-items: center;
  gap: 20px;
}

.qty-stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-pill);
  background-color: var(--color-cream);
  padding: 3px;
}

.qty-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background-color: var(--color-white);
  color: var(--color-ink);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color var(--transition);
}

.qty-btn:hover:not(:disabled) {
  background-color: var(--color-sage-light);
}

.qty-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}

.qty-value {
  min-width: 34px;
  text-align: center;
  font-weight: 600;
  font-size: 0.92rem;
}

.cart-item-subtotal {
  text-align: right;
  min-width: 110px;
}

.cart-item-subtotal small {
  display: block;
  font-size: 0.74rem;
  color: var(--color-muted);
}

.cart-item-subtotal strong {
  font-size: 0.98rem;
  color: var(--color-sage-dark);
}

@media (max-width: 760px) {
  .cart-item {
    grid-template-columns: 80px 1fr;
  }

  .cart-item-img {
    width: 80px;
    height: 80px;
  }

  .cart-item-controls {
    grid-column: 1 / -1;
    justify-content: space-between;
    padding-top: 12px;
    border-top: 1px solid var(--color-cream-alt);
    flex-wrap: wrap;
  }
}
</style>


<script setup>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import CartItem from '../components/CartItem.vue';
import {
  cartItems,
  cartSubtotal,
  cartTotalItems,
  clearCart,
  removeFromCart,
  updateCartQuantity,
} from '../utils/cart.js';
import { formatRupiah } from '../utils/format.js';
</script>

<template>
  <div class="page-shell">
    <Navbar active-page="cart" />

    <main class="page-main">
      <section class="page-banner">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="index.html">Home</a>
            <span>/</span>
            <span>Keranjang Belanja</span>
          </nav>
          <h1 class="section-title">Keranjang Belanja</h1>
          <p class="section-subtitle">
            Periksa kembali alat tulis yang Anda pilih sebelum melanjutkan ke halaman checkout.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <div v-if="cartItems.length > 0" class="cart-layout">
            <div class="cart-list">
              <div class="cart-list-header">
                <span>{{ cartTotalItems }} item di keranjang</span>
                <button type="button" class="btn btn-danger-outline btn-sm" @click="clearCart">
                  Kosongkan Keranjang
                </button>
              </div>

              <CartItem
                v-for="item in cartItems"
                :key="item.id"
                :item="item"
                @update-qty="updateCartQuantity"
                @remove="removeFromCart"
              />
            </div>

            <aside class="cart-summary card-surface">
              <h2>Ringkasan Belanja</h2>

              <div class="summary-rows">
                <div class="summary-row">
                  <span>Total Produk</span>
                  <span>{{ cartTotalItems }} pcs</span>
                </div>
                <div class="summary-row">
                  <span>Subtotal Belanja</span>
                  <span>{{ formatRupiah(cartSubtotal) }}</span>
                </div>
                <div class="summary-row">
                  <span>Biaya Pengiriman</span>
                  <span class="free-shipping">Gratis (Simulasi)</span>
                </div>
              </div>

              <div class="summary-total">
                <span>Total Pembayaran</span>
                <strong>{{ formatRupiah(cartSubtotal) }}</strong>
              </div>

              <div class="summary-actions">
                <a href="Checkout.html" class="btn btn-primary btn-lg" style="width: 100%;">
                  Checkout Sekarang
                </a>
                <a href="Product.html" class="btn btn-outline" style="width: 100%;">
                  Lanjut Belanja
                </a>
              </div>
            </aside>
          </div>

          <div v-else class="empty-state">
            <h3>Keranjang Belanja Masih Kosong</h3>
            <p>
              Belum ada alat tulis di keranjang Anda. Jelajahi katalog PAPERLY untuk menemukan notebook, pena, dan perlengkapan kerja favorit.
            </p>
            <a href="Product.html" class="btn btn-primary">Lanjut Belanja</a>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.cart-layout {
  display: grid;
  grid-template-columns: 1.4fr 0.85fr;
  gap: 28px;
  align-items: start;
}

.cart-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.cart-list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  font-size: 0.92rem;
  color: var(--color-muted);
}

.cart-summary {
  padding: 24px;
  position: sticky;
  top: 96px;
}

.cart-summary h2 {
  font-size: 1.15rem;
  margin-bottom: 18px;
}

.summary-rows {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.92rem;
  color: var(--color-text);
}

.free-shipping {
  color: var(--color-success);
  font-weight: 600;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  font-size: 1rem;
  font-weight: 600;
}

.summary-total strong {
  font-size: 1.3rem;
  color: var(--color-sage-dark);
}

.summary-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-width: 900px) {
  .cart-layout {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }
}
</style>


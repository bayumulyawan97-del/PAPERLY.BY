<script setup>
import { onMounted, reactive, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import { cartItems, cartSubtotal, cartTotalItems, clearCart } from '../utils/cart.js';
import { currentUser } from '../utils/auth.js';
import { formatRupiah } from '../utils/format.js';
import { saveSimulatedOrder } from '../utils/orders.js';
import { showToast } from '../utils/toast.js';

const paymentMethods = [
  {
    id: 'bank-va',
    label: 'Transfer Bank Virtual Account (Simulasi)',
    desc: 'Simulasi pembayaran melalui Virtual Account BCA / Mandiri / BNI.',
  },
  {
    id: 'ewallet',
    label: 'E-Wallet QRIS / GoPay / OVO (Simulasi)',
    desc: 'Simulasi pembayaran instan dompet digital tanpa transaksi nyata.',
  },
  {
    id: 'cod',
    label: 'Bayar di Tempat / COD (Simulasi)',
    desc: 'Simulasi pembayaran tunai saat paket diterima di alamat tujuan.',
  },
];

const form = reactive({
  fullName: '',
  phone: '',
  address: '',
  notes: '',
  paymentMethod: 'bank-va',
});

const formErrors = reactive({
  fullName: '',
  phone: '',
  address: '',
});

const confirmedOrder = ref(null);

onMounted(() => {
  if (currentUser.value?.fullName) {
    form.fullName = currentUser.value.fullName;
  }
});

function validateCheckout() {
  formErrors.fullName = '';
  formErrors.phone = '';
  formErrors.address = '';

  let isValid = true;
  if (!form.fullName.trim() || form.fullName.trim().length < 3) {
    formErrors.fullName = 'Nama lengkap minimal 3 karakter.';
    isValid = false;
  }
  const cleanPhone = form.phone.replace(/[\s-]/g, '');
  if (!/^[0-9+]{9,15}$/.test(cleanPhone)) {
    formErrors.phone = 'Masukkan nomor telepon yang valid (9–15 digit).';
    isValid = false;
  }
  if (!form.address.trim() || form.address.trim().length < 10) {
    formErrors.address = 'Mohon isi alamat lengkap (jalan, kota, dan kode pos).';
    isValid = false;
  }

  return isValid;
}

function handleCheckoutSubmit() {
  if (cartItems.value.length === 0) return;
  if (!validateCheckout()) {
    showToast('Mohon periksa kembali data pengiriman Anda.', 'error');
    return;
  }

  const selectedPayment = paymentMethods.find((m) => m.id === form.paymentMethod);

  const saved = saveSimulatedOrder({
    customerName: form.fullName.trim(),
    phone: form.phone.trim(),
    address: form.address.trim(),
    notes: form.notes.trim(),
    paymentMethod: selectedPayment ? selectedPayment.label : form.paymentMethod,
    totalItems: cartTotalItems.value,
    totalAmount: cartSubtotal.value,
    items: cartItems.value.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    })),
  });

  confirmedOrder.value = saved;
  clearCart();
  showToast(`Pesanan ${saved.orderCode} berhasil dikonfirmasi!`, 'success', 4500);
}
</script>

<template>
  <div class="page-shell">
    <Navbar active-page="checkout" />

    <main class="page-main">
      <section class="page-banner">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="index.html">Home</a>
            <span>/</span>
            <a href="Cart.html">Keranjang</a>
            <span>/</span>
            <span>Checkout</span>
          </nav>
          <h1 class="section-title">Checkout Pesanan</h1>
          <p class="section-subtitle">
            Lengkapi informasi pengiriman dan pilih metode pembayaran simulasi untuk menyelesaikan pesanan.
          </p>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <!-- Confirmed Order Success View -->
          <div v-if="confirmedOrder" class="order-success card-surface">
            <span class="badge badge-sage">Pesanan Berhasil (Simulasi)</span>
            <h2>Terima Kasih, {{ confirmedOrder.customerName }}!</h2>
            <p class="order-code">
              Kode Pesanan: <strong>{{ confirmedOrder.orderCode }}</strong>
            </p>
            <p class="order-desc">
              Pesanan Anda telah dicatat pada simulasi frontend PAPERLY dan keranjang belanja telah dikosongkan otomatis.
            </p>

            <div class="order-meta-box">
              <div>
                <small>Metode Pembayaran</small>
                <strong>{{ confirmedOrder.paymentMethod }}</strong>
              </div>
              <div>
                <small>Total Pembayaran</small>
                <strong>{{ formatRupiah(confirmedOrder.totalAmount) }}</strong>
              </div>
              <div>
                <small>Alamat Pengiriman</small>
                <strong>{{ confirmedOrder.address }}</strong>
              </div>
            </div>

            <div class="order-success-actions">
              <a href="Product.html" class="btn btn-primary btn-lg">Belanja Lagi</a>
              <a href="index.html" class="btn btn-outline btn-lg">Kembali ke Beranda</a>
            </div>
          </div>

          <!-- Active Checkout Form -->
          <div v-else-if="cartItems.length > 0" class="checkout-layout">
            <form class="checkout-form card-surface" @submit.prevent="handleCheckoutSubmit" novalidate>
              <h2>Informasi Pengiriman</h2>

              <div class="alert alert-info" style="margin-bottom: 20px;">
                Pembayaran pada halaman ini bersifat simulasi untuk proyek akhir perkuliahan dan tidak memproses transaksi keuangan nyata.
              </div>

              <div class="form-group">
                <label class="form-label" for="checkout-name">Nama Lengkap *</label>
                <input
                  id="checkout-name"
                  v-model="form.fullName"
                  type="text"
                  class="form-control"
                  placeholder="Masukkan nama lengkap penerima"
                />
                <span v-if="formErrors.fullName" class="form-error">{{ formErrors.fullName }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="checkout-phone">Nomor Telepon / WhatsApp *</label>
                <input
                  id="checkout-phone"
                  v-model="form.phone"
                  type="tel"
                  class="form-control"
                  placeholder="Contoh: 081234567890"
                />
                <span v-if="formErrors.phone" class="form-error">{{ formErrors.phone }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="checkout-address">Alamat Lengkap *</label>
                <textarea
                  id="checkout-address"
                  v-model="form.address"
                  rows="3"
                  class="form-control"
                  placeholder="Nama jalan, nomor rumah, kecamatan, kota, dan kode pos"
                ></textarea>
                <span v-if="formErrors.address" class="form-error">{{ formErrors.address }}</span>
              </div>

              <div class="form-group">
                <label class="form-label" for="checkout-notes">Catatan Pesanan (Opsional)</label>
                <input
                  id="checkout-notes"
                  v-model="form.notes"
                  type="text"
                  class="form-control"
                  placeholder="Contoh: Tolong bungkus dengan bubble wrap tambahan"
                />
              </div>

              <div class="form-group">
                <span class="form-label">Metode Pembayaran Simulasi *</span>
                <div class="payment-options">
                  <label
                    v-for="method in paymentMethods"
                    :key="method.id"
                    class="payment-card"
                    :class="{ selected: form.paymentMethod === method.id }"
                  >
                    <input
                      v-model="form.paymentMethod"
                      type="radio"
                      name="paymentMethod"
                      :value="method.id"
                    />
                    <div>
                      <strong>{{ method.label }}</strong>
                      <small>{{ method.desc }}</small>
                    </div>
                  </label>
                </div>
              </div>

              <div class="checkout-submit-row">
                <a href="Cart.html" class="btn btn-outline">Kembali ke Keranjang</a>
                <button type="submit" class="btn btn-primary btn-lg">
                  Konfirmasi Pesanan
                </button>
              </div>
            </form>

            <!-- Order Summary -->
            <aside class="order-summary card-surface">
              <h2>Ringkasan Pesanan</h2>
              <ul class="order-items-list">
                <li v-for="item in cartItems" :key="item.id" class="order-item-row">
                  <div>
                    <strong>{{ item.name }}</strong>
                    <small>{{ item.quantity }} x {{ formatRupiah(item.price) }}</small>
                  </div>
                  <span>{{ formatRupiah(item.price * item.quantity) }}</span>
                </li>
              </ul>

              <div class="summary-breakdown">
                <div class="summary-line">
                  <span>Total Item</span>
                  <span>{{ cartTotalItems }} pcs</span>
                </div>
                <div class="summary-line">
                  <span>Ongkos Kirim</span>
                  <span class="free-text">Gratis</span>
                </div>
              </div>

              <div class="summary-grand-total">
                <span>Total Pembayaran</span>
                <strong>{{ formatRupiah(cartSubtotal) }}</strong>
              </div>
            </aside>
          </div>

          <!-- Empty Cart Fallback -->
          <div v-else class="empty-state">
            <h3>Tidak Ada Produk untuk Di-Checkout</h3>
            <p>
              Keranjang belanja Anda saat ini kosong. Tambahkan produk alat tulis terlebih dahulu sebelum melakukan checkout.
            </p>
            <a href="Product.html" class="btn btn-primary">Jelajahi Produk</a>
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.checkout-layout {
  display: grid;
  grid-template-columns: 1.35fr 0.85fr;
  gap: 28px;
  align-items: start;
}

.checkout-form {
  padding: 28px;
}

.checkout-form h2,
.order-summary h2 {
  font-size: 1.2rem;
  margin-bottom: 16px;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.payment-card {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px 16px;
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: border-color var(--transition), background-color var(--transition);
}

.payment-card.selected {
  border-color: var(--color-sage);
  background-color: var(--color-sage-light);
}

.payment-card input {
  margin-top: 4px;
  accent-color: var(--color-sage);
}

.payment-card strong {
  display: block;
  font-size: 0.92rem;
}

.payment-card small {
  color: var(--color-muted);
  font-size: 0.82rem;
}

.checkout-submit-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 22px;
  flex-wrap: wrap;
}

.order-summary {
  padding: 24px;
  position: sticky;
  top: 96px;
}

.order-items-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--color-border);
}

.order-item-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 0.9rem;
}

.order-item-row strong {
  display: block;
  font-weight: 500;
}

.order-item-row small {
  color: var(--color-muted);
  font-size: 0.8rem;
}

.order-item-row span {
  font-weight: 600;
  white-space: nowrap;
}

.summary-breakdown {
  padding: 16px 0;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}

.free-text {
  color: var(--color-success);
  font-weight: 600;
}

.summary-grand-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  font-weight: 600;
}

.summary-grand-total strong {
  font-size: 1.3rem;
  color: var(--color-sage-dark);
}

.order-success {
  max-width: 680px;
  margin: 0 auto;
  padding: 40px 32px;
  text-align: center;
}

.order-success h2 {
  font-size: 1.7rem;
  margin: 14px 0 8px;
}

.order-code {
  font-size: 1.05rem;
  color: var(--color-sage-dark);
  margin-bottom: 10px;
}

.order-desc {
  color: var(--color-muted);
  max-width: 520px;
  margin: 0 auto 24px;
}

.order-meta-box {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  text-align: left;
  background-color: var(--color-cream);
  padding: 18px;
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  margin-bottom: 26px;
}

.order-meta-box small {
  display: block;
  font-size: 0.76rem;
  color: var(--color-muted);
  margin-bottom: 4px;
}

.order-meta-box strong {
  font-size: 0.9rem;
}

.order-success-actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
  }
}

@media (max-width: 640px) {
  .order-meta-box {
    grid-template-columns: 1fr;
  }
}
</style>


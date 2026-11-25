<script setup>
import { computed, ref } from 'vue';
import { cartTotalItems } from '../utils/cart.js';
import { currentUser, logoutUser } from '../utils/auth.js';
import { hideToast, showToast, toastState } from '../utils/toast.js';

const props = defineProps({
  activePage: {
    type: String,
    default: 'home',
  },
});

const mobileMenuOpen = ref(false);

const displayName = computed(() => {
  if (!currentUser.value?.fullName) return '';
  return currentUser.value.fullName.split(' ')[0];
});

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value;
}

function closeMobileMenu() {
  mobileMenuOpen.value = false;
}

function handleLogout() {
  logoutUser();
  closeMobileMenu();
  showToast('Anda telah keluar dari akun PAPERLY.', 'info');
}
</script>

<template>
  <header class="navbar-wrapper">
    <div class="container navbar">
      <a href="index.html" class="brand" aria-label="PAPERLY Beranda">
        <span class="brand-mark" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            <path d="M9 8h6" />
            <path d="M9 12h4" />
          </svg>
        </span>
        <span class="brand-text">
          <strong>PAPERLY</strong>
          <small>Stationery Store</small>
        </span>
      </a>

      <nav class="nav-links" aria-label="Navigasi utama">
        <a
          href="index.html"
          class="nav-link"
          :class="{ active: props.activePage === 'home' }"
        >
          Home
        </a>
        <a
          href="Product.html"
          class="nav-link"
          :class="{ active: props.activePage === 'products' || props.activePage === 'detail' }"
        >
          Products
        </a>
        <a href="index.html#about" class="nav-link">About</a>
        <a href="index.html#contact" class="nav-link">Contact</a>
      </nav>

      <div class="nav-actions">
        <a
          href="Cart.html"
          class="cart-btn"
          :class="{ active: props.activePage === 'cart' || props.activePage === 'checkout' }"
          aria-label="Keranjang belanja"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span class="cart-label">Keranjang</span>
          <span class="cart-badge">{{ cartTotalItems }}</span>
        </a>

        <template v-if="currentUser">
          <span class="user-pill" :title="currentUser.email">
            Halo, {{ displayName }}
          </span>
          <button type="button" class="btn btn-ghost btn-sm" @click="handleLogout">
            Logout
          </button>
        </template>
        <template v-else>
          <a
            href="Login.html"
            class="btn btn-outline btn-sm nav-auth-desktop"
            :class="{ 'is-current': props.activePage === 'login' }"
          >
            Login
          </a>
          <a
            href="Register.html"
            class="btn btn-primary btn-sm nav-auth-desktop"
            :class="{ 'is-current': props.activePage === 'register' }"
          >
            Register
          </a>
        </template>

        <button
          type="button"
          class="menu-toggle"
          :aria-expanded="mobileMenuOpen"
          aria-label="Buka menu navigasi"
          @click="toggleMobileMenu"
        >
          <svg v-if="!mobileMenuOpen" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          <svg v-else width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>

    <div v-if="mobileMenuOpen" class="mobile-drawer">
      <div class="container mobile-drawer-inner">
        <a href="index.html" class="mobile-link" @click="closeMobileMenu">Home</a>
        <a href="Product.html" class="mobile-link" @click="closeMobileMenu">Products</a>
        <a href="index.html#about" class="mobile-link" @click="closeMobileMenu">About</a>
        <a href="index.html#contact" class="mobile-link" @click="closeMobileMenu">Contact</a>
        <a href="Cart.html" class="mobile-link" @click="closeMobileMenu">
          Keranjang ({{ cartTotalItems }})
        </a>

        <div class="mobile-auth">
          <template v-if="currentUser">
            <div class="mobile-user-info">Masuk sebagai <strong>{{ currentUser.fullName }}</strong></div>
            <button type="button" class="btn btn-outline btn-sm" @click="handleLogout">
              Logout
            </button>
          </template>
          <template v-else>
            <a href="Login.html" class="btn btn-outline btn-sm" @click="closeMobileMenu">Login</a>
            <a href="Register.html" class="btn btn-primary btn-sm" @click="closeMobileMenu">Register</a>
          </template>
        </div>
      </div>
    </div>

    <div v-if="toastState.visible" class="toast-floating" :class="`toast-${toastState.type}`" role="status" aria-live="polite">
      <span>{{ toastState.message }}</span>
      <button type="button" class="toast-close" aria-label="Tutup notifikasi" @click="hideToast">
        &times;
      </button>
    </div>
  </header>
</template>

<style scoped>
.navbar-wrapper {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
}

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  min-height: 74px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 11px;
  flex-shrink: 0;
}

.brand-mark {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background-color: var(--color-sage);
  color: var(--color-white);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.brand-text {
  display: flex;
  flex-direction: column;
  line-height: 1.1;
}

.brand-text strong {
  font-size: 1.12rem;
  letter-spacing: 0.06em;
  color: var(--color-ink);
}

.brand-text small {
  font-size: 0.7rem;
  color: var(--color-muted);
  font-weight: 500;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
}

.nav-link {
  font-size: 0.93rem;
  font-weight: 500;
  color: var(--color-text);
  position: relative;
  padding: 6px 0;
  transition: color var(--transition);
}

.nav-link:hover,
.nav-link.active {
  color: var(--color-sage-dark);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  border-radius: 2px;
  background-color: var(--color-sage);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cart-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: var(--radius-pill);
  background-color: var(--color-cream);
  border: 1px solid var(--color-border);
  font-size: 0.86rem;
  font-weight: 500;
  color: var(--color-ink);
  transition: border-color var(--transition), background-color var(--transition);
}

.cart-btn:hover,
.cart-btn.active {
  border-color: var(--color-sage);
  background-color: var(--color-sage-light);
}

.cart-badge {
  min-width: 22px;
  height: 22px;
  padding: 0 6px;
  border-radius: var(--radius-pill);
  background-color: var(--color-accent);
  color: var(--color-white);
  font-size: 0.75rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.user-pill {
  font-size: 0.84rem;
  font-weight: 500;
  color: var(--color-sage-dark);
  background-color: var(--color-sage-light);
  padding: 7px 14px;
  border-radius: var(--radius-pill);
}

.menu-toggle {
  display: none;
  width: 40px;
  height: 40px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-white);
  color: var(--color-ink);
  align-items: center;
  justify-content: center;
}

.mobile-drawer {
  display: none;
  border-top: 1px solid var(--color-border);
  background-color: var(--color-white);
  padding: 16px 0 20px;
}

.mobile-drawer-inner {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.mobile-link {
  padding: 8px 4px;
  font-weight: 500;
  color: var(--color-ink);
  border-bottom: 1px solid var(--color-cream-alt);
}

.mobile-auth {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.mobile-user-info {
  font-size: 0.88rem;
  color: var(--color-muted);
  width: 100%;
}

.toast-floating {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 18px;
  border-radius: var(--radius-md);
  color: var(--color-white);
  font-size: 0.9rem;
  font-weight: 500;
  box-shadow: var(--shadow-lg);
  max-width: min(380px, calc(100vw - 32px));
}

.toast-success {
  background-color: var(--color-sage-dark);
}

.toast-warning {
  background-color: var(--color-accent-hover);
}

.toast-error {
  background-color: var(--color-danger);
}

.toast-info {
  background-color: var(--color-ink);
}

.toast-close {
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1.2rem;
  line-height: 1;
  padding: 0 2px;
}

@media (max-width: 900px) {
  .nav-links,
  .nav-auth-desktop,
  .user-pill {
    display: none;
  }

  .menu-toggle,
  .mobile-drawer {
    display: block;
  }

  .menu-toggle {
    display: inline-flex;
  }
}

@media (max-width: 480px) {
  .cart-label {
    display: none;
  }
}
</style>


<script setup>
import { reactive, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import { currentUser, loginUser, logoutUser } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';

const form = reactive({
  email: '',
  password: '',
});

const errorMessage = ref('');
const successMessage = ref('');

function handleLogin() {
  errorMessage.value = '';
  successMessage.value = '';

  const result = loginUser({
    email: form.email,
    password: form.password,
  });

  if (!result.ok) {
    errorMessage.value = result.message;
    return;
  }

  successMessage.value = result.message;
  showToast(result.message, 'success');
}

function handleLogout() {
  logoutUser();
  successMessage.value = '';
  showToast('Anda telah keluar dari sesi login.', 'info');
}
</script>

<template>
  <div class="page-shell">
    <Navbar active-page="login" />

    <main class="page-main auth-main">
      <div class="container auth-container">
        <div class="auth-card card-surface">
          <div class="auth-header">
            <span class="section-eyebrow">Akun PAPERLY</span>
            <h1>Masuk ke Akun Anda</h1>
            <p>Masuk untuk menyimpan nama profil dan melanjutkan pengalaman belanja alat tulis.</p>
          </div>

          <div class="alert alert-warning" style="margin-bottom: 20px;">
            <strong>Simulasi Frontend:</strong> Autentikasi ini menggunakan <code>localStorage</code> browser sebagai simulasi pembelajaran frontend, bukan sistem keamanan produksi.
          </div>

          <div v-if="currentUser" class="logged-in-box">
            <div class="alert alert-success" style="margin-bottom: 18px;">
              Anda sedang masuk sebagai <strong>{{ currentUser.fullName }}</strong> ({{ currentUser.email }}).
            </div>
            <div class="logged-in-actions">
              <a href="Product.html" class="btn btn-primary">Lihat Katalog</a>
              <a href="Cart.html" class="btn btn-outline">Buka Keranjang</a>
              <button type="button" class="btn btn-ghost" @click="handleLogout">Logout</button>
            </div>
          </div>

          <form v-else @submit.prevent="handleLogin" novalidate>
            <div v-if="errorMessage" class="alert alert-error" style="margin-bottom: 16px;">
              {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="alert alert-success" style="margin-bottom: 16px;">
              {{ successMessage }}
            </div>

            <div class="form-group">
              <label class="form-label" for="login-email">Email</label>
              <input
                id="login-email"
                v-model="form.email"
                type="email"
                class="form-control"
                placeholder="nama@email.com"
                autocomplete="email"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="login-password">Password</label>
              <input
                id="login-password"
                v-model="form.password"
                type="password"
                class="form-control"
                placeholder="Masukkan password Anda"
                autocomplete="current-password"
              />
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 6px;">
              Masuk Sekarang
            </button>
          </form>

          <p class="auth-switch">
            Belum punya akun PAPERLY?
            <a href="Register.html">Daftar di sini</a>
          </p>
        </div>
      </div>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.auth-main {
  display: flex;
  align-items: center;
  padding: 56px 0;
}

.auth-container {
  display: flex;
  justify-content: center;
}

.auth-card {
  width: 100%;
  max-width: 480px;
  padding: 34px 30px;
}

.auth-header {
  margin-bottom: 20px;
}

.auth-header h1 {
  font-size: 1.6rem;
  margin-bottom: 6px;
}

.auth-header p {
  font-size: 0.92rem;
  color: var(--color-muted);
}

.logged-in-actions {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.auth-switch {
  margin-top: 22px;
  padding-top: 18px;
  border-top: 1px solid var(--color-border);
  text-align: center;
  font-size: 0.9rem;
  color: var(--color-muted);
}

.auth-switch a {
  color: var(--color-sage-dark);
  font-weight: 600;
}

.auth-switch a:hover {
  text-decoration: underline;
}
</style>


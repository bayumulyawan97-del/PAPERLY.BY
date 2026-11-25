<script setup>
import { reactive, ref } from 'vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import { registerUser } from '../utils/auth.js';
import { showToast } from '../utils/toast.js';

const form = reactive({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const errorMessage = ref('');
const successMessage = ref('');

function handleRegister() {
  errorMessage.value = '';
  successMessage.value = '';

  const result = registerUser({
    fullName: form.fullName,
    email: form.email,
    password: form.password,
    confirmPassword: form.confirmPassword,
  });

  if (!result.ok) {
    errorMessage.value = result.message;
    return;
  }

  successMessage.value = result.message;
  showToast('Akun berhasil didaftarkan! Silakan login.', 'success');
  form.fullName = '';
  form.email = '';
  form.password = '';
  form.confirmPassword = '';
}
</script>

<template>
  <div class="page-shell">
    <Navbar active-page="register" />

    <main class="page-main auth-main">
      <div class="container auth-container">
        <div class="auth-card card-surface">
          <div class="auth-header">
            <span class="section-eyebrow">Buat Akun Baru</span>
            <h1>Daftar di PAPERLY</h1>
            <p>Buat akun simulasi untuk mencoba alur registrasi, login, dan checkout toko online.</p>
          </div>

          <div class="alert alert-warning" style="margin-bottom: 20px;">
            <strong>Simulasi Frontend:</strong> Data akun disimpan sementara di <code>localStorage</code> browser. Autentikasi ini adalah simulasi frontend untuk keperluan akademik, bukan sistem keamanan produksi.
          </div>

          <div v-if="errorMessage" class="alert alert-error" style="margin-bottom: 16px;">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="alert alert-success" style="margin-bottom: 18px;">
            <p style="margin-bottom: 10px;">{{ successMessage }}</p>
            <a href="Login.html" class="btn btn-primary btn-sm">Lanjut ke Halaman Login</a>
          </div>

          <form @submit.prevent="handleRegister" novalidate>
            <div class="form-group">
              <label class="form-label" for="reg-name">Nama Lengkap</label>
              <input
                id="reg-name"
                v-model="form.fullName"
                type="text"
                class="form-control"
                placeholder="Contoh: Bayu Pratama"
                autocomplete="name"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="reg-email">Email</label>
              <input
                id="reg-email"
                v-model="form.email"
                type="email"
                class="form-control"
                placeholder="nama@email.com"
                autocomplete="email"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="reg-password">Password</label>
              <input
                id="reg-password"
                v-model="form.password"
                type="password"
                class="form-control"
                placeholder="Minimal 6 karakter"
                autocomplete="new-password"
              />
            </div>

            <div class="form-group">
              <label class="form-label" for="reg-confirm">Konfirmasi Password</label>
              <input
                id="reg-confirm"
                v-model="form.confirmPassword"
                type="password"
                class="form-control"
                placeholder="Ulangi password Anda"
                autocomplete="new-password"
              />
            </div>

            <button type="submit" class="btn btn-primary btn-lg" style="width: 100%; margin-top: 6px;">
              Daftar Akun
            </button>
          </form>

          <p class="auth-switch">
            Sudah memiliki akun?
            <a href="Login.html">Masuk di sini</a>
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
  max-width: 500px;
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


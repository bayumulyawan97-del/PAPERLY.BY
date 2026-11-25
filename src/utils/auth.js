import { ref } from 'vue';

const USERS_STORAGE_KEY = 'paperly_users';
const CURRENT_USER_KEY = 'paperly_current_user';

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
}

function readCurrentUser() {
  try {
    const raw = localStorage.getItem(CURRENT_USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export const currentUser = ref(readCurrentUser());

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === CURRENT_USER_KEY) {
      currentUser.value = readCurrentUser();
    }
  });
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

export function registerUser({ fullName, email, password, confirmPassword }) {
  const cleanName = String(fullName || '').trim();
  const cleanEmail = String(email || '').trim().toLowerCase();
  const rawPassword = String(password || '');
  const rawConfirm = String(confirmPassword || '');

  if (!cleanName) {
    return { ok: false, message: 'Nama lengkap wajib diisi.' };
  }
  if (cleanName.length < 3) {
    return { ok: false, message: 'Nama lengkap minimal 3 karakter.' };
  }
  if (!cleanEmail || !isValidEmail(cleanEmail)) {
    return { ok: false, message: 'Format email tidak valid.' };
  }
  if (rawPassword.length < 6) {
    return { ok: false, message: 'Password minimal 6 karakter.' };
  }
  if (rawPassword !== rawConfirm) {
    return { ok: false, message: 'Konfirmasi password tidak cocok.' };
  }

  const users = readUsers();
  const duplicate = users.some((user) => user.email.toLowerCase() === cleanEmail);
  if (duplicate) {
    return { ok: false, message: 'Email ini sudah terdaftar. Silakan login atau gunakan email lain.' };
  }

  const newUser = {
    id: `usr_${Date.now()}`,
    fullName: cleanName,
    email: cleanEmail,
    // Catatan: Simulasi frontend untuk proyek perkuliahan; jangan simpan password plaintext pada sistem produksi.
    password: rawPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  return {
    ok: true,
    message: 'Registrasi berhasil! Silakan masuk menggunakan akun Anda.',
  };
}

export function loginUser({ email, password }) {
  const cleanEmail = String(email || '').trim().toLowerCase();
  const rawPassword = String(password || '');

  if (!cleanEmail || !isValidEmail(cleanEmail)) {
    return { ok: false, message: 'Masukkan alamat email yang valid.' };
  }
  if (!rawPassword) {
    return { ok: false, message: 'Password wajib diisi.' };
  }

  const users = readUsers();
  const matched = users.find(
    (user) => user.email.toLowerCase() === cleanEmail && user.password === rawPassword
  );

  if (!matched) {
    return {
      ok: false,
      message: 'Email atau password salah. Pastikan Anda sudah mendaftar terlebih dahulu.',
    };
  }

  const sessionUser = {
    id: matched.id,
    fullName: matched.fullName,
    email: matched.email,
    loggedInAt: new Date().toISOString(),
  };

  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(sessionUser));
  currentUser.value = sessionUser;

  return {
    ok: true,
    user: sessionUser,
    message: `Selamat datang kembali, ${sessionUser.fullName}!`,
  };
}

export function logoutUser() {
  localStorage.removeItem(CURRENT_USER_KEY);
  currentUser.value = null;
}


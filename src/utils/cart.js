import { computed, ref } from 'vue';
import { getProductById } from '../data/products.js';
import { showToast } from './toast.js';

const CART_STORAGE_KEY = 'paperly_cart';

function readCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((entry) => {
        const product = getProductById(entry.id);
        if (!product) return null;
        const safeQty = Math.max(1, Math.min(Number(entry.quantity) || 1, product.stock));
        return {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          stock: product.stock,
          image: product.image,
          quantity: safeQty,
        };
      })
      .filter(Boolean);
  } catch {
    return [];
  }
}

export const cartItems = ref(readCartFromStorage());

function persistCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems.value));
  } catch {
    // Ignore storage quota errors in restricted environments
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key === CART_STORAGE_KEY) {
      cartItems.value = readCartFromStorage();
    }
  });
}

export const cartTotalItems = computed(() =>
  cartItems.value.reduce((total, item) => total + item.quantity, 0)
);

export const cartSubtotal = computed(() =>
  cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
);

export function addToCart(product, quantity = 1) {
  if (!product || product.stock <= 0) {
    showToast('Maaf, stok produk sedang habis.', 'error');
    return { ok: false, message: 'Stok produk habis.' };
  }

  const addQty = Math.max(1, Math.floor(Number(quantity) || 1));
  const existing = cartItems.value.find((item) => item.id === product.id);

  if (existing) {
    const targetQty = existing.quantity + addQty;
    if (targetQty > product.stock) {
      existing.quantity = product.stock;
      persistCart();
      showToast(`Jumlah ${product.name} disesuaikan ke batas stok (${product.stock}).`, 'warning');
      return { ok: true, message: 'Jumlah disesuaikan dengan stok tersedia.' };
    }
    existing.quantity = targetQty;
  } else {
    cartItems.value.push({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      stock: product.stock,
      image: product.image,
      quantity: Math.min(addQty, product.stock),
    });
  }

  persistCart();
  showToast(`${product.name} ditambahkan ke keranjang.`, 'success');
  return { ok: true, message: 'Berhasil ditambahkan ke keranjang.' };
}

export function updateCartQuantity(productId, nextQuantity) {
  const item = cartItems.value.find((entry) => entry.id === productId);
  if (!item) return;

  const product = getProductById(productId);
  const maxStock = product ? product.stock : item.stock;
  const clamped = Math.max(1, Math.min(Number(nextQuantity) || 1, maxStock));

  item.quantity = clamped;
  persistCart();
}

export function removeFromCart(productId) {
  const removed = cartItems.value.find((entry) => entry.id === productId);
  cartItems.value = cartItems.value.filter((entry) => entry.id !== productId);
  persistCart();
  if (removed) {
    showToast(`${removed.name} dihapus dari keranjang.`, 'info');
  }
}

export function clearCart() {
  cartItems.value = [];
  persistCart();
}


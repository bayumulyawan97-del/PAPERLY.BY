import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      input: {
        index: resolve(import.meta.dirname, 'index.html'),
        product: resolve(import.meta.dirname, 'Product.html'),
        detail: resolve(import.meta.dirname, 'Detail.html'),
        cart: resolve(import.meta.dirname, 'Cart.html'),
        checkout: resolve(import.meta.dirname, 'Checkout.html'),
        login: resolve(import.meta.dirname, 'Login.html'),
        register: resolve(import.meta.dirname, 'Register.html'),
      },
    },
  },
});

import { createApp } from 'vue';
import './styles.css';

import HomePage from './pages/HomePage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import DetailPage from './pages/DetailPage.vue';
import CartPage from './pages/CartPage.vue';
import CheckoutPage from './pages/CheckoutPage.vue';
import LoginPage from './pages/LoginPage.vue';
import RegisterPage from './pages/RegisterPage.vue';

const pageComponents = {
  home: HomePage,
  products: ProductsPage,
  detail: DetailPage,
  cart: CartPage,
  checkout: CheckoutPage,
  login: LoginPage,
  register: RegisterPage,
};

const appRoot = document.getElementById('app');
const pageKey = appRoot?.dataset.page || 'home';
const ActivePage = pageComponents[pageKey] || HomePage;

createApp(ActivePage).mount('#app');


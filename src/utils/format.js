export function formatRupiah(amount) {
  const safeNumber = Number(amount) || 0;
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(safeNumber);
}

export function getQueryParam(key) {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return params.get(key) || '';
}

export function buildDetailUrl(productId) {
  return `Detail.html?id=${encodeURIComponent(productId)}`;
}

export function buildCategoryUrl(categoryName) {
  return `Product.html?category=${encodeURIComponent(categoryName)}`;
}


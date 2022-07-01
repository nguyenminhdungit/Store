export function formatPrice(price) {
  return new Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'VND' }).format(price);
}

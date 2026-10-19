const PRICING = {
  freeDeliveryFrom: 50000,
  deliveryPrice: 30000,
  promoCode: 'SAVE10',
  promoMinSubtotal: 20000,
  promoDiscountPercent: 10,
};

function assertValidQuantity(quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом.');
  }
}

function updateItem(cart, id, changes) {
  return cart.map((item) => (item.id === id ? { ...item, ...changes } : item));
}

function addToCart(cart, product, quantity) {
  assertValidQuantity(quantity);

  const existingItem = cart.find((item) => item.id === product.id);
  const newQuantity = (existingItem?.quantity ?? 0) + quantity;

  if (newQuantity > product.stock) {
    throw new RangeError('Нельзя добавить больше товара, чем есть на складе.');
  }

  return existingItem
    ? updateItem(cart, product.id, { quantity: newQuantity })
    : [...cart, { ...product, quantity }];
}

function changeQuantity(cart, id, quantity) {
  assertValidQuantity(quantity);

  const item = cart.find((cartItem) => cartItem.id === id);
  if (!item) return cart;

  if (quantity > item.stock) {
    throw new RangeError('Нельзя указать количество больше остатка на складе.');
  }

  return updateItem(cart, id, { quantity });
}

function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);

  const isPromoApplied =
    promoCode === PRICING.promoCode && subtotal >= PRICING.promoMinSubtotal;
  const discount = isPromoApplied
    ? Math.round((subtotal * PRICING.promoDiscountPercent) / 100)
    : 0;

  const delivery = subtotal >= PRICING.freeDeliveryFrom ? 0 : PRICING.deliveryPrice;

  return { subtotal, discount, delivery, total: subtotal - discount + delivery };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
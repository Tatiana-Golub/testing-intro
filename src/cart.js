function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
   if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом.');
  }

  const existingItem = cart.find((item) => item.id === product.id);
  const newQuantity = (existingItem ? existingItem.quantity : 0) + quantity;

  if (newQuantity > product.stock) {
    throw new RangeError('Нельзя добавить больше товара, чем есть на складе.');
  }

  if (existingItem) {
    return cart.map((item) =>
      item.id === product.id ? { ...item, quantity: newQuantity } : item
    );
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, id, quantity) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new RangeError('Количество должно быть положительным целым числом.');
  }

  const item = cart.find((cartItem) => cartItem.id === id);
  if (!item) {
    return cart;
  }

  if (quantity > item.stock) {
    throw new RangeError('Нельзя указать количество больше остатка на складе.');
  }

  return cart.map((cartItem) =>
    cartItem.id === id ? { ...cartItem, quantity } : cartItem
  );
}

function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;

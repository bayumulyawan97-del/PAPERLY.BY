const ORDERS_STORAGE_KEY = 'paperly_orders';

export function saveSimulatedOrder(orderInput) {
  const existingOrders = getSimulatedOrders();
  const orderCode = `PPL-${Date.now().toString().slice(-6)}`;

  const newOrder = {
    orderCode,
    createdAt: new Date().toISOString(),
    ...orderInput,
  };

  existingOrders.unshift(newOrder);
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existingOrders));
  return newOrder;
}

export function getSimulatedOrders() {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}


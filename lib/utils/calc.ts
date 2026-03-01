import { CartItem, Product, Discount } from "@/types";

/**
 * Calculate total price for a single cart item.
 * Price is fetched from product variant.
 */
export function calculateItemTotal(
  item: CartItem,
  product: Product
): number {
  const variant = product.variants.find(v => v.id === item.variantId);
  if (!variant) return 0;
  return variant.price * item.quantity;
}

/**
 * Calculate cart total before discounts.
 */
export function calculateCartSubtotal(
  items: CartItem[],
  products: Product[]
): number {
  return items.reduce((sum, item) => {
    const product = products.find(p => p.id === item.productId);
    if (!product) return sum;
    return sum + calculateItemTotal(item, product);
  }, 0);
}

/**
 * Apply discount to a total.
 * Supports:
 * - percentage (e.g. 10%)
 * - fixed amount (e.g. 200 kr)
 * - product-specific discount
 */
export function applyDiscount(
  total: number,
  discount: Discount | null,
  items: CartItem[],
  products: Product[]
): number {
  if (!discount || !discount.active) return total;

  // Product-specific discount
  if (discount.productId) {
    const item = items.find(i => i.productId === discount.productId);
    if (!item) return total;

    const product = products.find(p => p.id === item.productId);
    if (!product) return total;

    const itemTotal = calculateItemTotal(item, product);

    if (discount.percentage) {
      return total - Math.round(itemTotal * (discount.percentage / 100));
    }

    if (discount.amount) {
      return Math.max(0, total - discount.amount);
    }

    return total;
  }

  // Global percentage discount
  if (discount.percentage) {
    return Math.round(total * (1 - discount.percentage / 100));
  }

  // Global fixed discount
  if (discount.amount) {
    return Math.max(0, total - discount.amount);
  }

  return total;
}

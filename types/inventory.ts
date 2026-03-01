export interface InventoryRecord {
  productId: string;
  variantId?: string;
  stock: number;
  reserved?: number;
  updatedAt: string;
}

export interface InventoryUpdatePayload {
  productId: string;
  variantId?: string;
  stock: number;
}

export interface LowStockWarning {
  productId: string;
  currentStock: number;
  threshold: number;
}

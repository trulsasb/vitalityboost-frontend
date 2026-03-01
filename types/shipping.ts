export interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  estimatedDays: number;
  provider?: string;
}

export interface ShippingAddress {
  name: string;
  line1: string;
  line2?: string;
  postalCode: string;
  city: string;
  country: string;
  phone?: string;
}

export interface ShippingSelection {
  methodId: string;
  address: ShippingAddress;
}

export interface ShippingRateRequest {
  postalCode: string;
  country: string;
  items: {
    productId: string;
    quantity: number;
  }[];
}

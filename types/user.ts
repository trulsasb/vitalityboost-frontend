export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  address?: UserAddress;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserAddress {
  line1: string;
  line2?: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface AuthUser {
  id: string;
  email: string;
  token?: string;
}

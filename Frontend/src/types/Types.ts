export type UserRole = "ADMIN" | "USER" | "SELLER";

export type User = {
  id: number;
  email: string;
  name: string | null;
  image: string | null;
  role: UserRole;
  password: string;
  phone: string | null;
  address?: Address[];
  cart?: Cart | null;
  wishlist?: Wishlist | null;
  rating?: Rating[];
  stock?: Stock | null;
  orders?: Order[];
  createdAt: Date;
  updatedAt: Date;
};

export type Address = {
  id: number;
  user_id: number;
  name: string;
  phone: string | null;
  line1: string;
  line2: string | null;
  city: string;
  state: string;
  pincode: string;
  type: string | null; // Work or Home
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: number;
  name: string;
  description: string | null;
  features: any | null; // JSON type
  discountPercentage: number | null;
  discountedPrice: number;
  actualPrice: number;
  categoryId: number;
  images: string[];
  avgRating: number;
  numRating: number;
  stockId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  parentId: number | null;
};

export type Cart = {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Wishlist = {
  id: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Rating = {
  id: number;
  rating: number;
  notes: string | null;
  productId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Stock = {
  id: number;
  sellerId: number;
  createdAt: Date;
  updatedAt: Date;
};

export type Order = {
  orderId: string;
  userId: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
};

export type OrderItem = {
  orderId: string;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
};

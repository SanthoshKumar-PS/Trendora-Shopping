import { Clock, CheckCircle, Loader2, Truck, PackageCheck, XCircle } from "lucide-react";
import type React from "react";

export type UserRole = "ADMIN" | "USER" | "SELLER";
export type OrderStatus = 
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "ERROR";

export const statusMap: Record<
  OrderStatus,
  { heading: string; message: string; style: string; icon: React.ReactNode }
> = {
  PENDING: {
    heading: "Order Pending",
    message: "Order is pending",
    style: "bg-red-500 hover:bg-red-600 text-white border border-red-500",
    icon: <Clock className="w-4 h-4" />,
  },
  CONFIRMED: {
    heading: "Order Confirmed",
    message: "Order has been confirmed",
    style: "bg-blue-500 hover:bg-blue-600 text-white border border-blue-500",
    icon: <CheckCircle className="w-4 h-4" />,
  },
  PROCESSING: {
    heading: "Order Processing",
    message: "Order is being processed",
    style: "bg-orange-500 hover:bg-orange-600 text-white border border-orange-500",
    icon: <Loader2 className="w-4 h-4 animate-spin" />,
  },
  SHIPPED: {
    heading: "Order Shipped",
    message: "Order has been shipped",
    style: "bg-purple-500 hover:bg-purple-600 text-white border border-purple-500",
    icon: <Truck className="w-4 h-4" />,
  },
  DELIVERED: {
    heading: "Order Delivered",
    message: "Order delivered successfully",
    style: "bg-green-500 hover:bg-green-600 text-white border border-green-500",
    icon: <PackageCheck className="w-4 h-4" />,
  },
  CANCELLED: {
    heading: "Order Cancelled",
    message: "Order has been cancelled",
    style: "bg-gray-500 hover:bg-gray-600 text-white border border-gray-500",
    icon: <XCircle className="w-4 h-4" />,
  },
  ERROR: {
    heading: "Error Occurred",
    message: "Error occurred while placing order",
    style: "bg-red-500 hover:bg-red-600 text-white border border-red-500",
    icon: <XCircle className="w-4 h-4" />,
  },
};


export type PaymentMethod = 
  | "UPI"
  | "Card"
  | "COD"

export type PaymentStatus =
  | "PENDING"
  | "SUCCESS"
  | "FAILED"
  | "REFUNDED"
  | "UNKNOWN";
export const statusLables : Record<PaymentStatus,string> = {
  PENDING: "Waiting for payment",
  SUCCESS: "Payment completed",
  FAILED: "Payment failed",
  REFUNDED: "Money refunded",
  UNKNOWN: "Unknown status"
}

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

export type Order = {
  id: number;
  orderNo: string;
  orderDate: string; // Date as ISO string from backend
  userId: number;
  status: OrderStatus;
  totalAmount: number;
  totalActualAmount: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  deliveryAddressId: number;
  deliveryCharges: number;
  createdAt: string;
  updatedAt: string;
  orderDetails: OrderDetails[]; // nested order items
  user?: User; // optional nested user info
  address?: Address; // optional nested delivery address
};


export type OrderDetails = {
  id: number;
  orderId: number;
  productId: number;
  actualPrice: number;
  discountedPrice: number;
  quantity: number;
  totalPrice: number;
  product: Product; // nested product info
};


export type CheckoutProduct = {
  product: Product;
  quantity : number;
  totalActualPrice: number,
  totalDiscountedPrice:number
}

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
  orders : Order[];
  createdAt: Date;
  updatedAt: Date;
};

export type Product = {
  id: number;
  name: string;
  description?: string | null;
  features?: Feature[]; 
  discountPercentage?: number; // default 0.0
  discountedPrice: number;
  actualPrice: number;
  

  categoryId: number;
  images: string[];                      // Prisma String[]
  avgRating: number;                     // default 0.0
  numRating: number;                     // default 0
  stockId: number;

  category?: Category;
  stock?: Stock;
  ratings?: Rating[];
  orderDetails : OrderDetails[]

  createdAt: Date; // Dates come as ISO strings
  updatedAt: Date;
};

export type ProductWithCart = Product & {
  isInCart?: boolean;
};
export type Feature = {
  label: string;
  value: string | number;  // use number if you expect numeric values
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
  products? : Product[]
  createdAt: Date;
  updatedAt: Date;
};

export type Wishlist = {
  id: number;
  userId: number;
  products?: Product[];
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
  products: Product[]
  createdAt: Date;
  updatedAt: Date;
};
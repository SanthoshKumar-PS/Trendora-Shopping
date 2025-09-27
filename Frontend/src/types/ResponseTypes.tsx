import type { Order } from "./Types";

export type UserOrderResponse = {
  id: number;
  orderNo: string;
  orderDate: string; // Date comes as string in JSON
  status: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: string;
  deliveryCharges: number;
  totalActualAmount?: string; // Prisma Decimal comes as string in JSON
  address: {
    name: string;
    city: string;
  };
  _count: {
    orderDetails: number;
  };
};

export type GetOrderDetailsType = {
  message : string;
  order : Order
}

// Seller Dashboard
export type GetLastWeekSalesType = {
  range : string;
  top5Products : {
    productName: string;
    count: number;
  }[],
  totalProductsSold: number;
}

export type TransactionType = {
  id: number
  orderNo: string
  orderDate: string // ISO string
  totalAmount: number
  user: {
    email: string
  }
  address: {
    name: string
  }
}
export type GetLatestTransactionsType = {
  message: string
  transactions: TransactionType[]
}
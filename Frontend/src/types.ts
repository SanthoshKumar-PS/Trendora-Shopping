
export interface Category{
    id:number
    name:string
    slug:string
    parentId:number
}

export interface Feature{
  label : string;
  value : string
}
export interface ProductType {
  id: number;
  name: string;
  description?: string;
  features?: Feature[]; 
  discountPercentage?: number; 
  discountedPrice: number;
  actualPrice: number;
  categoryId: number;
  images: string[]; 
  avgRating: number;
  numRating: number;
  stockId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Full Product type (with relations + extras)
export type ProductTypeFull = {
  id: number;
  name: string;
  description?: string | null;
  features?: Record<string, any> | null; // JSON field
  discountPercentage?: number; // 0–100
  discountedPrice: number;
  actualPrice: number;
  categoryId: number;
  images: string[]; // nullable array = [] if no images
  avgRating: number;
  numRating: number;

  // Relations
  category: {
    id: number;
    name: string;
  };
  carts?: any[];
  wishlist?: any[];
  rating?: any[];
  orderItems?: any[];

  stockId: number;
  stock: {
    id: number;
    name: string;
  };

  createdAt: Date;
  updatedAt: Date;

  // Extra computed fields (for convenience)
  categoryName?: string; // derived from relation
  stockName?: string;    // derived from relation
  ratings?: number[];    // extracted values from rating[]
};

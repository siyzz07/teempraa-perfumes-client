export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  scentType: string;
  description: string;
  notes?: string;
  inStock?: boolean;
  reviews?: Array<{
    user: string;
    comment: string;
    rating: number;
  }>;
}

export interface Category {
  name: string;
  icon: any;
}

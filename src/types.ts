export interface PriceTiers {
  '1-12'?: number;
  '13-50'?: number;
  '51+'?: number;
  '1-6'?: number;
  '12-99'?: number;
  '100-299'?: number;
  '300+'?: number;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  price: number; // default base price for 1-12 units
  category: string;
  image: string;
  gallery?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  rating?: number;
  description: string;
  features: string[];
  composition?: string;
  sizes?: string[];
  colors?: { name: string; hex: string; code?: string; image?: string; gallery?: string[] }[];
  hasCorteSelection?: boolean;
  hasMangaSelection?: boolean;
  damaColors?: { name: string; hex: string; code?: string; image?: string; gallery?: string[] }[];
  priceTiers: PriceTiers;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
  corte?: string;
  manga?: string;
  hasChestEmbroidery?: boolean;
  hasBackEmbroidery?: boolean;
}

export interface QuoteRequest {
  id: string;
  items: CartItem[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany: string;
  notes: string;
  status: 'pending' | 'completed';
  createdAt: string;
}

export type ActiveTab = 'inicio' | 'catalogo' | 'quienes-somos' | 'contacto' | '404';

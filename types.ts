export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'Única';

export interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  img: string;
  secondaryImg?: string;
  category: string;
  tag?: 'NUEVO' | 'MAS VENDIDO' | 'DESCUENTO' | null;
  description?: string;
  availableSizes?: Size[];
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem extends Product {
  size: string;
  qty: number;
}

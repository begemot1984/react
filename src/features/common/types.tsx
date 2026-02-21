export type ShoeSize = {
  size: string;
  available: boolean;
};

export type ShoeItem = {
  id: number;
  category: number;
  title: string;
  images: string[];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  price: number;
  oldPrice: number;
  sizes: ShoeSize[];
};

export type CatalogItem = {
  id: number;
  category: number;
  title: string;
  price: number;
  images: string[];
};

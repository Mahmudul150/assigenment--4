export interface IGearItem {
  name : string;
  description: string;
  brand: string;
  pricePerDay: number;
  stock: number;
  condition: string;
  image?: string;
  isAvailable?: boolean;
  specifications?: string;
  categoryId: string;
}

export interface IGearQuery {
  searchTerm?: string;
  name?: string;
  brand?: string;
  categoryId?: string;
  condition?: string;
  isAvailable?: string;
  page?: string;
  limit?: string;
  sortBy?: "name" | "pricePerDay" | "stock" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface TUpdateGear {
  name?: string;
  description?: string;
  brand?: string;
  pricePerDay?: number;
  stock?: number;
  condition?: string;
  image?: string;
  isAvailable?: boolean;
  specifications?: string;
  categoryId?: string;
}
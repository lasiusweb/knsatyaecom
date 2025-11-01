export enum Category {
  Agriculture = "Agriculture Inputs",
  Aquaculture = "Aquaculture Solutions",
  Poultry = "Poultry Farming",
  IndustrialWasteManagement = "Industrial Waste Management",
  FarmEquipment = "Farm Equipment",
  OrganicFarmingConsultation = "Organic Farming Consultation",
  LabServices = "Laboratory Services",
}

// Defines the subcategories for each main product category
export const Subcategories: Record<string, string[]> = {
  [Category.Agriculture]: ['Fertilizers', 'Growth Promoters', 'Seed Treatments', 'Micronutrients', 'Bio-Control', 'Nano Fertilizers'],
  [Category.Aquaculture]: ['Pond Management', 'Water Probiotics', 'Viral Cures', 'Snail Control', 'Ammonia Control'],
  [Category.Poultry]: ['Feed Supplements', 'Sanitizers', 'Litter Management', 'Disease Control'],
  [Category.IndustrialWasteManagement]: ['STP Solutions', 'ETP Solutions', 'Bio-Augmentation', 'Wastewater Treatment Kits'],
  [Category.FarmEquipment]: ['Tractors', 'Cultivators', 'Rotovators', 'Electrical Tillers'],
};

export type ProductCtaType = 'e-commerce' | 'b2b' | 'equipment';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Variant {
  id: string; // e.g., "1-500ml"
  name: string; // e.g., "500ml", "1kg"
  price: number;
  imageUrl?: string;
  stock: StockStatus;
}

export interface Product {
  id: number;
  name: string;
  category: Category;
  subCategory: string;
  description: string;
  longDescription: string;
  price: number;
  imageUrl: string;
  tags: string[];
  ctaType: ProductCtaType;
  rating: number;
  reviewCount: number;
  isBestseller: boolean;
  frequentlyBoughtWith?: number[];
  variants?: Variant[];
}

export enum BlogCategory {
    Tips = "Farming Tips",
    News = "Company News",
    Research = "Industry Research",
    Success = "Success Stories",
}

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  author: string;
  category: BlogCategory;
  tags: string[];
  imageUrl: string;
  excerpt: string;
  content: string;
}
// Fix: Centralize User and Order types
export interface User {
  name: string;
  email: string;
}

export type OrderStatus = 'Delivered' | 'Processing' | 'Cancelled';

export interface Order {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: (Product & { quantity: number })[];
}
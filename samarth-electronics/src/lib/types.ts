export type ProductStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";
export type InquiryStatus = "NEW" | "IN_REVIEW" | "CONTACTED" | "QUOTED" | "CLOSED";
export type ServiceStatus = "DRAFT" | "PUBLISHED";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  isActive: boolean;
  sortOrder: number;
  productCount?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ProductImage {
  id: string;
  productId?: string;
  imageUrl: string;
  altText?: string | null;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  categoryId: string;
  category?: Category;
  name: string;
  slug: string;
  sku: string;
  shortDescription?: string | null;
  description: string;
  specifications?: Record<string, string> | null;
  applications: string[];
  features: string[];
  datasheetUrl?: string | null;
  status: ProductStatus;
  featured: boolean;
  sortOrder: number;
  images: ProductImage[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDesc?: string | null;
  description: string;
  features: string[];
  icon?: string | null;
  imageUrl?: string | null;
  sortOrder: number;
  status: ServiceStatus;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Inquiry {
  id: string;
  name: string;
  companyName?: string | null;
  email: string;
  phone: string;
  productId?: string | null;
  productName?: string | null;
  quantity?: string | null;
  message: string;
  status: InquiryStatus;
  internalNotes?: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CompanySettings {
  id: string;
  companyName: string;
  ownerName: string;
  tagline: string;
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  gstNumber?: string | null;
  workingHours: string;
  aboutSummary?: string | null;
  googleMapsUrl?: string | null;
  socialLinks?: {
    linkedin?: string;
    youtube?: string;
    indiamart?: string;
    facebook?: string;
  } | null;
}


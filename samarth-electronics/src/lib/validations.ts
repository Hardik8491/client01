import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  companyName: z.string().max(150).optional().or(z.literal("")),
  email: z.string().email("Please enter a valid business email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(20),
  productId: z.string().optional().or(z.literal("")),
  productName: z.string().optional().or(z.literal("")),
  quantity: z.string().optional().or(z.literal("")),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const productSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  slug: z.string().min(2, "Slug is required"),
  sku: z.string().min(2, "SKU is required"),
  categoryId: z.string().min(1, "Please select a category"),
  shortDescription: z.string().optional(),
  description: z.string().min(10, "Detailed description is required"),
  specifications: z.record(z.string(), z.string()).optional(),
  applications: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  datasheetUrl: z.string().url().optional().or(z.literal("")),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]).default("PUBLISHED"),
  featured: z.boolean().default(false),
  images: z.array(z.string()).min(1, "At least one product image is required"),
});

export type ProductInput = z.infer<typeof productSchema>;

export const categorySchema = z.object({
  name: z.string().min(2, "Category name is required"),
  slug: z.string().min(2, "Category slug is required"),
  description: z.string().optional(),
  image: z.string().optional(),
  isActive: z.boolean().default(true),
  sortOrder: z.number().int().default(0),
});

export type CategoryInput = z.infer<typeof categorySchema>;

export const settingsSchema = z.object({
  companyName: z.string().min(2),
  ownerName: z.string().min(2),
  tagline: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  whatsapp: z.string().min(8),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  pincode: z.string().min(4),
  country: z.string().default("India"),
  gstNumber: z.string().optional(),
  workingHours: z.string().min(2),
  aboutSummary: z.string().optional(),
  googleMapsUrl: z.string().optional(),
});

export type SettingsInput = z.infer<typeof settingsSchema>;


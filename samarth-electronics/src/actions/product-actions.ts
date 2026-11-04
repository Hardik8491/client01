"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { productSchema, categorySchema } from "@/lib/validations";

// ─── PRODUCTS ─────────────────────────────────────────────────────────────────
export async function createProduct(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin) return { success: false, error: "Unauthorized" };

  const rawSpecs: Record<string, string> = {};
  const specsRaw = formData.get("specifications") as string;
  if (specsRaw) {
    try {
      Object.assign(rawSpecs, JSON.parse(specsRaw));
    } catch {}
  }

  const applicationsRaw = formData.get("applications") as string;
  const featuresRaw = formData.get("features") as string;
  const imagesRaw = formData.get("images") as string;

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    sku: formData.get("sku") as string,
    categoryId: formData.get("categoryId") as string,
    shortDescription: formData.get("shortDescription") as string,
    description: formData.get("description") as string,
    specifications: rawSpecs,
    applications: applicationsRaw ? JSON.parse(applicationsRaw) : [],
    features: featuresRaw ? JSON.parse(featuresRaw) : [],
    datasheetUrl: formData.get("datasheetUrl") as string,
    status: (formData.get("status") as string) || "PUBLISHED",
    featured: formData.get("featured") === "true",
    images: imagesRaw ? JSON.parse(imagesRaw) : [],
  };

  const result = productSchema.safeParse(raw);
  if (!result.success) {
    return { success: false, error: result.error.issues[0]?.message || "Validation failed" };
  }

  try {
    const { images, ...data } = result.data;
    const product = await prisma.product.create({
      data: {
        ...data,
        status: data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
        specifications: data.specifications as object,
        images: {
          create: images.map((url: string, i: number) => ({
            imageUrl: url,
            altText: data.name,
            sortOrder: i,
            isPrimary: i === 0,
          })),
        },
      },
    });
    revalidatePath("/products");
    revalidatePath("/admin/products");
    return { success: true, productId: product.id };
  } catch (err: unknown) {
    if ((err as { code?: string }).code === "P2002") {
      return { success: false, error: "A product with this slug or SKU already exists." };
    }
    return { success: false, error: "Failed to create product." };
  }
}

export async function updateProduct(productId: string, formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin) return { success: false, error: "Unauthorized" };

  const rawSpecs: Record<string, string> = {};
  const specsRaw = formData.get("specifications") as string;
  if (specsRaw) {
    try { Object.assign(rawSpecs, JSON.parse(specsRaw)); } catch {}
  }

  const applicationsRaw = formData.get("applications") as string;
  const featuresRaw = formData.get("features") as string;
  const imagesRaw = formData.get("images") as string;

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    sku: formData.get("sku") as string,
    categoryId: formData.get("categoryId") as string,
    shortDescription: formData.get("shortDescription") as string,
    description: formData.get("description") as string,
    specifications: rawSpecs,
    applications: applicationsRaw ? JSON.parse(applicationsRaw) : [],
    features: featuresRaw ? JSON.parse(featuresRaw) : [],
    datasheetUrl: formData.get("datasheetUrl") as string,
    status: (formData.get("status") as string) || "PUBLISHED",
    featured: formData.get("featured") === "true",
    images: imagesRaw ? JSON.parse(imagesRaw) : [],
  };

  const result = productSchema.safeParse(raw);
  if (!result.success) return { success: false, error: result.error.issues[0]?.message || "Validation failed" };

  try {
    const { images, ...data } = result.data;
    await prisma.$transaction([
      prisma.productImage.deleteMany({ where: { productId } }),
      prisma.product.update({
        where: { id: productId },
        data: {
          ...data,
          status: data.status as "DRAFT" | "PUBLISHED" | "ARCHIVED",
          specifications: data.specifications as object,
          images: {
            create: images.map((url: string, i: number) => ({
              imageUrl: url,
              altText: data.name,
              sortOrder: i,
              isPrimary: i === 0,
            })),
          },
        },
      }),
    ]);
    revalidatePath("/products");
    revalidatePath(`/products/${data.slug}`);
    revalidatePath("/admin/products");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update product." };
  }
}

export async function deleteProduct(productId: string) {
  const admin = await getCurrentAdmin();
  if (!admin) return { success: false, error: "Unauthorized" };
  try {
    await prisma.product.delete({ where: { id: productId } });
    revalidatePath("/products");
    revalidatePath("/admin/products");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete product." };
  }
}

export async function toggleProductStatus(productId: string, currentStatus: string) {
  const admin = await getCurrentAdmin();
  if (!admin) return { success: false, error: "Unauthorized" };
  const newStatus = currentStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
  try {
    await prisma.product.update({ where: { id: productId }, data: { status: newStatus } });
    revalidatePath("/products");
    revalidatePath("/admin/products");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to toggle status." };
  }
}

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
export async function createCategory(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin) return { success: false, error: "Unauthorized" };

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    image: formData.get("image") as string,
    isActive: formData.get("isActive") !== "false",
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  const result = categorySchema.safeParse(raw);
  if (!result.success) return { success: false, error: result.error.errors[0]?.message };

  try {
    await prisma.category.create({ data: result.data });
    revalidatePath("/products");
    revalidatePath("/admin/categories");
    return { success: true };
  } catch {
    return { success: false, error: "Category slug already exists." };
  }
}

export async function updateCategory(categoryId: string, formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin) return { success: false, error: "Unauthorized" };

  const raw = {
    name: formData.get("name") as string,
    slug: formData.get("slug") as string,
    description: formData.get("description") as string,
    image: formData.get("image") as string,
    isActive: formData.get("isActive") !== "false",
    sortOrder: Number(formData.get("sortOrder") || 0),
  };

  const result = categorySchema.safeParse(raw);
  if (!result.success) return { success: false, error: result.error.errors[0]?.message };

  try {
    await prisma.category.update({ where: { id: categoryId }, data: result.data });
    revalidatePath("/products");
    revalidatePath("/admin/categories");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update category." };
  }
}

export async function deleteCategory(categoryId: string) {
  const admin = await getCurrentAdmin();
  if (!admin) return { success: false, error: "Unauthorized" };
  try {
    await prisma.category.delete({ where: { id: categoryId } });
    revalidatePath("/products");
    revalidatePath("/admin/categories");
    return { success: true };
  } catch {
    return { success: false, error: "Category has products. Reassign products first." };
  }
}


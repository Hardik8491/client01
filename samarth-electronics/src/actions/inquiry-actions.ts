"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { inquirySchema } from "@/lib/validations";

// ─── PUBLIC: Submit Inquiry ────────────────────────────────────────────────────
export async function submitInquiry(formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    companyName: formData.get("companyName") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    productId: formData.get("productId") as string,
    productName: formData.get("productName") as string,
    quantity: formData.get("quantity") as string,
    message: formData.get("message") as string,
  };

  const result = inquirySchema.safeParse(raw);
  if (!result.success) {
    return { success: false, error: "Please check all required fields." };
  }

  try {
    const data = result.data;
    await prisma.inquiry.create({
      data: {
        name: data.name,
        companyName: data.companyName || null,
        email: data.email,
        phone: data.phone,
        productId: data.productId || null,
        productName: data.productName || null,
        quantity: data.quantity || null,
        message: data.message,
        status: "NEW",
      },
    });
    return { success: true };
  } catch (err) {
    console.error("Inquiry submission error:", err);
    return { success: false, error: "Server error. Please try again." };
  }
}

// ─── ADMIN: Update Inquiry Status ─────────────────────────────────────────────
export async function updateInquiryStatus(
  inquiryId: string,
  status: "NEW" | "IN_REVIEW" | "CONTACTED" | "QUOTED" | "CLOSED",
  internalNotes?: string
) {
  const admin = await getCurrentAdmin();
  if (!admin) return { success: false, error: "Unauthorized" };

  try {
    await prisma.inquiry.update({
      where: { id: inquiryId },
      data: { status, ...(internalNotes !== undefined && { internalNotes }) },
    });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update inquiry" };
  }
}

// ─── ADMIN: Delete Inquiry ────────────────────────────────────────────────────
export async function deleteInquiry(inquiryId: string) {
  const admin = await getCurrentAdmin();
  if (!admin) return { success: false, error: "Unauthorized" };
  try {
    await prisma.inquiry.delete({ where: { id: inquiryId } });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to delete inquiry" };
  }
}


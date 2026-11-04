"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { setAdminSession, clearAdminSession, getCurrentAdmin } from "@/lib/auth";
import { loginSchema, settingsSchema } from "@/lib/validations";

export async function adminLogin(formData: FormData) {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const result = loginSchema.safeParse(raw);
  if (!result.success) return { success: false, error: "Invalid email or password format." };

  try {
    const user = await prisma.adminUser.findUnique({ where: { email: result.data.email } });
    if (!user) return { success: false, error: "Invalid email or password." };

    const valid = await bcryptjs.compare(result.data.password, user.passwordHash);
    if (!valid) return { success: false, error: "Invalid email or password." };

    await setAdminSession({ email: user.email, name: user.name, role: user.role });
    return { success: true };
  } catch {
    return { success: false, error: "Server error. Please try again." };
  }
}

export async function adminLogout() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function updateCompanySettings(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin) return { success: false, error: "Unauthorized" };

  const raw = {
    companyName: formData.get("companyName") as string,
    ownerName: formData.get("ownerName") as string,
    tagline: formData.get("tagline") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    whatsapp: formData.get("whatsapp") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    pincode: formData.get("pincode") as string,
    country: formData.get("country") as string,
    gstNumber: formData.get("gstNumber") as string,
    workingHours: formData.get("workingHours") as string,
    aboutSummary: formData.get("aboutSummary") as string,
    googleMapsUrl: formData.get("googleMapsUrl") as string,
  };

  const result = settingsSchema.safeParse(raw);
  if (!result.success) return { success: false, error: result.error.issues[0]?.message || "Validation failed" };

  try {
    const existing = await prisma.companySettings.findFirst();
    if (existing) {
      await prisma.companySettings.update({ where: { id: existing.id }, data: result.data });
    } else {
      await prisma.companySettings.create({ data: result.data });
    }
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/admin/settings");
    return { success: true };
  } catch {
    return { success: false, error: "Failed to save settings." };
  }
}

export async function updateAdminPassword(formData: FormData) {
  const admin = await getCurrentAdmin();
  if (!admin) return { success: false, error: "Unauthorized" };

  const currentPassword = formData.get("currentPassword") as string;
  const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!currentPassword || !newPassword || !confirmPassword)
    return { success: false, error: "All password fields are required." };
  if (newPassword !== confirmPassword)
    return { success: false, error: "New passwords do not match." };
  if (newPassword.length < 8)
    return { success: false, error: "New password must be at least 8 characters." };

  try {
    const user = await prisma.adminUser.findUnique({ where: { email: admin.email } });
    if (!user) return { success: false, error: "Admin user not found." };

    const valid = await bcryptjs.compare(currentPassword, user.passwordHash);
    if (!valid) return { success: false, error: "Current password is incorrect." };

    const hash = await bcryptjs.hash(newPassword, 12);
    await prisma.adminUser.update({ where: { id: user.id }, data: { passwordHash: hash } });
    return { success: true };
  } catch {
    return { success: false, error: "Failed to update password." };
  }
}


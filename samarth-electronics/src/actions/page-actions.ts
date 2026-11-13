"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { getCurrentAdmin } from "@/lib/auth";
import { defaultPageContents } from "@/lib/page-content-defaults";

export async function getPageSection<T = any>(pageKey: string, sectionKey: string): Promise<T> {
  try {
    const record = await prisma.pageContent.findUnique({
      where: {
        pageKey_sectionKey: {
          pageKey,
          sectionKey,
        },
      },
    });

    const defaults = (defaultPageContents as any)[pageKey]?.[sectionKey] || {};
    if (record && record.contentJson) {
      return {
        ...defaults,
        ...(record.contentJson as object),
      };
    }
    return defaults;
  } catch (e) {
    console.error(`Error loading page content for ${pageKey}.${sectionKey}:`, e);
    return (defaultPageContents as any)[pageKey]?.[sectionKey] || {};
  }
}

export async function getAllPagesData() {
  try {
    const allRecords = await prisma.pageContent.findMany();
    const result: Record<string, Record<string, any>> = JSON.parse(
      JSON.stringify(defaultPageContents)
    );

    for (const record of allRecords) {
      if (!result[record.pageKey]) {
        result[record.pageKey] = {};
      }
      result[record.pageKey][record.sectionKey] = {
        ...(result[record.pageKey][record.sectionKey] || {}),
        ...(record.contentJson as object),
      };
    }

    return { success: true, data: result };
  } catch (e: any) {
    console.error("Failed to load page contents:", e);
    return { success: false, data: defaultPageContents, error: e.message };
  }
}

export async function savePageSection(
  pageKey: string,
  sectionKey: string,
  contentJson: Record<string, any>
) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Unauthorized. Please login again." };
  }

  try {
    await prisma.pageContent.upsert({
      where: {
        pageKey_sectionKey: {
          pageKey,
          sectionKey,
        },
      },
      update: {
        contentJson,
      },
      create: {
        pageKey,
        sectionKey,
        contentJson,
      },
    });

    // Revalidate affected pages
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/catalogue");
    revalidatePath("/admin/pages");

    return { success: true };
  } catch (e: any) {
    console.error(`Failed to save page section ${pageKey}.${sectionKey}:`, e);
    return { success: false, error: e.message || "Database update failed" };
  }
}

export async function resetPageSection(pageKey: string, sectionKey: string) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return { success: false, error: "Unauthorized." };
  }

  try {
    await prisma.pageContent.deleteMany({
      where: {
        pageKey,
        sectionKey,
      },
    });

    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    revalidatePath("/catalogue");
    revalidatePath("/admin/pages");

    return { success: true };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

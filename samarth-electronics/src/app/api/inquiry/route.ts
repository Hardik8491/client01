import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { inquirySchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
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
      return NextResponse.json({ success: false, error: "Validation failed: " + (result.error.issues[0]?.message || "Invalid input") }, { status: 400 });
    }

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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inquiry API error:", err);
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}


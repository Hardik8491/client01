"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("../src/lib/prisma");
const seed_data_1 = require("../src/lib/seed-data");
async function main() {
    console.log("🌱 Starting Samarth Electronics database seed...");
    // 1. Seed Admin User
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@samarthelectronics.in";
    const rawPassword = process.env.DEFAULT_ADMIN_PASSWORD || "SamarthAdmin@2026";
    const passwordHash = await bcryptjs_1.default.hash(rawPassword, 12);
    const admin = await prisma_1.prisma.adminUser.upsert({
        where: { email: adminEmail },
        update: { passwordHash, name: "Gopal Bhammar" },
        create: {
            email: adminEmail,
            passwordHash,
            name: "Gopal Bhammar",
            role: "OWNER",
        },
    });
    console.log(`✅ Admin user seeded: ${admin?.email || adminEmail}`);
    // 2. Seed Company Settings
    await prisma_1.prisma.companySettings.upsert({
        where: { id: "settings-default" },
        update: {
            companyName: seed_data_1.initialCompanySettings.companyName,
            ownerName: seed_data_1.initialCompanySettings.ownerName,
            tagline: seed_data_1.initialCompanySettings.tagline,
            email: seed_data_1.initialCompanySettings.email,
            phone: seed_data_1.initialCompanySettings.phone,
            whatsapp: seed_data_1.initialCompanySettings.whatsapp,
            address: seed_data_1.initialCompanySettings.address,
            city: seed_data_1.initialCompanySettings.city,
            state: seed_data_1.initialCompanySettings.state,
            pincode: seed_data_1.initialCompanySettings.pincode,
            country: seed_data_1.initialCompanySettings.country,
            gstNumber: seed_data_1.initialCompanySettings.gstNumber,
            workingHours: seed_data_1.initialCompanySettings.workingHours,
            aboutSummary: seed_data_1.initialCompanySettings.aboutSummary,
        },
        create: {
            id: "settings-default",
            companyName: seed_data_1.initialCompanySettings.companyName,
            ownerName: seed_data_1.initialCompanySettings.ownerName,
            tagline: seed_data_1.initialCompanySettings.tagline,
            email: seed_data_1.initialCompanySettings.email,
            phone: seed_data_1.initialCompanySettings.phone,
            whatsapp: seed_data_1.initialCompanySettings.whatsapp,
            address: seed_data_1.initialCompanySettings.address,
            city: seed_data_1.initialCompanySettings.city,
            state: seed_data_1.initialCompanySettings.state,
            pincode: seed_data_1.initialCompanySettings.pincode,
            country: seed_data_1.initialCompanySettings.country,
            gstNumber: seed_data_1.initialCompanySettings.gstNumber,
            workingHours: seed_data_1.initialCompanySettings.workingHours,
            aboutSummary: seed_data_1.initialCompanySettings.aboutSummary,
        },
    });
    console.log("✅ Company settings seeded");
    // 3. Seed Categories
    for (const cat of seed_data_1.initialCategories) {
        await prisma_1.prisma.category.upsert({
            where: { slug: cat.slug },
            update: {
                name: cat.name,
                description: cat.description,
                image: cat.image,
                isActive: cat.isActive,
                sortOrder: cat.sortOrder,
            },
            create: {
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                description: cat.description,
                image: cat.image,
                isActive: cat.isActive,
                sortOrder: cat.sortOrder,
            },
        });
    }
    console.log(`✅ ${seed_data_1.initialCategories.length} Categories seeded`);
    // 4. Seed Products, Images & Variants
    let totalVariantsSeeded = 0;
    for (const prod of seed_data_1.initialProducts) {
        const product = await prisma_1.prisma.product.upsert({
            where: { slug: prod.slug },
            update: {
                name: prod.name,
                sku: prod.sku,
                shortDescription: prod.shortDescription,
                description: prod.description,
                specifications: prod.specifications,
                applications: prod.applications,
                features: prod.features,
                datasheetUrl: prod.datasheetUrl,
                status: prod.status,
                featured: prod.featured,
                sortOrder: prod.sortOrder,
            },
            create: {
                id: prod.id,
                categoryId: prod.categoryId,
                name: prod.name,
                slug: prod.slug,
                sku: prod.sku,
                shortDescription: prod.shortDescription,
                description: prod.description,
                specifications: prod.specifications,
                applications: prod.applications,
                features: prod.features,
                datasheetUrl: prod.datasheetUrl,
                status: prod.status,
                featured: prod.featured,
                sortOrder: prod.sortOrder,
                images: {
                    create: prod.images.map((img) => ({
                        imageUrl: img.imageUrl,
                        altText: img.altText || prod.name,
                        sortOrder: img.sortOrder,
                        isPrimary: img.isPrimary,
                    })),
                },
            },
        });
        // Ensure images exist even if product was updated
        for (const img of prod.images) {
            const existing = await prisma_1.prisma.productImage.findFirst({
                where: { productId: product.id, imageUrl: img.imageUrl },
            });
            if (!existing) {
                await prisma_1.prisma.productImage.create({
                    data: {
                        productId: product.id,
                        imageUrl: img.imageUrl,
                        altText: img.altText || prod.name,
                        sortOrder: img.sortOrder,
                        isPrimary: img.isPrimary,
                    },
                });
            }
        }
        // Seed product variants
        if (prod.variants && prod.variants.length > 0) {
            for (const v of prod.variants) {
                if (!v.sku)
                    continue;
                await prisma_1.prisma.productVariant.upsert({
                    where: { sku: v.sku },
                    update: {
                        wattage: v.wattage,
                        voltage: v.voltage,
                        model: v.model,
                        colour: v.colour,
                        size: v.size,
                        ampere: v.ampere,
                        price: v.price || 0,
                        mrp: v.mrp,
                        warrantyMonths: v.warrantyMonths,
                        batteryBackupHours: v.batteryBackupHours,
                        stock: v.stock || 0,
                        isActive: v.isActive !== false,
                    },
                    create: {
                        id: v.id,
                        productId: product.id,
                        sku: v.sku,
                        wattage: v.wattage,
                        voltage: v.voltage,
                        model: v.model,
                        colour: v.colour,
                        size: v.size,
                        ampere: v.ampere,
                        price: v.price || 0,
                        mrp: v.mrp,
                        warrantyMonths: v.warrantyMonths,
                        batteryBackupHours: v.batteryBackupHours,
                        stock: v.stock || 0,
                        isActive: v.isActive !== false,
                    },
                });
                totalVariantsSeeded++;
            }
        }
    }
    console.log(`✅ ${seed_data_1.initialProducts.length} Products & ${totalVariantsSeeded} Variants seeded`);
    // 5. Seed Services
    for (const serv of seed_data_1.initialServices) {
        await prisma_1.prisma.service.upsert({
            where: { slug: serv.slug },
            update: {
                title: serv.title,
                shortDesc: serv.shortDesc,
                description: serv.description,
                features: serv.features,
                icon: serv.icon,
                imageUrl: serv.imageUrl,
                sortOrder: serv.sortOrder,
                status: serv.status,
            },
            create: {
                id: serv.id,
                title: serv.title,
                slug: serv.slug,
                shortDesc: serv.shortDesc,
                description: serv.description,
                features: serv.features,
                icon: serv.icon,
                imageUrl: serv.imageUrl,
                sortOrder: serv.sortOrder,
                status: serv.status,
            },
        });
    }
    console.log(`✅ ${seed_data_1.initialServices.length} Services seeded`);
    console.log("🎉 Seed finished successfully!");
}
main()
    .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
})
    .finally(async () => {
    if (prisma_1.prisma?.$disconnect) {
        await prisma_1.prisma.$disconnect();
    }
});

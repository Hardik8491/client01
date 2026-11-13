const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const {
  initialCompanySettings,
  initialCategories,
  initialProducts,
  initialServices,
} = require('../dist-seed/src/lib/seed-data.js');

let prisma = new PrismaClient({
  log: ['error'],
});

async function reconnectPrisma() {
  try {
    await prisma.$disconnect();
  } catch {}
  prisma = new PrismaClient({
    log: ['error'],
  });
}

async function withRetry(operation, name, maxRetries = 4) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      console.warn(`[Attempt ${attempt}/${maxRetries}] Transient error on ${name}: ${err.message?.slice(0, 70)}`);
      if (attempt === maxRetries) {
        throw err;
      }
      await reconnectPrisma();
      await new Promise((resolve) => setTimeout(resolve, attempt * 1200));
    }
  }
}

async function main() {
  console.log('🌱 Starting resilient Samarth Electronics database seed...');

  // 1. Seed Admin User
  const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'bhammargopal3@gmail.com';
  const rawPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'SamarthAdmin@2026';
  const passwordHash = await bcrypt.hash(rawPassword, 12);

  await withRetry(async () => {
    return prisma.adminUser.upsert({
      where: { email: adminEmail },
      update: { passwordHash, name: 'Gopal Bhammar' },
      create: {
        email: adminEmail,
        passwordHash,
        name: 'Gopal Bhammar',
        role: 'OWNER',
      },
    });
  }, 'Admin User');
  console.log(`✅ Admin user seeded: ${adminEmail}`);

  // 2. Seed Company Settings
  await withRetry(async () => {
    return prisma.companySettings.upsert({
      where: { id: 'settings-default' },
      update: {
        companyName: initialCompanySettings.companyName,
        ownerName: initialCompanySettings.ownerName,
        tagline: initialCompanySettings.tagline,
        email: initialCompanySettings.email,
        phone: initialCompanySettings.phone,
        whatsapp: initialCompanySettings.whatsapp,
        address: initialCompanySettings.address,
        city: initialCompanySettings.city,
        state: initialCompanySettings.state,
        pincode: initialCompanySettings.pincode,
        country: initialCompanySettings.country,
        gstNumber: initialCompanySettings.gstNumber,
        workingHours: initialCompanySettings.workingHours,
        aboutSummary: initialCompanySettings.aboutSummary,
      },
      create: {
        id: 'settings-default',
        companyName: initialCompanySettings.companyName,
        ownerName: initialCompanySettings.ownerName,
        tagline: initialCompanySettings.tagline,
        email: initialCompanySettings.email,
        phone: initialCompanySettings.phone,
        whatsapp: initialCompanySettings.whatsapp,
        address: initialCompanySettings.address,
        city: initialCompanySettings.city,
        state: initialCompanySettings.state,
        pincode: initialCompanySettings.pincode,
        country: initialCompanySettings.country,
        gstNumber: initialCompanySettings.gstNumber,
        workingHours: initialCompanySettings.workingHours,
        aboutSummary: initialCompanySettings.aboutSummary,
      },
    });
  }, 'Company Settings');
  console.log('✅ Company settings seeded');

  // 3. Seed Categories
  for (const cat of initialCategories) {
    await withRetry(async () => {
      return prisma.category.upsert({
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
    }, `Category: ${cat.name}`);
  }
  console.log(`✅ ${initialCategories.length} Categories seeded`);

  // 4. Seed Products, Images, and Variants
  let seededProducts = 0;
  let seededVariants = 0;

  for (const prod of initialProducts) {
    const product = await withRetry(async () => {
      return prisma.product.upsert({
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
        },
      });
    }, `Product: ${prod.name}`);

    // Seed images for this product
    for (const img of prod.images) {
      await withRetry(async () => {
        const existing = await prisma.productImage.findFirst({
          where: { productId: product.id, imageUrl: img.imageUrl },
        });
        if (!existing) {
          await prisma.productImage.create({
            data: {
              productId: product.id,
              imageUrl: img.imageUrl,
              altText: img.altText || prod.name,
              sortOrder: img.sortOrder,
              isPrimary: img.isPrimary,
            },
          });
        }
      }, `Image for ${prod.name}`);
    }

    // Seed variants if any
    if (prod.variants && prod.variants.length > 0) {
      for (const v of prod.variants) {
        if (!v.sku) continue;
        await withRetry(async () => {
          return prisma.productVariant.upsert({
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
        }, `Variant: ${v.sku}`);
        seededVariants++;
      }
    }

    seededProducts++;
  }
  console.log(`✅ ${seededProducts} Products & ${seededVariants} Variants seeded`);

  // 5. Seed Services
  for (const serv of initialServices) {
    await withRetry(async () => {
      return prisma.service.upsert({
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
    }, `Service: ${serv.title}`);
  }
  console.log(`✅ ${initialServices.length} Services seeded`);

  console.log('🎉 Seed finished completely and successfully!');
}

main()
  .catch((err) => {
    console.error('Fatal seed error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });


const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function check() {
  console.log('Testing connection to DATABASE_URL...');
  const dbUrl = process.env.DATABASE_URL || '';
  console.log('Target host:', dbUrl ? dbUrl.split('@')[1] : 'NOT SET');
  
  const [adminCount, settingsCount, categoryCount, productCount, serviceCount] = await Promise.all([
    prisma.adminUser.count(),
    prisma.companySettings.count(),
    prisma.category.count(),
    prisma.product.count(),
    prisma.service.count(),
  ]);

  console.log('\n--- DATABASE RECORD COUNTS ---');
  console.log('Admin Users:', adminCount);
  console.log('Company Settings:', settingsCount);
  console.log('Categories:', categoryCount);
  console.log('Products:', productCount);
  console.log('Services:', serviceCount);

  if (adminCount > 0) {
    const admin = await prisma.adminUser.findFirst({ select: { email: true, name: true, role: true } });
    console.log('\nAdmin in DB:', admin);
  }

  if (categoryCount > 0) {
    const categories = await prisma.category.findMany({ select: { name: true, slug: true } });
    console.log('\nCategories in DB (total ' + categories.length + '):', categories.map(c => c.name));
  }

  if (productCount > 0) {
    const products = await prisma.product.findMany({ select: { name: true, sku: true }, take: 5 });
    console.log('\nSample Products in DB:', products);
  }
}

check()
  .catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient({ log: ['error'] });

async function createAdmin() {
  const email = 'dev_hardik@service.com';
  const rawPassword = 'Hardik@Dev123';
  const name = 'Hardik (Developer)';
  const role = 'OWNER';

  console.log(`Hashing password and creating/updating admin user: ${email}...`);
  const passwordHash = await bcrypt.hash(rawPassword, 12);

  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: {
      passwordHash,
      name,
      role,
    },
    create: {
      email,
      passwordHash,
      name,
      role,
    },
  });

  console.log('\n✅ Admin user created/updated successfully:');
  console.log('ID:', admin.id);
  console.log('Email:', admin.email);
  console.log('Name:', admin.name);
  console.log('Role:', admin.role);

  // List all admins
  const allAdmins = await prisma.adminUser.findMany({
    select: { id: true, email: true, name: true, role: true, createdAt: true },
  });
  console.log('\n--- ALL ADMIN USERS IN DB ---');
  console.table(allAdmins);

  // Also verify password matches
  const match = await bcrypt.compare(rawPassword, admin.passwordHash);
  console.log('\nPassword verification test:', match ? 'PASSED (Ready to login)' : 'FAILED');
}

createAdmin()
  .catch((e) => {
    console.error('Error creating admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

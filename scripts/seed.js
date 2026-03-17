import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/auth.js';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Cơm', description: 'Các dish cơm phổ biến' },
      { name: 'Mì', description: 'Các dish mì phổ biến' },
      { name: 'Phở', description: 'Các dish phở' },
      { name: 'Salad', description: 'Salad tươi mới' },
      { name: 'Đồ uống', description: 'Các loại nước' },
    ],
  });

  console.log(`✅ Created ${categories.count} categories`);

  // Create admin user
  const adminPassword = await hashPassword('admin123');
  const adminUser = await prisma.user.create({
    data: {
      username: 'admin',
      password: adminPassword,
      userType: 'Admin',
      phone: '0123456789',
      email: 'admin@shipfood.com',
      status: 1,
      admin: {
        create: {
          permissions: 'all',
        },
      },
    },
  });

  console.log(`✅ Created admin user: ${adminUser.username}`);

  // Create test customer
  const customerPassword = await hashPassword('customer123');
  const customerUser = await prisma.user.create({
    data: {
      username: 'customer1',
      password: customerPassword,
      userType: 'Khách hàng',
      phone: '0987654321',
      email: 'customer@example.com',
      status: 1,
      customer: {
        create: {
          name: 'John Doe',
        },
      },
    },
  });

  console.log(`✅ Created test customer: ${customerUser.username}`);

  console.log('✨ Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

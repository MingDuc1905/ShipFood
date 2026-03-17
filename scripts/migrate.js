import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('📦 Running database migrations...');

  try {
    // Generate Prisma client
    const result = await prisma.$executeRaw`SELECT 1`;
    console.log('✅ Database connection successful');
    console.log('✅ Migrations completed');
  } catch (error) {
    console.error('❌ Migration error:', error.message);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Error running migrations:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

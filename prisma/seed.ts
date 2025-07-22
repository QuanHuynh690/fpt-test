import { PrismaClient } from '@prisma-client/user';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { name: 'Alice', email: 'alice@example.com' },
      { name: 'Bob', email: 'bob@example.com' },
      { name: 'Charlie', email: 'charlie@example.com' },
    ],
  });
}

main()
  .then(() => {
    console.log('✅ Seed data inserted!');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error('❌ Error while seeding:', e);
    return prisma.$disconnect();
  });

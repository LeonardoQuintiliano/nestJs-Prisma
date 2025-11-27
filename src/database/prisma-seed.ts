import { PrismaClient } from "@prisma/client";
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const passwordHash = await bcrypt.hash('changeme123', 10);

    const user = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            password: passwordHash,
            name: 'Admin',
            role: 'admin',
        },
    });

    await prisma.book.upsert({
      where: { bar_code: '9780201485677' },
      update: {},
      create: {
        name: 'Refactoring',
        description: 'Improving the Design of Existing Code',
        author: 'Martin Fowler',
        bar_code: '9780201485677',
      },
    });

    await prisma.book.upsert({
      where: { bar_code: '9780132350884' },
      update: {},
      create: {
        name: 'Clean Code',
        description: 'A Handbook of Agile Software Craftsmanship',
        author: 'Robert C. Martin',
        bar_code: '9780132350884',
        owner: { connect: { id: user.id } }, // conecta direto
      },
    });

    console.log("Seed finalizada");
}

main().catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
}).finally(async () => {
    await prisma.$disconnect();
});
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();
const roundsOfHashing = 10;

async function main() {
    const passwordAdmin = await bcrypt.hash('admin', roundsOfHashing);

    const user1 = await prisma.user.upsert({
        where: { email: 'admin@admin.fr' },
        update: {},
        create: {
            email: 'admin@admin.fr',
            password: passwordAdmin,
        },
    });

    console.log({ user1});
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });

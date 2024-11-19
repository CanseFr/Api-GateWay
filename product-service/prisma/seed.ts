import { PrismaClient } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
    // create two dummy articles
    const pizza1 = await prisma.product.upsert({
        where: { title: 'Chorizo' },
        update: {},
        create: {
            title: 'Chorizo',
            description:
                "Sauce tomate maison, mozzarella fior di latte, Chorizo Cular, olives noire taggiasche et Œuf BIO",
            price: 13
        },
    });

    const pizza2 = await prisma.product.upsert({
        where: { title: "4 Fromage" },
        update: {},
        create: {
            title: "4 Fromage",
            description:
                'Base crème, Mozzarella fior di latte, reblochon de Savoie AOP, Raclette de Savoie IGP.',
            price: 12
        },
    });

    console.log({ post1: pizza1, post2: pizza2 });
}

// execute the main function
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        // close Prisma Client at the end
        await prisma.$disconnect();
    });

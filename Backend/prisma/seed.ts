import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create Parent Category
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics & Gadgets",
      slug: "electronics-gadgets",
    },
  });

  // Create Subcategories
  await prisma.category.createMany({
    data: [
      {
        name: "Mobiles",
        slug: "mobiles",
        parentId: electronics.id,
      },
      {
        name: "Laptops",
        slug: "laptops",
        parentId: electronics.id,
      },
    ],
  });

  console.log("✅ Seeded categories successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error while seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });

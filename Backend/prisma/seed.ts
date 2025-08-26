import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const categories = [
    { name: "Electronics", slug: "electronics" },
    { name: "Mobiles", slug: "mobiles", parent: "electronics" },
    { name: "Laptops", slug: "laptops", parent: "electronics" },
    { name: "Fashion", slug: "fashion" },
    { name: "Men", slug: "men", parent: "fashion" },
    { name: "Women", slug: "women", parent: "fashion" },
  ];

  // Create top-level first
  const created: Record<string, number> = {};

  for (const cat of categories) {
    const parentId = cat.parent ? created[cat.parent] : null;

    const c = await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        parentId: parentId ?? undefined,
      },
    });

    created[cat.slug] = c.id;
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });

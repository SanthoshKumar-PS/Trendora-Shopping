import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Laptop products
  await prisma.product.createMany({
    data: [
      {
        name: "Lenovo IdeaPad 3",
        description:
          "The Lenovo IdeaPad 3 is a reliable and lightweight laptop perfect for work, study, and entertainment. It offers a Full HD display, decent processing power, and a comfortable keyboard for daily tasks.",
        features: JSON.stringify([
          { label: "Processor", value: "Intel Core i5-1135G7" },
          { label: "RAM", value: "8GB DDR4" },
          { label: "Storage", value: "512GB SSD" },
          { label: "Display", value: "15.6\" Full HD IPS" },
          { label: "Graphics", value: "Intel Iris Xe" },
          { label: "OS", value: "Windows 11 Home" },
        ]),
        discountedPrice: 48500,
        actualPrice: 55200,
        categoryId: 3, // Laptop
        images: [
          "https://www.pngfind.com/pngs/m/74-744734_lenovo-ideapad-320-transparent-background-lenovo-ideapad-320.png",
          "https://www.pngmart.com/files/15/Lenovo-Laptop-PNG-Transparent-Image.png",
          "https://www.pngitem.com/pimgs/m/345-3459152_lenovo-ideapad-3-laptop-png-transparent-png.png",
          "https://freepngimg.com/thumb/laptop/10-2-laptop-png.png",
          "https://pngimg.com/uploads/laptop/laptop_PNG121.png",
        ],
        stockId: 1,
      },
      {
        name: "HP Pavilion 15",
        description: "HP Pavilion 15 laptop with AMD Ryzen 5 and 8GB RAM.",
        features: JSON.stringify([
          { label: "Processor", value: "AMD Ryzen 5 5500U" },
          { label: "RAM", value: "8GB DDR4" },
          { label: "Storage", value: "256GB SSD" },
          { label: "Display", value: "15.6\" Full HD" },
          { label: "Graphics", value: "AMD Radeon Graphics" },
        ]),
        discountedPrice: 52000,
        actualPrice: 60000,
        categoryId: 3,
        images: [
          "https://www.pngmart.com/files/10/HP-Laptop-PNG-Photo.png",
          "https://www.freepngimg.com/thumb/laptop/15-2-laptop-png-file.png",
          "https://www.pngall.com/wp-content/uploads/5/HP-Laptop-PNG-Free-Download.png",
        ],
        stockId: 2,
      },
    ],
  });

  // Mobile products
  await prisma.product.createMany({
    data: [
      {
        name: "Samsung Galaxy S21",
        description: "Samsung Galaxy S21 smartphone with 8GB RAM and 128GB storage.",
        features: JSON.stringify([
          { label: "Processor", value: "Exynos 2100" },
          { label: "RAM", value: "8GB" },
          { label: "Storage", value: "128GB" },
          { label: "Display", value: "6.2\" AMOLED" },
          { label: "Battery", value: "4000mAh" },
        ]),
        discountedPrice: 62000,
        actualPrice: 70000,
        categoryId: 2, // Mobile
        images: [
          "https://www.pngmart.com/files/7/Samsung-Galaxy-S21-PNG.png",
          "https://www.pngmart.com/files/10/Samsung-S21-Transparent-PNG.png",
        ],
        stockId: 3,
      },
      {
        name: "iPhone 13",
        description: "Apple iPhone 13 with 128GB storage, A15 Bionic chip.",
        features: JSON.stringify([
          { label: "Processor", value: "A15 Bionic" },
          { label: "RAM", value: "4GB" },
          { label: "Storage", value: "128GB" },
          { label: "Display", value: "6.1\" Super Retina XDR" },
          { label: "Battery", value: "3095mAh" },
        ]),
        discountedPrice: 75000,
        actualPrice: 82000,
        categoryId: 2,
        images: [
          "https://www.pngmart.com/files/12/iPhone-13-PNG-Photo.png",
          "https://www.pngall.com/wp-content/uploads/5/iPhone-13-PNG.png",
        ],
        stockId: 4,
      },
    ],
  });

  console.log("Products seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

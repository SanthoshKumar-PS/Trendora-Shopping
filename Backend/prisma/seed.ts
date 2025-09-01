import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const images = [
    "https://res.cloudinary.com/ddlqt8dsf/image/upload/v1756441894/Trendora/srs/lenovoagain2/mjtc9at7ogqfrnalouc5.jpg",
    "https://res.cloudinary.com/ddlqt8dsf/image/upload/v1756441894/Trendora/srs/lenovoagain2/nzr5sndtclqmxzb9ado3.jpg",
    "https://res.cloudinary.com/ddlqt8dsf/image/upload/v1756441894/Trendora/srs/lenovoagain2/fobp1qtb7btufdssprqf.jpg"
  ];
    const features = [
    { label: "Processor", value: "Intel Core i5-1135G7" },
    { label: "RAM", value: "8GB DDR4" },
    { label: "Storage", value: "512GB SSD" },
    { label: "Display", value: "15.6\" Full HD IPS" },
    { label: "Graphics", value: "Intel Iris Xe Graphics" },
    { label: "Operating System", value: "Windows 11 Home" },
    { label: "Battery Life", value: "Up to 7 hours" },
    { label: "Weight", value: "1.65 kg" },
    { label: "Connectivity", value: "Wi-Fi 6, Bluetooth 5.0" },
    { label: "Ports", value: "USB-C, USB-A, HDMI, SD card reader" }
  ];

  const products = Array.from({ length: 30 }, (_, i) => ({
    name: `Product ${i + 1}`,
    description: `The HP Ideapad is a reliable and lightweight laptop perfect for work, study, and entertainment. It offers a Full HD display, decent processing power, and a comfortable keyboard for daily tasks. ${i + 1}.`,
    features: features,
    discountPercentage: i % 2 === 0 ? 30-i : 0, // every 3rd product has a discount
    discountedPrice: 45000 - (i * 500),
    actualPrice: 50000 - (i * 500),
    categoryId: 3,
    images,
    stockId: 1,
    avgRating: i%5,
    numRating: i%5 
  }));

  await prisma.product.createMany({
    data: products,
    skipDuplicates: true, // won't insert if duplicate name+stockId
  });

  console.log("✅ Seeded 20 products");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

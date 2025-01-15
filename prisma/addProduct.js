// addProduct.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const newProduct = await prisma.product.create({
    data: {
      name: 'Single Yugioh Card',
      description: 'This is a new Yugioh Card',
      price: 14.99,
      imageUrl: 'https://m.media-amazon.com/images/I/81uTgCY9W3L._AC_UL320_.jpg'
    },
  });

  console.log('Added new product:', newProduct);
}

main()
  .catch(e => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

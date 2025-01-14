// addProduct.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const newProduct = await prisma.product.create({
    data: {
      name: 'Pokemon Cards',
      description: 'This is a description of the new pokemon Cards',
      price: 19.99,
      imageUrl: 'https://m.media-amazon.com/images/I/61MVcnn+3oL._AC_UL320_.jpg'
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

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 99,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "rating" TEXT NOT NULL
);

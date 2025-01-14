/*
  Warnings:

  - Added the required column `numRatings` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 99,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "rating" REAL NOT NULL,
    "numRatings" INTEGER NOT NULL
);
INSERT INTO "new_Product" ("description", "id", "imageUrl", "name", "price", "rating", "stock") SELECT "description", "id", "imageUrl", "name", "price", "rating", "stock" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

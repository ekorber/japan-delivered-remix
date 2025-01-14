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
    "rating" REAL NOT NULL DEFAULT 0,
    "numRatings" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Product" ("description", "id", "imageUrl", "name", "numRatings", "price", "rating", "stock") SELECT "description", "id", "imageUrl", "name", "numRatings", "price", "rating", "stock" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

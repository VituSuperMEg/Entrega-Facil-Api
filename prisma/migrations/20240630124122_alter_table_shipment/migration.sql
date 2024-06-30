/*
  Warnings:

  - Made the column `product_id` on table `Shipment` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Shipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER NOT NULL,
    "codigo" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "recebido_em" DATETIME NOT NULL,
    CONSTRAINT "Shipment_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Shipment" ("codigo", "criado_em", "destino", "id", "origem", "product_id", "recebido_em", "status") SELECT "codigo", "criado_em", "destino", "id", "origem", "product_id", "recebido_em", "status" FROM "Shipment";
DROP TABLE "Shipment";
ALTER TABLE "new_Shipment" RENAME TO "Shipment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

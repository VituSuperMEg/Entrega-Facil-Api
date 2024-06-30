-- AlterTable
ALTER TABLE "Personal" ADD COLUMN "municipio" TEXT;

-- CreateTable
CREATE TABLE "Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "preco" TEXT NOT NULL,
    "quantidade" TEXT NOT NULL,
    "img" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Shipment" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_id" INTEGER,
    "codigo" TEXT NOT NULL,
    "origem" TEXT NOT NULL,
    "destino" TEXT NOT NULL,
    "criado_em" DATETIME NOT NULL,
    "status" TEXT NOT NULL,
    "recebido_em" DATETIME NOT NULL,
    CONSTRAINT "Shipment_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER,
    "shipment_id" INTEGER,
    CONSTRAINT "Order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Order_shipment_id_fkey" FOREIGN KEY ("shipment_id") REFERENCES "Shipment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

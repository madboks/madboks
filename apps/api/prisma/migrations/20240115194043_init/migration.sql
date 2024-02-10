-- CreateTable
CREATE TABLE "Items" (
    "id" TEXT NOT NULL,
    "volunteer" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Products" (
    "id" TEXT NOT NULL,
    "barcode" TEXT NOT NULL,
    "kg" DOUBLE PRECISION NOT NULL,
    "vegetableId" TEXT NOT NULL,
    "countryCode" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vegetables" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guideline" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Vegetables_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Supermarkets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supermarkets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Countries" (
    "code" VARCHAR(3) NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Countries_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "_ProductsToSupermarkets" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Products_barcode_key" ON "Products"("barcode");

-- CreateIndex
CREATE UNIQUE INDEX "Vegetables_name_key" ON "Vegetables"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Countries_name_key" ON "Countries"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductsToSupermarkets_AB_unique" ON "_ProductsToSupermarkets"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductsToSupermarkets_B_index" ON "_ProductsToSupermarkets"("B");

-- AddForeignKey
ALTER TABLE "Items" ADD CONSTRAINT "Items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_vegetableId_fkey" FOREIGN KEY ("vegetableId") REFERENCES "Vegetables"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_countryCode_fkey" FOREIGN KEY ("countryCode") REFERENCES "Countries"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToSupermarkets" ADD CONSTRAINT "_ProductsToSupermarkets_A_fkey" FOREIGN KEY ("A") REFERENCES "Products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductsToSupermarkets" ADD CONSTRAINT "_ProductsToSupermarkets_B_fkey" FOREIGN KEY ("B") REFERENCES "Supermarkets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

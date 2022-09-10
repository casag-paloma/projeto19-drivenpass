/*
  Warnings:

  - You are about to drop the column `ExpirationDate` on the `Card` table. All the data in the column will be lost.
  - You are about to drop the column `Type` on the `Card` table. All the data in the column will be lost.
  - Added the required column `expirationDate` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "ExpirationDate",
DROP COLUMN "Type",
ADD COLUMN     "expirationDate" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

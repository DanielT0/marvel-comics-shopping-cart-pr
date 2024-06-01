/*
  Warnings:

  - Added the required column `src` to the `purchasedComics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `purchasedComics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "purchasedComics" ADD COLUMN     "src" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

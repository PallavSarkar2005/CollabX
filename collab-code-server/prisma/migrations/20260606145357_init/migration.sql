/*
  Warnings:

  - You are about to drop the column `code` on the `Room` table. All the data in the column will be lost.
  - Added the required column `files` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "code",
ADD COLUMN     "files" JSONB NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

/*
  Warnings:

  - You are about to drop the column `authorId` on the `Login` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Login` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Login" DROP CONSTRAINT "Login_authorId_fkey";

-- AlterTable
ALTER TABLE "public"."Login" DROP COLUMN "authorId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Login" ADD CONSTRAINT "Login_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - Added the required column `difficulty` to the `Guide` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Difficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- AlterTable
ALTER TABLE "public"."Guide" ADD COLUMN     "category" TEXT,
ADD COLUMN     "difficulty" "public"."Difficulty" NOT NULL,
ADD COLUMN     "estimatedTime" TEXT,
ADD COLUMN     "icon" TEXT,
ADD COLUMN     "sections" JSONB;

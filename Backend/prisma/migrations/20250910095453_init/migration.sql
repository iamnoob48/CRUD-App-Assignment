-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "completedTask" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "streak" INTEGER NOT NULL DEFAULT 0;

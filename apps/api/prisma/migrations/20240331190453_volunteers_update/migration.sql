/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Volunteer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Volunteer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VolunteerRole" AS ENUM ('LEADER', 'SHADOW_LEADER', 'HELPER');

-- AlterTable
ALTER TABLE "Volunteer" ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VolunteerShifts" ADD COLUMN     "role" "VolunteerRole" NOT NULL DEFAULT 'HELPER';

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer_email_key" ON "Volunteer"("email");

/*
  Warnings:

  - You are about to drop the column `ahp_alternatives_set` on the `DecisionRoom` table. All the data in the column will be lost.
  - You are about to drop the column `ahp_criteria_set` on the `DecisionRoom` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."DecisionRoom" DROP COLUMN "ahp_alternatives_set",
DROP COLUMN "ahp_criteria_set";

-- CreateTable
CREATE TABLE "public"."Criterion" (
    "critrion_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "order" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Criterion_pkey" PRIMARY KEY ("critrion_id")
);

-- CreateTable
CREATE TABLE "public"."Alternative" (
    "alternative_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Alternative_pkey" PRIMARY KEY ("alternative_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Criterion_room_id_name_key" ON "public"."Criterion"("room_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Alternative_room_id_name_key" ON "public"."Alternative"("room_id", "name");

-- AddForeignKey
ALTER TABLE "public"."Criterion" ADD CONSTRAINT "Criterion_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."DecisionRoom"("room_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Alternative" ADD CONSTRAINT "Alternative_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "public"."DecisionRoom"("room_id") ON DELETE CASCADE ON UPDATE CASCADE;

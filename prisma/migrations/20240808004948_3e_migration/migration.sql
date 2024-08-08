/*
  Warnings:

  - You are about to drop the `toDo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "toDo";

-- CreateTable
CREATE TABLE "todo" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "todo_pkey" PRIMARY KEY ("id")
);

import { todo } from "@prisma/client";
import prisma from "./prisma";

export async function getTodos(): Promise<todo[]> {
  try {
    console.log("getTodos");
    return await prisma.todo.findMany();
  } catch (error) {
    throw new Error("Failed to fetch todos");
  }
}

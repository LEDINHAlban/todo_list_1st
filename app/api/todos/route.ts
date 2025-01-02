import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function PUT(req: Request) {
  const todo = await req.json();

  try {
    const updatedTodo = await prisma.todo.update({
      where: { id: Number(todo.id) },
      data: todo,
    });

    return NextResponse.json(updatedTodo, { status: 200 });
  } catch (error) {
    console.error("Failed to update todo:", error);
    return NextResponse.json(
      { error: "Failed to update todo" },
      { status: 500 }
    );
  }
}

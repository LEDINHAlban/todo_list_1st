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

export async function POST(req: Request) {
  const { description, checked } = await req.json();

  try {
    const newTodo = await prisma.todo.create({
      data: { description, checked },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error("Error creating todo:", error);
    return NextResponse.json(
      { error: "Failed to create todo" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  try {
    await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json("todo deleted", { status: 200 });
  } catch (error) {
    console.error("Error deleting todo:", error);
    return NextResponse.json(
      { error: "Failed to delete todo" },
      { status: 500 }
    );
  }
}

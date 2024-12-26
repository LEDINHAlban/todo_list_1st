"use server";

import prisma from "./prisma";

export async function createTodo(formData: FormData) {
  const rawFormData = {
    description: formData.get("description"),
  };

  if (typeof rawFormData.description !== "string") {
    throw new Error("Description must be a string.");
  }

  await prisma.todo.create({
    data: {
      description: rawFormData.description, // ✅ Fournir la valeur correctement
    },
  });
}

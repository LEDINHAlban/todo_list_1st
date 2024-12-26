// import data from "./mockData.json";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { createTodo } from "@/app/lib/actions";
import prisma from "./lib/prisma";

export default async function Home() {
  const todos = await prisma.todo.findMany();
  return (
    <>
      <main className="container">
        <ul className="grid gap-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex items-center space-x-2 py-5 px-4 bg-gray-100 rounded-md shadow"
            >
              <Checkbox id={`${todo.id}`} defaultChecked={todo.checked} />
              <Input defaultValue={todo.description} />
            </li>
          ))}

          <form action={createTodo}>
            <Input defaultValue={""} name="description" />
            <button type="submit">Create Invoice</button>
          </form>
        </ul>
      </main>
    </>
  );
}

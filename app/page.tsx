// import data from "./mockData.json";

import TodoList from "../components/TodoList";
import prisma from "./lib/prisma";

export default async function Home() {
  const todos = await prisma.todo.findMany({
    orderBy: [
      {
        id: "desc",
      },
    ],
  });
  return <TodoList todos={todos} />;
}

"use client";

import { todo } from "@prisma/client";
import { useState } from "react";

type TodoListProps = {
  todos: todo[];
};

export default function TodoList({ todos }: TodoListProps) {
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [todoList, setTodoList] = useState(todos);

  const handleSave = async (id: number) => {
    const todo = todoList.find((t) => t.id === id);
    if (!todo) return;

    try {
      const response = await fetch(`/api/todos`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          description: todo.description,
          checked: todo.checked,
        }),
      });

      if (!response.ok) throw new Error("Failed to update todo");

      const updatedTodo = await response.json();
      console.log("Todo updated:", updatedTodo);

      setTodoList((prevList) =>
        prevList.map((t) => (t.id === id ? updatedTodo : t))
      );

      setEditingTodoId(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const handleInputChange = (id: number, value: string) => {
    setTodoList((prevList) =>
      prevList.map((t) => (t.id === id ? { ...t, description: value } : t))
    );
  };

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setTodoList((prevList) =>
      prevList.map((t) => (t.id === id ? { ...t, checked } : t))
    );
  };

  return (
    <main className="container">
      <ul className="grid gap-2">
        {todoList.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between space-x-2 py-5 px-4 bg-gray-100 rounded-md shadow"
          >
            {editingTodoId === todo.id ? (
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id={`${todo.id}`}
                  checked={todo.checked}
                  onChange={(e) =>
                    handleCheckboxChange(todo.id, e.target.checked)
                  }
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <input
                  type="text"
                  value={todo.description}
                  onChange={(e) => handleInputChange(todo.id, e.target.value)}
                  className={`border rounded px-2 py-1`}
                />
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  id={`${todo.id}`}
                  checked={todo.checked}
                  disabled
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span
                  className={`border rounded px-2 py-1 ${
                    todo.checked ? "line-through" : ""
                  }`}
                >
                  {todo.description}
                </span>
              </div>
            )}
            <button
              onClick={() =>
                editingTodoId === todo.id
                  ? handleSave(todo.id)
                  : setEditingTodoId(todo.id)
              }
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              {editingTodoId === todo.id ? "Save" : "Edit"}
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

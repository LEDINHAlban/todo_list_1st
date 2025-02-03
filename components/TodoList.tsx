"use client";

import { todo } from "@prisma/client";
import { useState } from "react";

type TodoListProps = {
  todos: todo[];
};

export default function TodoList({ todos }: TodoListProps) {
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [todoList, setTodoList] = useState(todos);
  const [newTodoDescription, setNewTodoDescription] = useState("");

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

  const handleCreateTodo = async () => {
    if (!newTodoDescription.trim()) return;

    try {
      const response = await fetch(`/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: newTodoDescription,
          checked: false,
        }),
      });

      if (!response.ok) throw new Error("Failed to create todo");

      const newTodo = await response.json();
      console.log("Todo created:", newTodo);

      setTodoList((prevList) => [newTodo, ...prevList]);
      setNewTodoDescription("");
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/todos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      });

      if (!response.ok) throw new Error("Failed to create todo");

      setTodoList((prevList) => prevList.filter((todo) => id !== todo.id));
    } catch (error) {
      console.log("Error deleting todo", error);
    }
  };

  return (
    <main className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden mt-8">
      <div className="px-4 py-2 bg-blue-500">
        <h1 className="text-white font-bold text-2xl uppercase text-center">
          To-Do List
        </h1>
      </div>
      {/* creation todo */}
      <div className="w-full max-w-xl mx-auto px-4 py-2">
        <div className="flex items-center border-b-2 border-teal-500 py-2">
          <input
            type="text"
            value={newTodoDescription}
            onChange={(e) => setNewTodoDescription(e.target.value)}
            placeholder="Enter a new todo"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
          <button
            onClick={handleCreateTodo}
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

      {/* todo list  */}
      <ul className="divide-y divide-gray-200 px-4">
        {todoList.map((todo) => (
          <li key={todo.id} className="py-4 flex justify-between items-center">
            <div className="flex items-center w-full">
              <input
                type="checkbox"
                id={`${todo.id}`}
                checked={todo.checked}
                onChange={(e) =>
                  handleCheckboxChange(todo.id, e.target.checked)
                }
                className="form-checkbox h-5 w-5 text-blue-600"
                disabled={editingTodoId !== todo.id}
              />
              {editingTodoId === todo.id ? (
                <input
                  type="text"
                  value={todo.description}
                  onChange={(e) => handleInputChange(todo.id, e.target.value)}
                  className="w-full ml-3 border rounded px-2 py-1 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ) : (
                <span
                  className={`ml-3 px-2 py-1 ${
                    todo.checked ? "line-through text-gray-500" : ""
                  }`}
                >
                  {todo.description}
                </span>
              )}
            </div>
            <div className="flex">
              <button
                onClick={() =>
                  editingTodoId === todo.id
                    ? handleSave(todo.id)
                    : setEditingTodoId(todo.id)
                }
                className="bg-blue-500 text-white px-3 py-1 rounded mr-1 hover:bg-blue-600 transition"
              >
                {editingTodoId === todo.id ? "Save" : "Edit"}
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}

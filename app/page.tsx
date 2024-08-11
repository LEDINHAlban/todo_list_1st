// import data from "./mockData.json";
import prisma from "./lib/prisma";

export default async function Home() {
  const todos = await prisma.todo.findMany();
  return (
    <>
      <main>
        <div className="grid-cols-12 space-y-2">
          {todos &&
            todos.map((el) => {
              return (
                <div key={el.id}>
                  <input
                    type="checkbox"
                    id={`${el.id}`}
                    defaultChecked={el.checked}
                  ></input>
                  <label
                    htmlFor={`${el.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {el.description}
                  </label>
                </div>
              );
            })}
        </div>
      </main>
    </>
  );
}

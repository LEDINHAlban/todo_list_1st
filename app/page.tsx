"use client";
import data from "./mockData.json";

export default function Home() {
  return (
    <>
      <main>
        <div className="grid-cols-12 space-y-2">
          {data.map((el) => {
            return (
              <div key={el.id}>
                <input
                  type="checkbox"
                  id={el.id}
                  checked={el.checked}
                  onClick={() => console.log("click")}
                ></input>
                <label
                  htmlFor={el.id}
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

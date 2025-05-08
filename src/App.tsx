import { useState, useEffect } from "react";
import NavBar from "./components/layout/navbar";
import Task from "./Types/Task";
import TodoList from "./components/section/todo-list/Todo-list";

function App() {
  const [listTasks, setListTasks] = useState<Task[]>([]);
  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setListTasks(tasks);
    console.log(listTasks);
  }, []);

  return (
    <div className="min-h-screen pl-5 pr-5 pt-2 PrimaryColor PrimaryFontColor">
      <NavBar setListTasks={setListTasks} />
      <TodoList listTasks={listTasks} setListTasks={setListTasks} />
    </div>
  );
}

export default App;

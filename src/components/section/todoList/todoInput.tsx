import React, { useState } from "react";
import Task from "../../../Types/Task";

const TodoInput = ({ setListTasks }: PropsType) => {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState(false);

  const handleSubmit = async () => {
    if (task) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push({ MyTask: task, Status: status });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setListTasks((prev) => [...prev, { MyTask: task, Status: status }]);
      setTask("");
      setStatus(false);
    } else {
      console.log("Task field empty");
    }
  };

  return (
    <div className="flex flex-col border rounded-xl p-5 gap-2">
      <label htmlFor="task" className="text-2xl">
        Task:
      </label>
      <textarea
        id="task"
        className="h-28 rounded-xl p-1 SecondaryColor placeholder-white placeholder: text-xl"
        placeholder="Task Description"
        onChange={(e) => setTask(e.target.value)}
        value={task}
        required
      />
      <div className="flex gap-6 ">
        <label htmlFor="status" className="text-2xl">
          Status:
        </label>
        <input
          id="status"
          className="w-6 SecondaryColor"
          type="checkbox"
          checked={status}
          onChange={(e) => {
            setStatus(e.target.checked);
          }}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="SecondaryColor w-32 rounded-3xl border p-2 text-xl"
          onClick={handleSubmit}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

type PropsType = {
  setListTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export default TodoInput;

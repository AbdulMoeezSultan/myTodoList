import React, { useState } from "react";
import Task from "../../../Types/Task";
import PrimaryButton from "../../ui/button/primary-button";
const TodoInput = ({ setListTasks, setToggler }: PropsType) => {
  const [task, setTask] = useState("");
  const [status, setStatus] = useState(false);

  const AddTask = () => {
    if (task) {
      const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      tasks.push({ MyTask: task, Status: status });
      localStorage.setItem("tasks", JSON.stringify(tasks));
      setListTasks((prev) => [...prev, { MyTask: task, Status: status }]);
      setTask("");
      setStatus(false);
      setToggler(false);
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
        <PrimaryButton Name={"Add Task"} Function={AddTask}/>
      </div>
    </div>
  );
};

type PropsType = {
  setListTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  setToggler: React.Dispatch<React.SetStateAction<boolean>>;
};

export default TodoInput;

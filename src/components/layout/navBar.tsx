import { useState } from "react";
import Task from "../../Types/Task";
import TodoInput from "../section/todoList/todoInput";

const NavBar = ({setListTasks}: PropsType) => {
  const [toggler, setToggler] = useState(false);
  return (
    <div className="border-b-2 border-white p-2 flex justify-end mb-10">
      <button
        className=" border p-2 rounded-3xl SecondaryColor text-lg w-32"
        onClick={() => {  
          setToggler(!toggler);
        }}
      >
        Create Task
      </button>
      {toggler && (
        <div
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          onClick={() => {
            setToggler(false);
          }}
        >
          <div
            className="relative SecondaryColor p-4 w-full max-w-md max-h-full rounded-xl"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <div className="relative rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-4 md:p-5">
                <h3 className="text-3xl PrimaryFontColor">Create Task</h3>
                <button
                  type="button"
                  className="end-2.5 bg-transparent rounded-lg text-3xl font-medium w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={() => {
                    setToggler(!toggler);
                  }}
                >
                  X
                </button>
              </div>

              <TodoInput setListTasks={setListTasks} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

type PropsType = {
  setListTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export default NavBar;

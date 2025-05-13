import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'
import Task from '../../../Types/Task'
import NoTasks from '../../../assets/NoTasks.webp'
import { Action } from '../../../Reducers/TaskReducer'

type PropsType = {
  tasks: Task[]
  dispatch: React.Dispatch<Action>
}

const ToDoList = ({ tasks, dispatch }: PropsType) => {
  const UpdateStatus = (Index: number) => {
    dispatch({ type: 'TOGGLE_TASK', index: Index })
  }

  const DeleteTask = (Index: number) => {
    dispatch({ type: 'DELETE_TASK', index: Index })
  }

  return (
    <div className="min-h-screen">
      {tasks.length > 0 ? (
        <div className="flex flex-col flex-wrap lg:flex-row gap-5 justify-center">
          {tasks.map((t, index) => (
            <div
              className="flex justify-between items-center lg:w-[45%] border border-white p-5 text-3xl rounded-xl"
              key={index}
            >
              <div
                className={`mr-10 lg:mr-7 text-justify ${t.Status ? 'line-through' : 'no-underline'}`}
              >
                {t.MyTask}
              </div>
              <div className="flex gap-5 justify-center items-center">
                <div className="flex ">
                  <label htmlFor={`status${index}`} className="sr-only">
                    Status
                  </label>
                  <input
                    type="checkbox"
                    id={`status${index}`}
                    checked={t.Status}
                    onChange={() => {
                      UpdateStatus(index)
                    }}
                    className="size-8"
                  />
                </div>
                <div
                  className="cursor-pointer no-underline"
                  onClick={() => {
                    DeleteTask(index)
                  }}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <img src={NoTasks} alt="No Tasks to do" />
        </div>
      )}
    </div>
  )
}

export default ToDoList

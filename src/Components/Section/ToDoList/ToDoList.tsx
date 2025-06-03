import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenFancy } from '@fortawesome/free-solid-svg-icons'
import Task from '../../../Types/Task'
import NoTasks from '../../../Assets/NoTasks.webp'
import { Action } from '../../../Reducers/TaskReducer'

type PropsType = {
  tasks: Task[]
  dispatch: React.Dispatch<Action>
}

const ToDoList = ({ tasks, dispatch }: PropsType) => {
  const [isUpdating, setIsUpdating] = useState<number | null>(null)
  const updateStatus = (taskIndex: number) => {
    dispatch({ type: 'TOGGLE_TASK', index: taskIndex })
  }

  const updateTask = (taskIndex: number) => {
    return isUpdating !== taskIndex
      ? setIsUpdating(taskIndex)
      : setIsUpdating(null)
  }

  const deleteTask = (taskIndex: number) => {
    dispatch({ type: 'DELETE_TASK', index: taskIndex })
  }

  return (
    <div className="min-h-screen">
      {tasks.length > 0 ? (
        <div className="flex flex-col flex-wrap gap-5 justify-center items-center">
          {tasks.map((t, index) => (
            <div
              className="flex justify-between items-center w-[95%] lg:w-[75%] border border-white p-5 text-3xl rounded-xl"
              key={index}
            >
              <div
                className={`mr-10 lg:mr-7 text-justify ${t.status ? 'line-through' : 'no-underline'}`}
              >
                {isUpdating !== index ? (
                  t.myTask
                ) : (
                  <>
                    <label htmlFor={`update${index}`} className="sr-only">
                      Update Task
                    </label>
                    <input
                      type="input"
                      id={`update${index}`}
                      className="SecondaryColor rounded-2xl pl-2 p-1"
                      value={t.myTask}
                      onChange={(e) => {
                        dispatch({
                          type: 'UPDATE_TASK',
                          payload: {
                            index,
                            task: { myTask: e.target.value, status: t.status },
                          },
                        })
                      }}
                    />
                  </>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                <div className="flex ">
                  <label htmlFor={`status${index}`} className="sr-only">
                    Status
                  </label>
                  <input
                    type="checkbox"
                    id={`status${index}`}
                    checked={t.status}
                    onChange={() => {
                      updateStatus(index)
                    }}
                    className="size-8"
                  />
                </div>
                <div
                  className="cursor-pointer no-underline"
                  onClick={() => {
                    updateTask(index)
                  }}
                >
                  <FontAwesomeIcon icon={faPenFancy} />
                </div>
                <div
                  className="cursor-pointer no-underline"
                  onClick={() => {
                    deleteTask(index)
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

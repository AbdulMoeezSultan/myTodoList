import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faPenFancy } from '@fortawesome/free-solid-svg-icons'
import Task from '../../../Types/Task'
import NoTasks from '../../../assets/NoTasks.webp'
import { Action } from '../../../Reducers/TaskReducer'

type PropsType = {
  tasks: Task[]
  dispatch: React.Dispatch<Action>
}

const ToDoList = ({ tasks, dispatch }: PropsType) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isUpdating, setIsUpdating] = useState<number | null>(null)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const savedTasks: Task[] = JSON.parse(
        localStorage.getItem('tasks') || '[]',
      )
      dispatch({ type: 'SET_TASK', payload: savedTasks })
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timeoutId)
  }, [])

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
      {isLoading ? (
        <div
          role="status"
          className="flex justify-center items-center gap-5 text-4xl font-bold"
        >
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#979696] border-4"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span>Fetching Data</span>
        </div>
      ) : (
        <>
          {tasks.length > 0 ? (
            <div className="flex flex-col flex-wrap gap-5 justify-center items-center">
              {tasks.map((t, index) => (
                <div
                  className="flex justify-between items-center w-[95%] lg:w-[75%] border border-white p-5 text-3xl rounded-xl"
                  key={index}
                >
                  <div
                    className={`mr-10 lg:mr-7 text-justify w-full ${t.status ? 'line-through' : 'no-underline'}`}
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
                          className="bg-secondary rounded-2xl pl-2 p-1 w-[100%]"
                          value={t.myTask}
                          onChange={(e) => {
                            dispatch({
                              type: 'UPDATE_TASK',
                              payload: {
                                index,
                                task: {
                                  myTask: e.target.value,
                                  status: t.status,
                                },
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
                      role="button"
                      aria-label="Task Update"
                      onClick={() => {
                        updateTask(index)
                      }}
                    >
                      <FontAwesomeIcon icon={faPenFancy} />
                    </div>
                    <div
                      role="button"
                      aria-label="Task Delete"
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
        </>
      )}
    </div>
  )
}

export default ToDoList

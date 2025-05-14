import { useState } from 'react'
import Task from '../../../Types/Task'
import PrimaryButton from '../../ui/Button/PrimaryButton'
import { Action } from '../../../Reducers/TaskReducer'

type PropsType = {
  dispatch: React.Dispatch<Action>
  setToggler: React.Dispatch<React.SetStateAction<boolean>>
}

const ToDoInput = ({ dispatch, setToggler }: PropsType) => {
  const [newTask, setNewTask] = useState<Task>({MyTask: "", Status: false})

  const AddTask = () => {
    if (newTask?.MyTask) {
      dispatch({ type: 'ADD_TASK', payload: newTask })
      setNewTask({MyTask: "", Status: false})
      setToggler(false)
    } else {
      console.log('Task field empty')
    }
  }

  return (
    <div className="flex flex-col border rounded-xl p-5 gap-2">
      <label htmlFor="task" className="text-2xl">
        Task:
      </label>
      <textarea
        id="task"
        className="h-28 rounded-xl p-1 SecondaryColor placeholder-white placeholder: text-xl"
        placeholder="Task Description"
        onChange={(e) => setNewTask({...newTask, MyTask: e.target.value})}
        value={newTask?.MyTask}
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
          checked={newTask?.Status}
          onChange={(e) => {
            setNewTask({...newTask, Status:e.target.checked})
          }}
        />
      </div>
      <div className="flex justify-center">
        <PrimaryButton Name={'Add Task'} Function={AddTask} />
      </div>
    </div>
  )
}

export default ToDoInput

import { useReducer, useEffect } from 'react'
import { taskReducer } from '../Reducers/TaskReducer'

const useTaskUpdate = () => {
  const [tasks, dispatch] = useReducer(taskReducer, [])

  useEffect(() => {
    if (tasks.length > 0) localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])
  return { tasks, dispatch }
}

export default useTaskUpdate

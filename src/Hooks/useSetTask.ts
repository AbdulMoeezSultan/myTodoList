import { useState, useEffect } from 'react'
import { Action } from '../Reducers/TaskReducer'
import Task from '../Types/Task'

const useSetTask = (dispatch: React.Dispatch<Action>) => {
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

  return { isLoading, isUpdating, setIsUpdating }
}

export default useSetTask

import { useEffect, useReducer } from 'react'
import { taskReducer } from './Reducers/TaskReducer'
import Navbar from './Componentsed/Layout/Navbar'
import Task from './Types/Task'
import TodoList from './Componentsed/Section/ToDoList/ToDoList'

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, [])
  useEffect(() => {
    const savedTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]')
    dispatch({ type: 'SET_TASK', payload: savedTasks })
  }, [])

  useEffect(() => {
    if (tasks.length > 0) localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <div className="min-h-screen pl-5 pr-5 pt-2 PrimaryColor PrimaryFontColor">
      <Navbar dispatch={dispatch} />
      <TodoList tasks={tasks} dispatch={dispatch} />
    </div>
  )
}

export default App

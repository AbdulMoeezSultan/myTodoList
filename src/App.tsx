import { useEffect, useReducer } from 'react'
import { taskReducer } from './Reducers/TaskReducer'
import NavBar from './components/layout/NavBar'
import Task from './Types/Task'
import TodoList from './components/section/ToDoList/ToDoList'

function App() {
  const [tasks, dispatch] = useReducer(taskReducer, [])
  useEffect(() => {
    const savedTasks: Task[] = JSON.parse(localStorage.getItem('tasks') || '[]')
    dispatch({ type: 'SET_TASK', payload: savedTasks })
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <div className="min-h-screen pl-5 pr-5 pt-2 PrimaryColor PrimaryFontColor">
      <NavBar dispatch={dispatch} />
      <TodoList tasks={tasks} dispatch={dispatch} />
    </div>
  )
}

export default App

import { lazy, Suspense } from 'react'
import useTasks from './Hooks/useTaskUpdate'
import Navbar from './Components/Layout/Navbar'
const TodoList = lazy(() => import('./Components/Section/ToDoList/ToDoList'))

function App() {
  const { tasks, dispatch } = useTasks()
  return (
    <div className="min-h-screen bg-primary pl-5 pr-5 pt-2 text-primaryfont">
      <Navbar dispatch={dispatch} />
      <Suspense
        fallback={
          <div className="flex justify-center items-center text-4xl font-bold">
            Loading...
          </div>
        }
      >
        <TodoList tasks={tasks} dispatch={dispatch} />
      </Suspense>
    </div>
  )
}

export default App

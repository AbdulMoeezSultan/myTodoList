import { taskReducer, Action } from './TaskReducer'
import Task from '../Types/Task'

const initialTasks: Task[] = [
  { myTask: 'Task 1', status: false },
  { myTask: 'Task 2', status: true },
]

describe('taskReducer', () => {
  test('SET_TASK', () => {
    const newTasks: Task[] = [{ myTask: 'New Task', status: false }]
    const action: Action = { type: 'SET_TASK', payload: newTasks }

    const result = taskReducer(initialTasks, action)
    expect(result).toEqual(newTasks)
  })

  test('ADD_TASK', () => {
    const newTask: Task = { myTask: 'Added Task', status: false }
    const action: Action = { type: 'ADD_TASK', payload: newTask }

    const result = taskReducer(initialTasks, action)
    expect(result).toEqual([...initialTasks, newTask])
  })

  test('TOGGLE_TASK', () => {
    const action: Action = { type: 'TOGGLE_TASK', index: 0 }

    const result = taskReducer(initialTasks, action)
    expect(result[0].status).toBe(true)
  })

  test('UPDATE_TASK', () => {
    const updatedTask: Task = { myTask: 'Updated Task 1', status: false }
    const action: Action = {
      type: 'UPDATE_TASK',
      payload: { index: 0, task: updatedTask },
    }

    const result = taskReducer(initialTasks, action)
    expect(result[0].myTask).toBe('Updated Task 1')
  })

  test('DELETE_TASK', () => {
    const action: Action = { type: 'DELETE_TASK', index: 1 }

    const result = taskReducer(initialTasks, action)
    expect(result).toHaveLength(1)
    expect(result[0].myTask).toBe('Task 1')
  })
})

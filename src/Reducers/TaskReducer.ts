import Task from '../Types/Task'

export type Action =
  | { type: 'SET_TASK'; payload: Task[] }
  | { type: 'ADD_TASK'; payload: Task }
  | { type: 'TOGGLE_TASK'; index: number }
  | { type: 'DELETE_TASK'; index: number }

export const taskReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case 'SET_TASK':
      return action.payload
    case 'ADD_TASK':
      return [...state, action.payload]
    case 'TOGGLE_TASK':
      return state.map((task, i) =>
        i === action.index ? { ...task, Status: !task.Status } : task,
      )
    case 'DELETE_TASK':
      return state.filter((_, i) => i !== action.index)
    default:
      return state
  }
}

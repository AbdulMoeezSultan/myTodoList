import { render, screen, fireEvent } from '@testing-library/react'
import ToDoInput from '../Components/Section/ToDoList/ToDoInput'

type PrimaryButtonProps = {
  name: string
  myFunction: () => void
}

jest.mock('../Components/Ui/Button/PrimaryButton', () => {
  const MockPrimaryButton = ({ name, myFunction }: PrimaryButtonProps) => (
    <button onClick={myFunction}>{name}</button>
  )
  MockPrimaryButton.displayName = 'MockPrimaryButton'
  return MockPrimaryButton
})

const mockDispatch = jest.fn()
const mockSetToggler = jest.fn()

describe('ToDoInput Component', () => {
  test('matches snapshot', () => {
    const { asFragment } = render(
      <ToDoInput dispatch={mockDispatch} setToggler={mockSetToggler} />,
    )
    expect(asFragment()).toMatchSnapshot()
  })

  beforeEach(() => {
    render(<ToDoInput dispatch={mockDispatch} setToggler={mockSetToggler} />)
  })

  test('checking that the input fields are there', () => {
    expect(screen.getByLabelText(/Task:/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Task Description/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Status:/i)).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /Add Task/i }),
    ).toBeInTheDocument()
  })

  test('adds task when input is filled', () => {
    const textarea = screen.getByPlaceholderText(/Task Description/i)
    const checkbox = screen.getByLabelText(/Status:/i)
    const addButton = screen.getByRole('button', { name: /Add Task/i })

    fireEvent.change(textarea, { target: { value: 'Write tests' } })
    fireEvent.click(checkbox)
    fireEvent.click(addButton)

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'ADD_TASK',
      payload: { myTask: 'Write tests', status: true },
    })
    expect(mockSetToggler).toHaveBeenCalledWith(false)
  })

  test('does not dispatch if input is empty', () => {
    const addButton = screen.getByRole('button', { name: /Add Task/i })
    fireEvent.click(addButton)
    expect(mockDispatch).not.toHaveBeenCalled()
    expect(mockSetToggler).not.toHaveBeenCalled()
  })

  test('does not dispatch if task already exist', () => {
    const existingTasks = [{ myTask: 'Test Task', status: false }]
    localStorage.setItem('tasks', JSON.stringify(existingTasks))
    const textarea = screen.getByPlaceholderText(/Task Description/i)
    const checkbox = screen.getByLabelText(/Status:/i)
    const addButton = screen.getByRole('button', { name: /Add Task/i })

    fireEvent.change(textarea, { target: { value: 'Test Task' } })
    fireEvent.click(checkbox)
    fireEvent.click(addButton)

    expect(mockDispatch).not.toHaveBeenCalled()
    expect(mockSetToggler).not.toHaveBeenCalled()
  })
})

import { useState } from 'react'
import TodoInput from '../Section/ToDoList/ToDoInput'
import PrimaryButton from '../Ui/Button/PrimaryButton'
import { Action } from '../../Reducers/TaskReducer'

type props = {
  dispatch: React.Dispatch<Action>
}

const Navbar = ({ dispatch }: props) => {
  const [toggler, setToggler] = useState(false)
  return (
    <div className="border-b-2 border-white p-2 flex justify-end mb-10">
      <PrimaryButton
        name={'Create Task'}
        myFunction={() => setToggler(!toggler)}
      />
      {toggler && (
        <div
          className="flex overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
          onClick={() => {
            setToggler(false)
          }}
        >
          <div
            className="relative bg-[#9796967c] p-4 w-full max-w-md max-h-full rounded-xl"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <div className="relative rounded-lg shadow-sm">
              <div className="flex items-center justify-between p-4 md:p-5">
                <h3 className="text-3xl PrimaryFontColor">Create Task</h3>
                <button
                  type="button"
                  className="end-2.5 rounded-lg text-3xl font-medium w-8 h-8 ms-auto inline-flex justify-center items-center"
                  onClick={() => {
                    setToggler(!toggler)
                  }}
                >
                  X
                </button>
              </div>

              <TodoInput dispatch={dispatch} setToggler={setToggler} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar

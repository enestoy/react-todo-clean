import React from 'react'
import { FaRegCircle,FaRegTrashAlt,FaCheckCircle } from "react-icons/fa";


const TodoItem = ({todo, toggle,deleteTodo}) => {
  return (
    <div className="w-full flex items-center px-2 py-4 gap-2 border-b  cursor-pointer select-none" onClick={()=>toggle(todo.id)}>
      {
        todo.isComplete ? (<FaCheckCircle className="text-sky-500 size-5" /> )
        :(<FaRegCircle className="text-sky-500 size-5" /> )

      }
     
       <p className={`flex-1 ${todo.isComplete ? "line-through" : ""}`}> {todo.text} </p>
       <FaRegTrashAlt className="text-red-600 size-5 hover:scale-110 transition-all" onClick={()=>deleteTodo(todo.id)} />
      
    </div>
  )
}

export default TodoItem

import { useState } from "react";
import Link from 'next/link'

function SingleTodo({ todo, handleDelete, handleComplete }) {

    const [toggleCompleted, setToggelCompleted] = useState(false)

    return (
        <div className="todo">
            <div>
                <h3>{todo.title}</h3>
                <p>{todo.details}</p>
            </div>
            <div className="icons">
                <Link href={`EditPage/${todo.id}`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                <button onClick={() => {
                    setToggelCompleted(!toggleCompleted)
                    handleComplete(todo)
                }} className={toggleCompleted ? "active" : ""}>Completed</button>
            </div>
        </div>
    )
}

export default SingleTodo
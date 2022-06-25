import { useState } from "react";
import Link from 'next/link'

function SingleTodo({ todo, handleDelete, handleComplete }) {

    const [toggleCompleted, setToggelCompleted] = useState(false)
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="todo">
            <div onClick={() => setShowDetails(!showDetails)}>
                <h3>{todo.title}</h3>
                {showDetails && <p>{todo.details}</p>}
            </div>
            <div className="icons">
                <Link href={`EditPage/${todo.id}`}>
                    <button>Edit</button>
                </Link>
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                <button onClick={() => {
                    setToggelCompleted(!toggleCompleted)
                    handleComplete(todo)
                }} className={todo.completed ? "active" : ""}>Completed</button>
            </div>
        </div>
    )
}

export default SingleTodo
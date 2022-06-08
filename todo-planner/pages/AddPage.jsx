import { useState } from "react"

function AddTodo() {

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const todo = { title, details, completed: false };

        fetch("http://localhost:5000/projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        }).catch(error => console.log(error))

        setTitle("")
        setDetails("")
    }

    return (
        <div className="add-todo">
            <h3>Add your task !!!</h3>
            <form onSubmit={handleSubmit}>

                <label htmlFor="title">Title: </label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label htmlFor="details">Details: </label>
                <input type="text" name="details" value={details} onChange={(e) => setDetails(e.target.value)} required />
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddTodo
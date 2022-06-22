import { useState } from "react"

function AddTodo() {

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const todo = { title, details, completed: false };

        fetch("https://jsonserver-backend.herokuapp.com/projects/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        }).catch(error => {
            console.log(error)
            setError(true)
        })
        setTitle("")
        setDetails("")

        setTimeout(() => {
            setError(false)
        }, 3000);

    }

    return (
        <div className="add-todo">
            <h3>Add your notes !!!</h3>
            {error && <p style={{ color: "red" }}>An error occurred ! Please try again.</p>}
            <form onSubmit={handleSubmit}>

                <label htmlFor="title">Title: </label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label htmlFor="details">Details: </label>
                <textarea name="details" value={details} onChange={(e) => setDetails(e.target.value)} required />
                <button>Add</button>
            </form>
        </div>
    )
}

export default AddTodo
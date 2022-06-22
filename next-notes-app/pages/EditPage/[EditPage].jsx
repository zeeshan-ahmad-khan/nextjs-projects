import { useState, useEffect } from "react";
import { useRouter } from "next/router";

function EditPage() {

    const [title, setTitle] = useState("");
    const [details, setDetails] = useState("");
    const [error, setError] = useState(false)
    const router = useRouter();
    const { EditPage } = router.query;

    useEffect(() => {
        fetch(`https://jsonserver-backend.herokuapp.com/projects/${EditPage}`)
            .then(res => res.json())
            .then(data => {
                setTitle(data.title)
                setDetails(data.details)
            })
            .catch(error => console.log(error))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const todo = { title, details };

        fetch(`https://jsonserver-backend.herokuapp.com/projects/${EditPage}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(todo)
        })
            .then(() => {
                setTitle("")
                setDetails("")
                router.push('/');
            })
            .catch(error => {
                setError(true);
                console.log(error)
            })

        setTimeout(() => {
            setError(false)
        }, 3000);

    }

    return (
        <div className="edit-todo">
            <h3>Edit your task !!!</h3>
            {error && <p style={{ color: "red" }}>An error occurred ! Please try again.</p>}
            <form onSubmit={handleSubmit}>

                <label htmlFor="title">Title: </label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />

                <label htmlFor="details">Details: </label>
                <textarea name="details" value={details} onChange={(e) => setDetails(e.target.value)} required />
                <button>Update</button>
            </form>
        </div>
    )
}

export default EditPage
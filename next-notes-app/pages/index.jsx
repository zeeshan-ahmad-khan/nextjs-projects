import { useEffect, useState } from "react"
import SingleTodo from "../components/SingleTodo";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [fetching, setFetching] = useState(false);

  const handleDelete = (id) => {
    fetch("https://jsonserver-backend.herokuapp.com/projects/" + id, {
      method: 'DELETE'
    })
      .then(() => setFetching(true))
      .catch(error => console.log(error))
  }

  const handleComplete = (todo) => {
    fetch("https://jsonserver-backend.herokuapp.com/projects/" + todo.id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ completed: !todo.completed })
    })
      .then(() => setFetching(true))
      .catch(error => console.log(error))
  }

  useEffect(() => {
    fetch("https://jsonserver-backend.herokuapp.com/projects/")
      .then(res => res.json())
      .then(data => {
        setTodos(data)
        setFetching(false)
      })
      .catch(error => console.log(error))
  }, [fetching])

  if (todos.length === 0) {
    return <h1 style={{ textAlign: "center" }}>NOTHING TO SHOW. PLEASE ADD SOME NOTES.</h1>
  }

  return (
    <div className="home">
      <h1>Your Notes</h1>
      <p style={{ width: "100%" }}>Click on the title to reveal its content !!!</p>
      {todos.map(todo => {
        return (
          <SingleTodo todo={todo} key={todo.id} handleDelete={handleDelete} handleComplete={handleComplete} />
        )
      })}
    </div>
  )
}

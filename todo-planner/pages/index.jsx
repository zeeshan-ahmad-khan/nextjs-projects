import { useEffect, useState } from "react"
import SingleTodo from "../components/SingleTodo";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [fetching, setFetching] = useState(false);

  const handleDelete = (id) => {
    fetch("http://localhost:5000/projects/" + id, {
      method: 'DELETE'
    })
      .then(() => setFetching(true))
      .catch(error => console.log(error))
  }

  const handleComplete = (todo) => {
    fetch("http://localhost:5000/projects/" + todo.id, {
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
    fetch("http://localhost:5000/projects")
      .then(res => res.json())
      .then(data => {
        setTodos(data)
        setFetching(false)
      })
      .catch(error => console.log(error))
  }, [fetching])

  return (
    <div className="home">
      <h1>Daily Todos</h1>
      {todos.map(todo => {
        return (
          <SingleTodo todo={todo} key={todo.id} handleDelete={handleDelete} handleComplete={handleComplete} />
        )
      })}
    </div>
  )
}

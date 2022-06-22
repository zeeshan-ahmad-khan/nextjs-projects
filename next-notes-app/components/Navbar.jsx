import Link from "next/link"

function Navbar() {
    return (
        <div className="navbar">
            <Link href='/'>Home</Link>
            <Link href='/AddPage'>Add Task</Link>
        </div>
    )
}

export default Navbar
import {Link} from 'react-router-dom'
function NavBar() {
    return(
        <nav className='flex justify-between p-2 bg-slate-800 text-white font-bold'>
            <div>
            To Do App
            </div>
            <ul className='flex  gap-10 p-2'>
                <li><Link to="/">List</Link></li>
                <li><Link to="/add">Add Task</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar;
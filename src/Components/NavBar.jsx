// src/Components/NavBar.js
import { Link } from 'react-router-dom';

function NavBar({ token, setToken }) {
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT
    setToken(null);                   // update app state
  };

  return (
    <nav className="flex justify-between p-4 bg-slate-800 text-white font-bold">
      <div>To Do App</div>
      <ul className="flex gap-6 items-center">
        {token ? (
          <>
            <li><Link to="/">List</Link></li>
            <li><Link to="/add">Add Task</Link></li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;

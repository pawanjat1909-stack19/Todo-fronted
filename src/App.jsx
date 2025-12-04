
import './App.css'
import NavBar from './Components/NavBar'
import { Route, Routes,Navigate } from 'react-router-dom'
import AddTask from './Components/AddTask'
import List from './Components/List'
import { useState } from 'react'
import Login from './Components/Login'
import Register from './Components/Register'

function App() {
 const [token, setToken] = useState(localStorage.getItem("token"));
const PrivateRoute =({element , token} ) => {
  return token ? element : <Navigate to='/login'/>
};

  return (
    <>
    <NavBar token={token} setToken={setToken} />
  <Routes>

  <Route path="/login" element={<Login setToken={setToken} />} />
    <Route path="/register" element={<Register />} /> 
  <Route path="/" element={<PrivateRoute element={<List token={token} />} token={token} />} />
  <Route path="/add" element={<PrivateRoute element={<AddTask token={token} />} token={token} />} />
  
  </Routes>
    
  
    </>
  )
}

export default App

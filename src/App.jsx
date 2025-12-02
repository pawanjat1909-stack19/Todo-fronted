
import './App.css'
import NavBar from './Components/NavBar'
import { Route, Routes } from 'react-router-dom'
import AddTask from './Components/AddTask'
import List from './Components/List'

function App() {
 

  return (
    <>
    <NavBar/>
    <Routes>
      <Route path='/' element={<List/>}/>
      <Route path='/add' element={<AddTask/>}/>

    </Routes>
    
  
    </>
  )
}

export default App

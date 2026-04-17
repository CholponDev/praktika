import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './component/Header'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Home from './component/Home'
import ProtectedRoute from './component/ProtectedRoute'
import Login from './pages/Login'
import RoleProtectedRoute from './component/RoleProtectedRoute'
import AdminPage from './pages/AdminPage'
import FindJob from './pages/FindJob'
import { useState } from 'react'


function App() {
  const [city, setCity] = useState("all");

  return (
    <BrowserRouter>

    <Header city={city} setCity={setCity} />

    <main className='main'>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path='login' element = {<Login/>}/>
      <Route path='/jobs' element ={<FindJob city={city}/>}/>

      <Route element={<RoleProtectedRoute allowedRole="user" />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>   

      <Route element={<RoleProtectedRoute allowedRole="admin" />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
   
      </Routes>
    </main>
    
    </BrowserRouter>
  )
}

export default App

import { HomePage } from './Pages/HomePage'
import { Cart } from './Home-Component/Cart'
import { Routes, Route } from 'react-router'
import { MalePerfume } from './Home-Component/Male-perfume'
import { Login } from "./Auth/Auth-Component/login"
import { SignUp } from "./Auth/Auth-Component/signup"
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/Male-Perfumes" element={<MalePerfume />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  )
}

export default App

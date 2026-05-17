import { HomePage } from './Component/HomePage'
import { Cart } from './Component/Cart'
import {Routes, Route} from 'react-router'
import { MalePerfume } from './Component/Male-perfume'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/Male-Perfumes" element={<MalePerfume />} />
    </Routes>
  )
}

export default App

import { HomePage } from './User/Pages/HomePage'
import { Cart } from './User/Pages/cart'
import { Routes, Route } from 'react-router'
import { MalePerfume } from './User/male-component/Male-perfume'
import { Login } from './Auth/Auth-Component/login'
import { SignUp } from './Auth/Auth-Component/signup'
import { Checkout } from './User/Pages/checkout'
import { OrderSuccess } from './User/Pages/order-success'
import { Orders } from './User/Pages/orders'
import { OrderDetails } from './User/Order-Component/order-details'
import { AdminOrders } from './Admin/Orders-Comp/admin-orders'
import './App.css'

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/Male-Perfumes" element={<MalePerfume />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/:orderId" element={<OrderDetails />} />
      <Route path="/admin/orders" element={<AdminOrders />} />
    </Routes>
  )
}

export default App

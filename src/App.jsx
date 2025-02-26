import React, { useEffect, useState } from 'react'
import Loginpage from './pages/Loginpage'
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Nav from './components/Nav'
import DetailedProduct from './pages/DetailedProduct'
import SideDraw from './components/SideDraw'
import Catagorys from './pages/Catagorys'
import CatagoryProduct from './pages/CatagoryProduct'
import Recents from './pages/Recents'
import Cart from './pages/Cart'
import Order from './pages/Order'

const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';
  const [searchTerm,setSearchTerm]=useState('');

  return (
    <>
   
        {showNavbar && <Nav setSearchTerm={setSearchTerm}/>}
        {showNavbar && <SideDraw/>}
      
        <div className={showNavbar && "ml-16 mt-24 md:mt-20"}>
          <Routes>
            <Route path='/' element={<Loginpage />}></Route>
            <Route path='/home' element={<Home searchTerm={searchTerm}/>} ></Route>
            <Route path='/product/:id' element={<DetailedProduct />}></Route>
            <Route path='/ALLcatagorys' element={<Catagorys />}></Route>
            <Route path='/cat/:catagory' element={<CatagoryProduct />}></Route>
            <Route path='/recents' element={<Recents />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/order' element={<Order/>}></Route>
          </Routes>
        </div>
    </>
  )
}

export default App

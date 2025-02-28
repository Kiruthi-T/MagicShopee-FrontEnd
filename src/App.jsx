import React, { lazy, Suspense, useEffect, useState } from 'react'
// import Loginpage from './pages/Loginpage'
const Loginpage=lazy(()=>import("./pages/Loginpage"))
import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
// import Home from './pages/Home'
const Home = lazy(()=>import ('./pages/Home'));

import Nav from './components/Nav'
import DetailedProduct from './pages/DetailedProduct'
import SideDraw from './components/SideDraw'
import Catagorys from './pages/Catagorys'
import CatagoryProduct from './pages/CatagoryProduct'
import Recents from './pages/Recents'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import CheckOut from './pages/CheckOut'
import axios from 'axios'
import Orders from './pages/All-Orders'
import CircularProgress from '@mui/material/CircularProgress';
import Fav from './pages/fav';

const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/';
  const [searchTerm,setSearchTerm]=useState('');
  const [userDetails,setUserDetails]=useState({name:"",mail:"",_id:""});

  const BACKEND_API = import.meta.env.VITE_BACKEND_API


  useEffect(() => {
    async function run() {
        const token = localStorage.getItem("token")
        try {
            const details =await axios.get(`${BACKEND_API}/profile`, { headers: { Authorization: `bearer ${token}` } });
            console.log(details.data);
            setUserDetails(details.data)

        }
        catch (err) {
            console.log(err);

        }
    }
    run();
}, [])

  return (
    <>
   
        {showNavbar && <Nav setSearchTerm={setSearchTerm} userDetails={userDetails}/>}
        {showNavbar && <SideDraw/>}
      <Suspense fallback={ <CircularProgress color="secondary" sx={{margin:"100vh"}}/>}>
        <div className={showNavbar && "ml-16 mt-24 md:mt-20"}>
          <Routes>
            <Route path='/' element={<Loginpage />}></Route>
            <Route path='/home' element={<Home searchTerm={searchTerm}/>} ></Route>
            <Route path='/product/:id' element={<DetailedProduct />}></Route>
            <Route path='/ALLcatagorys' element={<Catagorys />}></Route>
            <Route path='/cat/:catagory' element={<CatagoryProduct />}></Route>
            <Route path='/recents' element={<Recents />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
            <Route path='/checkout' element={<CheckOut userDetails={userDetails}/>}></Route>
            <Route path='/profile' element={<Profile userDetails={userDetails} />}></Route>
            <Route path='/All-Orders' element={<Orders />}></Route>
            <Route path='/Favorites' element={<Fav />}></Route>


          </Routes>
        </div>
        </Suspense>
    </>
  )
}

export default App

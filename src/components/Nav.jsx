// import React from 'react';
import { TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'


function Nav({setSearchTerm,userDetails}) {
  const navigate=useNavigate();
  const handleclick=()=>{
    navigate("/home",{state:{scrollToProduct:true}})
  }

  return (
    <>
      <nav className="ml-3 flex justify-between flex-col items-center md:flex-row p-3  w-full bg-gray-50 shadow-md z-10 fixed ">
        {/* Brand Name */}
        <h1 className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-orange-400 to-purple-500 text-transparent bg-clip-text drop-shadow-lg md:ml-20">
          Welcome {userDetails.name}!
        </h1>
        {/* Search Bar */}
        <div className="flex items-center space-x-2">
          <SearchIcon className="text-gray-500 mt-1 ml-2" />
           <TextField id="standard-basic"  variant="standard" placeholder='Search Products...' onClick={handleclick} onChange={(e)=>setSearchTerm(e.target.value)}/>
        </div>
      </nav>
    </>
  );
}

export default Nav;

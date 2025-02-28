import React, { useContext, useEffect, useRef, useState } from 'react'
import Products from '../components/Prodcts';
import axios from 'axios';
import './home.css'
import Homecatagory from '../components/Homecatagory';
import { ProductContext } from '../contexts/ProductContext';
import { useLocation } from 'react-router-dom';


const Home = ({searchTerm}) => {

  // const { Allproducts } = useProduct();

  const Allproducts=useContext(ProductContext);

  
  const productRef=useRef(null);
  const location=useLocation();



  useEffect(()=>{
    if(location.state?.scrollToProduct&&productRef.current){
      productRef.current.scrollIntoView({behavior:"smooth"})
    }
  },[location])
  
 
    const Searched=searchTerm? Allproducts.filter((item)=>item.category.toLowerCase().includes(searchTerm.toLowerCase()) || item.description.toLowerCase().includes(searchTerm.toLowerCase()) || item.title.toLowerCase().includes(searchTerm.toLowerCase())):Allproducts



  const images = [
    {forimg:"family.png",Text:"Family"},
     {forimg:"boy.png",Text:"Boys"}, 
    {forimg:"girl.png",Text:"girls"},
    {forimg: "couple.png",Text:"couple matching"},
     
    {forimg:"men.png",Text:"Men"},
       {forimg:"women.png",Text:"Women"}

  ]
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [images.length]);

  
  return (
    <div>
      {/* <Catagorys cat={cat}/> */}
      <Homecatagory/>

      <div className='homebox1 mt-1 flex-col md:flex-row md:h-96 -ml-2'>
        <div >
          <h1 className='text-2xl m-2 text-black md:text-4xl'>Welcome to Magic Shopee</h1>
          <p className='hidden md:block '>
            Discover the perfect products for you and your loved ones.
            Browse our diverse collection of fashion, lifestyle, and more.
          </p>
          <h3 className='text-gray-800 text-2xl'>Find Your Perfect Style:  <span className="animated-text">{images[currentIndex].Text}</span></h3>
        </div>
        <img src={images[currentIndex].forimg} alt="not found" height="300px" width="300px" />
      </div>
      <h1 className='text-gray-800 text-3xl ml-16 mt-4 '  ref={productRef}>Recomended Products</h1>

      <Products productDetails={Searched}/>
    </div>
  )
}

export default Home

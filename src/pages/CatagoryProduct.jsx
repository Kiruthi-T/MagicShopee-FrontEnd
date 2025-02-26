import React, { useContext, useEffect, useState } from 'react'
import Products from '../components/Prodcts'
import { ProductContext } from '../contexts/ProductContext';
import { useParams } from 'react-router-dom';

const CatagoryProduct = () => {
    const [product,setproducts]=useState([]);
    const {catagory}=useParams();
     console.log("cat",catagory);
     
    const Allproducts=useContext(ProductContext);
    
    useEffect(()=>{
        const filtered=Allproducts.filter((item)=>item.category.toLowerCase().includes(catagory.toLowerCase()));
        console.log(filtered);
        
        setproducts(filtered);
    }, [Allproducts, catagory])
    

  return (
    <div>
        <h1 className="text-3xl font-bold uppercase text-center text-gray-800">{catagory}s</h1>
      <Products productDetails={product}/>
    </div>
  )
}

export default CatagoryProduct

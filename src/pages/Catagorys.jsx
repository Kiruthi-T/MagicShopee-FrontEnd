import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../contexts/ProductContext';
import { useNavigate } from 'react-router-dom';


const Catagorys = () => {
  const [cat,setCat]=useState([]);

  const navigate=useNavigate()
  
const productlist=useContext(ProductContext);

   useEffect(()=>{
    const categoryMap = productlist.reduce((acc, product) => {            
        if (!acc[product.category]) {
            acc[product.category] = product.images?.[0]; // Store the first product image              
        }
        return acc;
      }, {});

      // Convert object to array
      const categoryArray = Object.entries(categoryMap).map(([name, image]) => ({
        name,
        image,
      }));

      setCat(categoryArray);
      console.log(categoryArray);
  
   },[productlist])
          
        
    return (
        <>
            <div className='flex justify-evenly flex-wrap text-center m-2 '>

                {cat.map(item => (
                    <div className='flex flex-col m-3 cursor-pointer hover:scale-110' onClick={()=>navigate(`/cat/${item.name}`)}>
                       <div className=' bg-purple-200  text-wrap text-center relative border-2 border-rose-600 rounded-full h-11 w-11 md:h-20 md:w-20 m-2'>
                            <img src={item.image} alt="not found" className='h-full w-svw absolute bottom-2 drop-shadow-2xl shadow-black' />
                        </div>
                        <h1 className='w-24 text-center -ml-2'>{item.name}</h1>
                    </div>
                ))}
            </div>

        </>
    )
}

export default Catagorys

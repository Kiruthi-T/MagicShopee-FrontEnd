import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'

const BACKEND_API = import.meta.env.VITE_BACKEND_API;

export const ProductContext = createContext();

// Custom Hook for using ProductContext
// export const useProduct = () => {
//     return useContext(ProductContext);
//   };

const ProductProvider = (props) => {

  const [Allproducts, setAllproducts] = useState([]);


  
  useEffect(() => {
    async function api() {
      const productDetails = await axios.get(`${BACKEND_API}/products`);

      const productlist =await productDetails.data
      console.log(productlist);

      setAllproducts(productlist)
      console.log("products", Allproducts);

    }
    api();



  }, [])
  return (
    <div>
      <ProductContext.Provider value={Allproducts}>
        {props.children}
      </ProductContext.Provider>
    </div>
  )
}

export default ProductProvider

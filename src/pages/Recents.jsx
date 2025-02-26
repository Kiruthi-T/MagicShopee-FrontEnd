import React, { useEffect, useState } from 'react'
import Products from '../components/Prodcts'
import axios from 'axios';
const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const Recents = () => {
  const [recents, setRecent] = useState([]);
  const products = recents.map(item => item.products);

  const recentproducts =products.reverse()
  const [msg, setmsg] = useState('')

  useEffect(() => {
    async function run() {
      const token = localStorage.getItem("token");
      console.log("geted", token);
      const details = await axios.get(`${BACKEND_API}/recents`, { headers: { Authorization: `Bearer ${token}` } });

      setRecent(details.data)
      // console.log(details.data);


    }
    run();
  }, []);


  console.log(recentproducts);

  const ClearRecent = async () => {
    const token = localStorage.getItem("token");

    const details = await axios.delete(`${BACKEND_API}/recents/del`, { headers: { Authorization: `Bearer ${token}` } });
    console.log(details.data.deletedCount);
    setRecent([]);
    setmsg(`Deleted ${details.data.deletedCount} Recents`)

  }
  return (
    <div>
      {msg &&
        <div
          className={`flex items-center p-4 mb-4 text-sm rounded-lg  text-green-700 bg-green-100`}
          role="alert"
        >                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M8.293 12.293a1 1 0 0 1 1.414 0l2-2a1 1 0 0 1 1.414 1.414l-2 2a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 0-1.414z" />
            <path fill-rule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm1-8a1 1 0 1 1-2 0V7a1 1 0 1 1 2 0v3z" clip-rule="evenodd" />
          </svg>
          <span className="font-medium">{msg}</span>
        </div>}
      <h2 className="text-gray-800 text-3xl text-center mt-4 ">RECENTS</h2>
      {recents.length === 0 ? <p className="text-gray-500 text-2xl text-center mt-4 ">NO Recently viewed.</p> : null}
      {recentproducts.length > 0 && (
        <button className="bg-red-500 p-2 m-2 text-end rounded-lg" onClick={ClearRecent}>Clear Recents</button>
      )}
      <Products productDetails={recentproducts} />
    </div>
  )
}

export default Recents

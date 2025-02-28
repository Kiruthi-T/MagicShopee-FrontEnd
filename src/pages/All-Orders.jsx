import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ProductContext } from '../contexts/ProductContext';


const BACKEND_API = import.meta.env.VITE_BACKEND_API

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const allproduct = useContext(ProductContext);
  console.log(allproduct);

  useEffect(() => {
    async function run() {
      const token = localStorage.getItem("token")
      try {
        const details = await axios.get(`${BACKEND_API}/order/all`, { headers: { Authorization: `bearer ${token}` } });
        console.log(details.data);
        setOrders(details.data);

      }
      catch (err) {
        console.log(err);

      }
    }
    run();
  }, [])

  return (
    <div>
            <h2 className="text-gray-800 text-3xl text-center mt-4 ">My Orders</h2>

       {orders.length === 0 ? <p className="text-gray-500 text-2xl text-center mt-4 ">No Orders Yes.</p> : null}

      {orders.map((order) => (
        <div className="max-w-3xl mx-auto p-6 gap-2 m-4 bg-red-50  shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Order Details</h2>
          <p className="text-gray-600">Order ID: {order._id}</p>
          <p className="text-gray-600">Date: {new Date(order.createdAt).toLocaleString()}</p>
          <p className="text-gray-600">Payment Method: {order.paymentMethod}</p>


          <h3 className="text-xl font-semibold mt-4">Ordered Items</h3>
          <ul className="border rounded-lg p-4 mb-3">
            {order.orderedItems.map((item) => {
              const product = allproduct.find(p => p._id === item.product);
              return (
                <li key={item._id} className="border-b py-2 flex items-center">
                  {product && <img src={product.images[0]} alt={product.title} className="w-16 h-16 mr-4" />}
                  <div>
                    <p className="font-semibold">{product ? product.title : 'Unknown Product'}</p>
                    <p>Price: ₹{product ? product.price : 'N/A'}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </li>
              );
            })}
            <h3 className="text-xl font-semibold mt-4">Total Price</h3>
          <p className="text-green-600 font-bold text-lg">₹{order.totalPrice}</p>

          </ul>


          <Accordion sx={{backgroundColor:"#F3E5", }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              
            >
              <h3 className="text-xl font-semibold ">Shipping Address</h3>
            </AccordionSummary>
            <AccordionDetails>
              <p>{order.shippingAddress.Fname} {order.shippingAddress.Lname}</p>
              <p>{order.shippingAddress.street}, {order.shippingAddress.city}</p>
              <p>{order.shippingAddress.state}, {order.shippingAddress.Zip}, {order.shippingAddress.Country}</p>
              <p>Email: {order.shippingAddress.Email}</p>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  )
}

export default Orders




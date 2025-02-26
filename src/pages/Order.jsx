import React, { useContext } from 'react'
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import CreditCard from '@mui/icons-material/CreditCard'


const Order = () => {
    const { state } = useContext(CartContext)
    const { cart } = state;
    console.log(cart);
    const navigate = useNavigate();
    const totel = Math.round(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));

      const handlePlaceOrder=(e)=>{
        e.preventDefault();
        // const orderData={

        // }

        navigate('/home')
      }

//   const handlePlaceOrder = async (e) => {
//     e.preventDefault();
//     const orderData = {
//       user: "65d123456789abcdef123456", // Replace with logged-in user ID
//       orderItems: cart.map((item) => ({
//         product: item._id,
//         name: item.title,
//         image: item.images[0],
//         price: item.price,
//         quantity: item.quantity,
//       })),
//       shippingAddress: {
//         fullName: e.target.fullName.value,
//         address: e.target.address.value,
//         city: e.target.city.value,
//         postalCode: e.target.postalCode.value,
//         country: e.target.country.value,
//       },
//       paymentMethod: e.target.paymentMethod.value,
//       itemsPrice: totalPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice: grandTotal,
//     };

//     try {
//       const response = await fetch("http://localhost:5000/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderData),
//       });

//       if (response.ok) {
//         dispatch({ type: "CLEAR_CART" });
//         navigate("/home");
//       } else {
//         console.error("Failed to place order");
//       }
//     } catch (error) {
//       console.error("Error placing order:", error);
//     }
//   };


    return (
        <form onSubmit={ handlePlaceOrder}>
            <div className='flex flex-col md:flex-row'>
                <div className="border border-gray-400 p-5 m-5 md:w-3/5">
                    <h2 className="text-base/7 font-semibold text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm/6 text-gray-600">Use a permanent address where you can receive your Orders.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                First name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="first-name"
                                    name="first-name"
                                    type="text"
                                    autoComplete="given-name"
                                    required
                                    className="block w-full border border-gray-400 focus:border-none rounded-md bg-white px-3 py-1.5 text-base text-gray-900  placeholder:text-gray-400  focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm/6 font-medium text-gray-900">
                                Last name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="last-name"
                                    name="last-name"
                                    type="text"
                                    autoComplete="family-name" required
                                    className="block w-full border border-gray-400 focus:border-none rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email" required
                                    className="block w-full border border-gray-400 focus:border-none rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                Country
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                    id="country"
                                    name="country"
                                    autoComplete="country-name" required
                                    className="col-start-1 border border-gray-400 focus:border-none row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option>India</option>
                                    <option>United States</option>
                                    <option>Korea</option>
                                </select>

                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="street-address" className="block text-sm/6 font-medium text-gray-900">
                                Street address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="street-address"
                                    name="street-address"
                                    type="text"
                                    autoComplete="street-address" required
                                    className="block w-full rounded-md border border-gray-400 focus:border-none bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm/6 font-medium text-gray-900">
                                City
                            </label>
                            <div className="mt-2">
                                <input
                                    id="city"
                                    name="city"
                                    type="text"
                                    autoComplete="address-level2" required
                                    className="block w-full rounded-md border border-gray-400 focus:border-none bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="region" className="block text-sm/6 font-medium text-gray-900">
                                State / Province
                            </label>
                            <div className="mt-2">
                                <input
                                    id="region"
                                    name="region"
                                    type="text"
                                    autoComplete="address-level1" required
                                    className="block w-full rounded-md border border-gray-400 focus:border-none bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm/6 font-medium text-gray-900">
                                ZIP / Postal code
                            </label>
                            <div className="mt-2">
                                <input
                                    id="postal-code"
                                    name="postal-code"
                                    type="text"
                                    autoComplete="postal-code" required
                                    className="block w-full rounded-md border border-gray-400 focus:border-none bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>

                    </div>
                </div>
                <div>
                    <div className="text-end mt-4">
                        {cart.map((product) => (
                            <div className="flex justify-end m-3 text-end">
                                <h3>
                                    <a href={product.href}>{product.title}</a>
                                </h3>
                                <h1>-</h1>
                                <p className="ml-4 text-base font-medium text-gray-900">$ {product.price}</p>
                            </div>
                        ))}
                        <h1 className="text-base font-medium text-gray-900 m-3">TOTEL AMOUNT =$ {totel}</h1>

                    </div>
                    <div className='mt-10'>
                        <h1 className='text-2xl m-3'>Select payment method</h1>
                        <label><input type="radio" name='method' disabled /> <span className=' text-gray-300 m-2'>Online</span></label>
                        <label><input type="radio" name='method' required /> Cash on Delivary</label>
                        <p className='text-sm text-gray-300'>(required)</p>
                    </div>
                    <button type="submit" className='mt-6 flex  items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700'><CreditCard /> Place Order </button>

                </div>
            </div>
        </form>
    )
}

export default Order



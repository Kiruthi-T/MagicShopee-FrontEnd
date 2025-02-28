import React, { useContext, useState } from 'react'
import { CartContext } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import CreditCard from '@mui/icons-material/CreditCard'
import axios from 'axios';

const BACKEND_API = import.meta.env.VITE_BACKEND_API

const CheckOut = ({ userDetails }) => {
    const { state, dispatch } = useContext(CartContext)
    const { cart } = state;
    console.log(cart);
    const navigate = useNavigate();
    const totel = Math.round(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));

    const [address, setAddress] = useState({ Fname: "", Lname: "",mobileNumber:"", Email: "", Country: "", street: "", city: "", state: "", Zip: "" })

    console.log(address);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        const orderData = {
            user: userDetails._id,
            orderedItems: cart.map((product) => ({
                product: product._id,
                quantity: product.quantity
            })),
            shippingAddress: address,
            paymentMethod: "COD",
            totalPrice: totel
        }
        console.log(orderData);
        try {
            const response = await axios.post(`${BACKEND_API}/order`, orderData);
            console.log(response);
            
            if (response.status === 200) {
                dispatch({ type: "CLEAR_CART" });
                navigate('/All-Orders')
            } else {
                console.error("Failed to place order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    return (
        <form onSubmit={handlePlaceOrder}>
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
                                    value={address.Fname}
                                    onChange={(e) => { setAddress({ ...address, Fname: e.target.value }) }}
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
                                    value={address.Lnamename}
                                    onChange={(e) => { setAddress({ ...address, Lname: e.target.value }) }}
                                    autoComplete="family-name" required
                                    className="block w-full border border-gray-400 focus:border-none rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="sm:col-span-4">
                            <label htmlFor="first-name" className="block text-sm/6 font-medium text-gray-900">
                                Mobile Number
                            </label>
                            <div className="mt-2">
                                <input
                                    id="first-name"
                                    name="first-name"
                                    type="tel"
                                    autoComplete="given-name"
                                    required
                                    value={address.mobileNumber}
                                    onChange={(e) => { setAddress({ ...address, mobileNumber: e.target.value }) }}
                                    className="block w-full border border-gray-400 focus:border-none rounded-md bg-white px-3 py-1.5 text-base text-gray-900  placeholder:text-gray-400  focus:outline-indigo-600 sm:text-sm/6"
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
                                    value={address.Email}
                                    onChange={(e) => { setAddress({ ...address, Email: e.target.value }) }}
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
                                    value={address.Country}
                                    onChange={(e) => { setAddress({ ...address, Country: e.target.value }) }}
                                    autoComplete="country-name" required
                                    className="col-start-1 border border-gray-400 focus:border-none row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option value="" disabled>Select a country</option>
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
                                    value={address.street}
                                    onChange={(e) => { setAddress({ ...address, street: e.target.value }) }}
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
                                    value={address.city}
                                    onChange={(e) => { setAddress({ ...address, city: e.target.value }) }}
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
                                    value={address.state}
                                    onChange={(e) => { setAddress({ ...address, state: e.target.value }) }}
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
                                    value={address.Zip}
                                    onChange={(e) => { setAddress({ ...address, Zip: e.target.value }) }}
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
                                    <a href={product.href}>{product.title} - {product.quantity}</a>
                                </h3>
                                <h1>-</h1>
                                <p className="ml-4 text-base font-medium text-gray-900">$ {product.price * product.quantity}</p>
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

export default CheckOut



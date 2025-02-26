import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GradeIcon from '@mui/icons-material/Grade';
import Rating from '@mui/material/Rating';
import Products from '../components/Prodcts';
import { CartContext } from '../contexts/CartContext';
import { ProductContext } from '../contexts/ProductContext';
import CartDraw from '../components/CartDraw';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'


// import { StarIcon } from '@heroicons/react/20/solid'
// import { Radio, RadioGroup } from '@headlessui/react'


const BACKEND_API = import.meta.env.VITE_BACKEND_API;

const DetailedProduct = () => {
  const [Productdetails, SetDetails] = useState({})
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));



  const Allproducts = useContext(ProductContext)

  const { state, dispatch } = useContext(CartContext)
  const isInCart = state.cart.some((item) => item._id === Productdetails._id);


  const [open, setOpen] = useState(false)

  const navigate = useNavigate();


  const FilteredProducts = Allproducts.filter((item) => Productdetails.category == item.category && Productdetails._id != item._id)

  useEffect(() => {
    async function run() {
      const token = localStorage.getItem("token");
      console.log("geted", token);
      const details = await axios.get(`${BACKEND_API}/products/${id}`, { headers: { Authorization: `Bearer ${token}` } });

      SetDetails(details.data)

    }
    run();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  // console.log(Productdetails);

  const [index, setIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setIndex((prevIndex) => (prevIndex + 1) % Productdetails.images.length);
  };

  // Function to go to the previous slide
  const prevSlide = () => {
    setIndex((prevIndex) => (prevIndex - 1 + Productdetails.images.length) % Productdetails.images.length);
  };

  const ratings = Math.round(Productdetails.rating)
  // console.log(ratings);

  return (
    <div className="bg-white">
      {/* Product info */}
      <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto_auto_1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{Productdetails.title}</h1>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <h2 className="sr-only">Product information</h2>

          <div className="relative overflow-hidden rounded-lg shadow-lg">
            {/* Carousel Items */}
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {Productdetails.images?.map((img, i) => (
                <img key={i} src={img} alt={Productdetails.title} className="w-full" />
              ))}
            </div>

            {/* Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {Productdetails.images?.map((_, i) => (
                <button
                  key={i}
                  className={`w-3 h-3 rounded-full ${i === index ? "bg-blue-700" : "bg-gray-400"
                    }`}
                  onClick={() => setIndex(i)}
                ></button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              className="prev absolute top-1/2 left-3 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              onClick={prevSlide}
            >
              &lt;
            </button>
            <button
              className="next absolute top-1/2 right-3 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
              onClick={nextSlide}
            >
              &gt;
            </button>
          </div>

          <div className="  gap-3 mx-auto mt-6 w-3xl grid max-w-7xl grid-cols-3 gap-x-8 px-8">
            {Productdetails.images?.map((item) => (
              <img
                alt={Productdetails.title}
                src={item}
                className="aspect-square   rounded-lg   group-hover:opacity-75 xl:aspect-[7/8]"
              />
            ))}

          </div>
          <div className='flex justify-between mt-3'>

            <p className="text-3xl tracking-tight text-gray-900 m-3">$ {Productdetails.price}</p>
            <span className='rounded-3xl h-10 bg-green-500 p-1 mt-2 text-white'>{Productdetails.rating}<GradeIcon className='m-1' /> </span>

          </div>

          {!isInCart ? <div className="flex items-center space-x-4">
            <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-300 rounded">-</button>
            <span className="text-lg">{quantity}</span>
            <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-300 rounded">+</button>
          </div> : null}
          <div className='flex'>
            <button
              onClick={() => {
                dispatch({ type: "ADD_TO_CART", payload: { ...Productdetails, quantity }, })
                setOpen(true)
              }}
              type="submit"
              className="mt-8 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
            >

              {isInCart ? "Added" : "Add to bag"} <ShoppingCartIcon />
            </button>
            <p className='m-10'>or</p>
            <button onClick={() => navigate('/order')} className="mt-8 flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden">
              Check Out <ShoppingCartCheckoutIcon /></button>
          </div>
          {/* <Button variant="contained"  onClick={()=>navigate('/order')}  startIcon={<ShoppingCartCheckoutIcon/>}>checkout</Button> */}
          <CartDraw open={open} setOpen={setOpen} />
        </div>

        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
          {/* Description and details */}
          <div>
            <h3 className="sr-only">Description</h3>

            <div className="space-y-6">
              <p className="text-base text-gray-900">{Productdetails.description}</p>
              <h4 className='text-xl '>Category <u className='bg-amber-100'> {Productdetails.category}</u></h4>
            </div>
          </div>
          {/* Reviews */}

          <div className="mt-10">
            <div>
              <h3 className="text-2xl font-medium text-gray-900">Reviews</h3>
              <Rating name="half-rating-read" defaultValue={Productdetails.rating} precision={0.5} />
            </div>

            <div className="mt-4 flex gap-3">
              {Productdetails.reviews?.map((review) => (
                <div className='bg-red-100 p-2 rounded-md'>
                  <h3 className="text-gray-600">{review.comment}</h3>
                  <h6>BY {review.reviewerName}</h6>
                  <span className='rounded-3xl h-10 bg-green-500 p-1 mt-2 text-white'>{ratings}<GradeIcon className='m-1' /> </span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-10">
            <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

            <div className="mt-4">
              <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                <li><span className="text-gray-600">{Productdetails.warrantyInformation}</span></li>
                <li> <span className="text-gray-600">{Productdetails.shippingInformation}</span></li>
                <li><span className="text-gray-600">{Productdetails.returnPolicy}</span></li>

              </ul>
            </div>
            <div>
              <span className='rounded-3xl h-10 bg-cyan-300 p-1 mt-2 text-white'>{Productdetails.availabilityStatus}</span>
            </div>
          </div>

        </div>
      </div>
      <h1 className='text-gray-800 text-3xl ml-16 mt-4 '>Related Products</h1>
      <Products productDetails={FilteredProducts} />
    </div>

  )
}

export default DetailedProduct

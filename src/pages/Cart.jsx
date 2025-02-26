
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { state, dispatch } = useContext(CartContext);
  const { cart } = state;
  console.log(cart);

  const totel = Math.round(cart.reduce((acc, item) => acc + item.price * item.quantity, 0));

  const navigate=useNavigate();

  return (
    <div>
      <h2 className="text-gray-800 text-3xl text-center mt-4 ">Cart</h2>
      {cart.length === 0 ? <p className="text-gray-500 text-2xl text-center mt-4 ">Your cart is empty.</p> : null}
      {cart.length > 0 && (
        <button className="bg-red-500 p-2 m-2 rounded-lg flex justify-end" onClick={() => dispatch({ type: "CLEAR_CART" })}>Clear Cart</button>
      )}

      <div>
        <div className="mt-8">
          <div className="flow-root ">
            <ul role="list" className="flex flex-wrap justify-around">
              {cart.map((product) => (
                <div className="flex flex-wrap justify-around">
                  <li key={product.id} className="flex m-2 p-6 w-96 shadow-xl">
                    <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img alt={product.title} src={product.images[0]} className="size-full object-cover" />
                    </div>

                    <div className="ml-4 flex flex-col w-full">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3 className="w-28">
                            {product.title}
                          </h3>
                          <p className="ml-4">$ {product.price}</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">

                        <p className="text-gray-500">Qty </p>
                        <button className="bg-purple-500 w-5 rounded-full" onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: product._id })}>-</button>
                        <p>{product.quantity}</p>
                        <button className="bg-purple-500 w-5 rounded-full" onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: product._id })}>+</button>

                        <div className="flex">
                          <button 
                          onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: product._id })}
                          type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </div>
              ))}
            </ul>
          </div>
          {cart.length > 0 && (
            <div className="text-end mt-4">
              {cart.map((product) => (
                <div className="flex justify-end m-3">
                  <h3>
                    <a href={product.href}>{product.title}</a>
                  </h3>
                  <h1>-</h1>
                  <p className="ml-4 text-base font-medium text-gray-900">$ {product.price}</p>
                </div>
              ))}
              <h1 className="text-base font-medium text-gray-900 m-3">TOTEL AMOUNT =$ {totel}</h1>
              <button onClick={()=>navigate('/order')} className="mt-6 flex absolute right-3 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700">Check Out</button>

            </div>
          )}
        </div>


      </div>

      
    </div>
  );
};

export default Cart;


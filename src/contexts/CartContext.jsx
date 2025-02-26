import React, { createContext, useReducer } from 'react'

export const CartContext = createContext()

const initialState = {
    cart: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            const alredyExist = state.cart.find((item) => item._id == action.payload._id);
            if (alredyExist) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item._id === action.payload._id ? { ...item, quantity: item.quantity + 1 } : item
                    )
                }
            }
            else {
                return {
                    ...state,
                    cart: [...state.cart, { ...action.payload, quantity: action.payload.quantity || 1 }],
                }
            }
        case "REMOVE_FROM_CART":
            return {
                ...state,
                cart: state.cart.filter((item) => item._id !== action.payload),
            };

            case "INCREASE_QUANTITY":
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item._id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
                    )
                };
    
            case "DECREASE_QUANTITY":
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item._id === action.payload && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                };
    
            case "CLEAR_CART":
                return {
                    ...state,
                    cart: [],
                };
    
        default:
            return state;

    }
}

const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div>
            <CartContext.Provider value={{ state, dispatch }}>
                {children}
            </CartContext.Provider>
        </div>
    )
}

export default CartProvider

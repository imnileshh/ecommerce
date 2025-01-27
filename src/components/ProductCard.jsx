import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../cartStore/cartSlice'
import { toast } from 'react-toastify';

function ProductCard({ imageUrl, price, name, id }) {
    const dispatch = useDispatch()
    const cartItems = useSelector((state) => state.cart.items)
    const isInCart = cartItems.some((item) => item.id === id)
    const toastOptions = {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        // progress: 0,
        theme: 'dark',
        // transition: 'slide'
    }

    const addItem = () => {
        dispatch(addToCart({ imageUrl, id, name, price, quantity: 1 }));
        toast.success(`item ${id} added to cart`, toastOptions)
    }
    const removeItem = (id) => {
        dispatch(removeFromCart(id));
        toast.error(`item ${id} removed from cart`, toastOptions)
    }

    return (
        <div
            className='w-72 h-68 border-2 border-gray-600 bg-gray-300 rounded-lg mt-2 overflow-hidden '
        >
            <Link
                className='block h-[70%]'
                to={`/product/${id}`}
            >
                <div
                    className='w-full full bg-gray-300 p-3 flex items-center justify-center overflow-hidden '
                >
                    <img
                        className='w-48 rounded-md object-cover h-40 p-2'
                        src={imageUrl} alt="Image not found"
                        loading='lazy'
                    />
                </div>
            </Link >
            <div
                className='w-full h-[30%] bg-white flex flex-col justify-center p-4 '>
                <h3
                    className='text-gray-900  text-lg font-semibold capitalize truncate '>
                    {name}
                </h3>
                <p
                    className='text-gray-700 text-lg  font-semibold '
                >
                    {price}
                </p>
                <div
                    className='mt-2'
                >
                    {isInCart ?
                        (
                            <button
                                onClick={() => removeItem(id)}
                                className="bg-gray-800 text-white text-md text-center font-semibold p-2 rounded-lg hover:bg-gray-600 "
                            >
                                Remove from Cart
                            </button>
                        ) :
                        (
                            <button
                                onClick={() => addItem()}
                                className="bg-gray-800 text-white text-md text-center font-semibold p-2 rounded-lg hover:bg-gray-600 "
                            >
                                Add to Cart
                            </button>
                        )}
                </div>
            </div>
        </div >

    )
}

export default ProductCard
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart, decreaseQuantity, increaseQuantity } from '../cartStore/cartSlice'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const CartItemCard = ({ key, item }) => {
    const dispatch = useDispatch()
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
    const removeItem = () => {
        // console.log(`removing id ${id}`)
        dispatch(removeFromCart(item.id))
        toast.error(`Item ${item.id} has been removed`, toastOptions)
    }

    const incrQuantity = () => {
        dispatch(increaseQuantity({ id: item.id }))
    }
    const decrQuantity = () => {
        if (item.quantity > 1) {
            dispatch(decreaseQuantity({ id: item.id }))
        } else {
            toast.error('Cannot decrease quantity below 1.', toastOptions);
        }
    }
    return (
        <div
            key={key}
            className='w-[90%] mx-auto flex flex-wrap flex-col sm:flex-row items-center justify-evenly  border-2  mt-2 p-2'
        >
            <div className=' w-full sm:w-[20%] flex items-center justify-center'>
                <img className='h-20 w-20  ' src={item.imageUrl} alt="" />
            </div>
            <h3
                className=' w-full sm:w-[20%] text-center truncate mt-2 sm:mt-0'
            >
                {item.name}
            </h3>
            <p
                className='w-full sm:w-[20%] text-center mt-2 sm:mt-0'
            >
                ${(item.price * item.quantity).toFixed(2)}
            </p>
            <div
                className='w-full sm:w-[20%] flex items-center justify-center mt-2 sm:mt-0 '
            >
                <button
                    className='text-center font-semibold text-md border-2 border-r-0 w-8 h-8 border-gray-500 rounded-l-md '
                    onClick={() => decrQuantity()}
                >
                    <p
                        className='text-center font-semibold text-md  w-8 h-8 '
                    >
                        -</p>
                </button>
                <p
                    className='text-center font-semibold text-md border-2 w-8 h-8 border-r-0 border-gray-500 '
                >
                    {item.quantity}</p>
                <button
                    className='text-center font-semibold text-md border-2 w-8 h-8 border-gray-500 rounded-r-md'
                    onClick={() => incrQuantity()}
                >
                    <p
                        className='text-center font-semibold text-md  w-8 h-8 '
                    >
                        +
                    </p>
                </button>
            </div>
            <div
                className='w-[20%] flex items-center justify-center mt-2 sm:mt-0 '
            >
                <button
                    className='bg-red-600 text-white p-2 rounded-lg hover:bg-red-800'
                    onClick={() => removeItem()}>
                    Remove
                </button>
            </div>
        </div>
    )
}

export default CartItemCard;
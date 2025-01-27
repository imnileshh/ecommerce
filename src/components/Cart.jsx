import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart, decreaseQuantity, increaseQuantity } from '../cartStore/cartSlice'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import CartItemCard from '../components/CartItemCard'


function Cart() {
    const cartItems = useSelector(state => state.cart.items)
    const dispatch = useDispatch()

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])

    const clearCArt = () => {
        dispatch(clearCart())
        toast.error('All Items are removed', {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            // progress: 0,
            theme: 'dark',
            // transition: 'slide'
        })

    }

    let totalAmount = cartItems.reduce((total, item) => total + Number(item.price * item.quantity), 0)
    totalAmount = parseFloat(totalAmount.toFixed(2))

    return (
        <div className='w-[90%] mx-auto flex flex-col gap-4 flex-wrap'>
            {cartItems && cartItems.length > 0 ? (
                <>
                    <div className='w-full mx-auto flex flex-col gap-4 flex-wrap' >
                        {cartItems.map((item) => (
                            <CartItemCard key={item.id} item={item}
                            />
                        ))}
                    </div>
                    <button
                        className='w-[40%] mx-auto my-4 bg-red-600 text-white text-xl font-semibold p-2 rounded-lg hover:bg-red-800'
                        onClick={() => clearCArt()}
                    >
                        Clear Cart
                    </button>
                </>

            ) :
                (
                    <div

                        className='h-screen flex items-center justify-center flex-col'>
                        <p
                            className="text-center text-2xl font-semibold "
                        >
                            Your cart is empty!
                        </p>
                        <Link to='/shop'
                            className='my-2 sm:text-left text-center'>
                            <button className="bg-gray-900 text-white text-lg text-center font-semibold p-2 rounded-lg hover:bg-white hover:text-gray-900 hover:border-2 hover:border-black hover:text-lg hover:font-semibold">
                                Shop Now →
                            </button>
                        </Link>
                    </div>

                )}

            {cartItems.length > 0 && (
                <div
                    className=' w-[90%] sm:w-[60%]  mx-auto mt-4 flex flex-wrap items-center justify-between border-2 border-gray-600 p-2 '>
                    <div
                        className='flex flex-col'>
                        <p
                            className='text-md font-semibold text-gray-600'>
                            Total Amount:
                        </p>
                        <p
                            className='text-lg  font-semibold text-black'>
                            ${totalAmount}
                        </p>

                    </div>
                    <button
                        className='bg-gray-700 text-white font-semibold rounded-md text-lg p-2'>
                        Check Out
                    </button>
                </div>
            )}



        </div>
    )
}

export default Cart
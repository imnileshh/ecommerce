import React, { useEffect, useState } from 'react'
import NavItems from './NavItems'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from '../cartStore/cartSlice'
import { toast } from 'react-toastify'
import { OrbitProgress } from 'react-loading-indicators'


function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items)
    const isInCart = product ? cartItems.some((item) => item.id === product.id) : false;
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
        dispatch(addToCart({ id: product.id, name: product.title, imageUrl: product.image, price: product.price, quantity: 1 }));
        toast.success(`item ${id} added to cart`, toastOptions)
    }
    const removeItem = () => {
        dispatch(removeFromCart(product.id));
        toast.error(`item ${id} removed from cart`, toastOptions)
    }

    useEffect(() => {
        ; (async () => {
            try {
                setLoading(true)
                const response = await axios.get(`https://fakestoreapi.com/products/${id}`)
                setProduct(response.data)
                console.log(response.data);
                setLoading(false)

            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        })()
    }, [id])


    if (loading) return (
        <div className='w-[90%]  mx-auto flex flex-col items-center justify-center'>
            <OrbitProgress variant="disc" dense color="#595a59" size="large" text="" textColor="" />
            <h1 className='text-2xl font-bold text-gray-700'>Loading Details</h1>
        </div>
    )

    return (
        <div className='mb-20 flex flex-col gap-4'>
            <div className='flex m-5'>
                <NavItems to='/shop' label='Back To Shop' />
            </div>
            {product && (
                <div className=' w-[80%]  flex flex-col sm:flex-row items-center justify-evenly mx-auto border-2'>
                    <div className=' w-full sm:w-1/2   p-5 flex items-center justify-center'>
                        <img className=' w-72 h-72' src={product.image} alt={product.title} />
                    </div>
                    <div className='w-full sm:w-1/2 p-2 border flex flex-col justify-start'>
                        <p className='mt-1 text-xl capitalize font-bold text-gray-700'>{product.category}</p>
                        <h1 className=' mt-1 text-2xl font-bold'>{product.title}</h1>
                        <h3 className=' mt-1 text-lg font-semibold text-gray-600 text-justify'>{product.description}</h3>
                        <label className=' mt-1 text-lg font-semibold text-black ' htmlFor="size">Select Size</label>
                        <select className=' mt-1 text-lg font-semibold text-black border-2 border-blue-600 ' name="size" id="size">
                            <option className='text-md font-semibold text-gray-500 bg-blue-200' value="small">Small</option>
                            <option className='text-md font-semibold text-gray-500 bg-blue-200' value="medium">medium</option>
                            <option className='text-md font-semibold text-gray-500 bg-blue-200' value="large">large</option>
                            <option className='text-md font-semibold text-gray-500 bg-blue-200' value="xl">extra large</option>
                        </select>
                        <p className=' mt-1 text-xl font-bold '>{`Price: $${product.price}`}</p>
                        <div>
                            {isInCart ?
                                (
                                    <button
                                        onClick={() => removeItem()}
                                        className='p-3 mt-1 w-full bg-purple-600 rounded-lg text-black font-bold text-lg hover:bg-purple-800 '
                                    >
                                        Remove from Cart
                                    </button>
                                ) :
                                (
                                    <button
                                        onClick={() => addItem()}
                                        className='p-3 mt-1 w-full bg-purple-600 rounded-lg text-black font-bold text-lg hover:bg-purple-800 '
                                    >
                                        Add to Cart
                                    </button>
                                )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default ProductDetails
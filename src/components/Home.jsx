import React from 'react'
import { Link } from 'react-router-dom'
import ProductContainer from './ProductContainer'

function Home() {
    return (
        <div className='w-[90%] h-auto flex flex-col  mx-auto '>
            <section className='w-full p-2  my-5 sm:pd-8 rounded-md bg-gray-300  flex flex-col-reverse sm:flex-row '>
                <div className='sm:w-[50%] p-4 sm:p-16 flex flex-col justify-center  sm:items-left '>
                    <h1 className='text-4xl my-2 sm:w-[50%] font-semibold sm:text-left text-center '>
                        Buy Everything With Clearity
                    </h1>
                    <p className='text-xl my-2 text-justify'>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo cum ullam ratione quam quas sit soluta similique illum tempora perspiciatis!
                    </p>
                    <Link to='/shop'
                        className='my-2 sm:text-left text-center'>
                        <button className="bg-gray-900 text-white text-lg text-center font-semibold p-2 rounded-lg hover:bg-white hover:text-gray-900 hover:border-2 hover:border-black hover:text-lg hover:font-semibold">
                            Shop Now →
                        </button>
                    </Link>
                </div>
                <div className='sm:w-[50%] w-100 items-center rounded-xl overflow-hidden '>
                    <img className='object-fill w-full h-full' src="https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" />
                </div>
            </section>

            <div className=''>
                <ProductContainer />
            </div>
        </div>
    )
}

export default Home
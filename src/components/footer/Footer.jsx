import React from 'react'
import { Link } from 'react-router-dom'
import { FaRegCopyright } from "react-icons/fa";

function Footer() {
    return (
        <div>
            <footer className='w-full bg-gray-400 flex flex-col md:flex-row items-center justify-between py-3 px-5'>
                <div className='flex gap-1 items-center justify-center'>
                    <p className='font-semibold text-md text-gray-600'>Developed By
                    </p>
                    <a className='text-lg underline font-bold text-gray-800' href="http://github.com/imnileshh">Click Here</a>
                </div>
                <div className='flex flex-col items-center justify-center gap-2 p-2'>
                    <img className=' border-2 h-28 w-28 rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2d7bF1q2WBQnHUhqaR2OuxjFiv_EIWBwqow&s" alt="" />
                    <div className='flex items-center justify-center'>
                        <FaRegCopyright />
                        <p>2025</p>
                    </div>
                </div>
                <div className='flex gap-1 items-center justify-center'>
                    <p className='font-semibold text-md text-gray-600'>For this Project
                    </p>
                    <a className='text-lg underline font-bold text-gray-800' href="https://github.com/imnileshh/ecommerce">Click Here</a>
                </div>
            </footer >
        </div >
    )
}

export default Footer
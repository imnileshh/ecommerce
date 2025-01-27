import React, { useState, useEffect } from 'react'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom'
import { BsCartCheck } from "react-icons/bs";
import { FiAlignJustify } from "react-icons/fi";
import NavItems from '../NavItems';
import Filter from '../Filter';
import { useDispatch, useSelector } from 'react-redux';
import UserProfile from '../UserProfile';
import Logout from '../Logout';
import { useForm } from 'react-hook-form';
import { IoIosSearch } from "react-icons/io";




function Header({ setFilters, setSortType, search, setSearch }) {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [userName, setUserName] = useState('Login First')
    const [userPic, setUserPic] = useState('')
    const [loading, setLoading] = useState('')
    const { register, handleSubmit } = useForm()

    const status = useSelector((state) => state.auth)
    useEffect(() => {
        if (status.userData) {
            setUserName(status.userData.name);
            setUserPic('https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg')
        } else {
            setUserName('Login First');
            setUserPic('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIOy5S3dTARqj4xzKxbXj5xz2sTIl_7O7IVw&s')
        }
    }, [status.userData]);

    const showFilter = location.pathname !== '/' && location !== '/home' && location.pathname !== '/cart' && location.pathname !== '/userdetails' && location.pathname !== '/login' && location.pathname !== '/signup'

    const toggleSignup = () => {
        navigate('/signup')
        setIsMenuOpen(false)
    }

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev)
    }

    const searchSubmit = (data) => {
        setSearch(data.searchInput)
    }

    useEffect(() => {
        setSearch('')
    }, [location.pathname, setSearch])

    return (

        <div>
            {/* Side Bar */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex">
                    {/* Sidebar Container */}
                    <div className="w-64 bg-gray-200 h-full shadow-lg flex flex-col p-4">
                        {/* Sidebar Header */}
                        <div className="flex flex-col items-center border-b-2 pb-2 border-b-black">
                            <img
                                className="w-20 h-20 rounded-full mb-2"
                                src={userPic}
                                alt="Profile Pic"
                            />
                            <h1 className="text-lg font-semibold text-gray-800">{userName}</h1>
                            {status.isAuthenticated && (
                                <Link
                                    className='my-2'
                                    to='/userdetails'>
                                    <button
                                        onClick={toggleMenu}
                                        className='bg-gray-900 text-sm  text-white rounded p-2'>
                                        View Account
                                    </button>
                                </Link>
                            )}
                        </div>

                        {/* Navigation Links */}
                        <div className="mt-6     ">
                            <ul className="flex flex-col gap-4">
                                <NavItems to="/" label="Home" onClick={toggleMenu} />
                                <NavItems to="/shop" label="Shop" onClick={toggleMenu} />
                                <NavItems to="/featured" label="Featured" onClick={toggleMenu} />
                                <NavItems to="/recommended" label="Recommended" onClick={toggleMenu} />
                            </ul>
                        </div>


                        {/* Action Buttons */}
                        <div className="mt-2 border-t pt-4">
                            {status.isAuthenticated ? (
                                <Logout setLoading={setLoading} setIsMenuOpen={setIsMenuOpen} />
                            ) : (
                                <button
                                    className="w-full bg-gray-800 text-white text-lg font-semibold py-2 rounded-md hover:bg-gray-900 transition duration-300"
                                    onClick={toggleSignup}
                                >
                                    Sign Up
                                </button>
                            )}
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={toggleMenu}
                            className="relative text-xl font-bold top-2 right-8 text-gray-700 hover:text-gray-800"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Clickable Overlay to Close Sidebar */}
                    <div
                        className="flex-1"
                        onClick={toggleMenu}
                    ></div>
                </div>
            )}
            <nav className='w-full fixed shadow-md   bg-zinc-300 flex justify-between
            items-center p-3'>
                <Link to='/'>
                    <div className='flex items-center gap-2'>
                        <img className=' h-10' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2d7bF1q2WBQnHUhqaR2OuxjFiv_EIWBwqow&s" alt="Logo" />
                        <p className='text-xl font-bold text-gray-900'>Logo</p>
                    </div>
                </Link>
                <div className='hidden md:flex'>
                    <ul className='flex flex-row gap-2 md:gap-0'>
                        <NavItems to='/' label='Home' />
                        <NavItems to='/shop' label='Shop' />
                        <NavItems to='/featured' label='Featured' />
                        <NavItems to='/recommended' label='Recommended' />
                    </ul>
                </div>

                <div className='flex gap-1 items-center  '>
                    <div className=' flex '>
                        {showFilter && (
                            <Filter setFilters={setFilters} setSortType={setSortType} />
                        )}
                    </div>
                    <div className="hidden md:block">
                        <form
                            onSubmit={handleSubmit(searchSubmit)}
                            className="flex items-center justify-center bg-white rounded-md shadow-md border border-gray-300  h-10 p-2"
                        >
                            <input
                                type="text"
                                placeholder="Search by category "
                                className="flex-1 px-4 py-2 text-sm text-gray-700 bg-transparent outline-none placeholder-gray-400"
                                {...register("searchInput")}
                            />
                            <button
                                type="submit"
                                className="text-gray-500 hover:text-gray-700 transition-colors"
                            >
                                <IoIosSearch className="w-6 h-6" />
                            </button>
                        </form>
                    </div>

                </div>


                <div className=' flex flex-row items-center justify-between gap-3 '>
                    <div>
                        <Link to='/cart'>
                            <BsCartCheck className='w-8 h-8' />
                        </Link>
                    </div>
                    <UserProfile
                        userPic={userPic} userName={userName} toggleMenu={toggleMenu} />
                    <FiAlignJustify
                        className='md:hidden w-8 h-8 '
                        onClick={toggleMenu}
                    />
                </div>

            </nav >
        </div >
    )
}

export default Header
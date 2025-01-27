import React, { useState } from 'react'
import { logout as authLogout } from '../cartStore/authSlice'
import { useNavigate } from 'react-router-dom'
import { clearCart } from '../cartStore/cartSlice'
import { useDispatch } from 'react-redux'
import authservice from '../appwrite/auth'
import { toast } from 'react-toastify'
import { OrbitProgress } from 'react-loading-indicators'

function Logout({ setIsMenuOpen }) {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const toggleLogout = async () => {
        setLoading(true)
        try {
            await authservice.logout();
            dispatch(authLogout());
            dispatch(clearCart())
            toast.error(`You have logged out`, {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                // progress: 0,
                theme: 'dark',
                // transition: 'slide'
            })
            setIsMenuOpen(false)
            navigate('/home')
        } catch (error) {
            console.log(error);
            toast.error(`Failed to logged out`, {
                position: 'top-center',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                // progress: 0,
                theme: 'dark',
                // transition: 'slide'
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <button
                className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
                onClick={toggleLogout}
                disabled={loading}
            >
                {loading ? 'logging Out' : 'Log Out'}
            </button>
            {loading && (<>
                <div className='fixed inset-0 bg-black flex items-center justify-center opacity-50 z-20'>
                    <div className='flex flex-col items-center justify-center'>
                        <OrbitProgress variant="disc" dense color="#595a59" size="large" text="" textColor="" />
                        <h1 className='text-2xl font-bold text-gray-700'>Logging Out...</h1>
                    </div>
                </div>
            </>)}
        </div>
    )
}

export default Logout
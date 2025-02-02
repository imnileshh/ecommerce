import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import authservice from '../appwrite/auth';
import { login } from '../cartStore/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';


function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState('')

    const toastOptions = {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        // progress: 0,
        theme: 'dark',
        // transition: 'slide'
    }

    const signUp = async (data) => {
        setLoading(true)
        try {
            const userData = await authservice.createAccount(data)
            if (userData) {
                const currentUser = await authservice.getCurrentUser();
                if (currentUser) {
                    dispatch(login(currentUser));
                    toast.success(`Signed In as ${currentUser.name}`, toastOptions)
                    navigate('/')
                    setIsError('')
                }
            }
        } catch (error) {
            if (error instanceof AppwriteException) {
                alert(`An error occured  : ${error.message}`)
                console.log("Message", error.message);
                console.log("cause", error.cause);
            }
            else {
                console.log("Error", error);
            }
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-[90%] mx-auto bg-gray-200 flex items-center justify-center p-10 my-10" >
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                    Sign Up
                </h2>
                <form
                    onSubmit={handleSubmit(signUp)}
                    className="flex flex-col space-y-4"
                >
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-medium mb-1"
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter Your Name"
                            {...register("name", { required: true })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-medium mb-1"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter Your Email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label
                            className="block text-gray-700 text-sm font-medium mb-1"
                            htmlFor="password"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter Your Password"
                            {...register("password", { required: true })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full bg-gray-800 text-white py-2 rounded-lg font-medium hover:bg-gray-900 transition duration-200 
                        ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? `Signing in...` : `Sign In`}
                    </button>
                </form>
                <p className="text-sm text-gray-600 text-center mt-4">
                    Already have an account?{" "}
                    <Link
                        to='/login'
                        className="text-indigo-600 hover:underline inline"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Signup
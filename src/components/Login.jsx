import React, { useState } from 'react'
import authservice from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { login } from '../cartStore/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Login() {
    const { register, handleSubmit } = useForm()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false)
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

    const signIn = async (data) => {
        try {
            setLoading(true)
            const session = await authservice.login(data)
            if (session) {
                const currentUser = await authservice.getCurrentUser()
                if (currentUser) {
                    dispatch(login(currentUser))
                    toast.success(`Logged In as ${currentUser.name}`, toastOptions)
                    navigate('/')
                }
            }
        } catch (error) {
            if (error.code === 401) {
                toast.error('Invalid email or password. Please try again.', toastOptions);
            } else {
                toast.error('An error occurred during login. Please try again.', toastOptions);
            }
            console.error('Login error:', error);

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center w-[90%] my-10 p-10 mx-auto bg-gray-200">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>
                <form onSubmit={handleSubmit(signIn)} className="space-y-6">
                    {/* Email Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter Your Email"
                            {...register("email", {
                                required: "Email is required",
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                },
                            })}
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                        />
                    </div>
                    {/* Password Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter Your Password"
                            {...register("password", { required: "Password is required" })}
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:outline-none"
                        />
                    </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`w-full px-4 py-2 font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500  ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Log In'}
                    </button>
                </form>
                {/* Footer */}
                <p className="mt-4 text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <a href="/signup" className="text-gray-800 font-semibold hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>

    )
}

export default Login
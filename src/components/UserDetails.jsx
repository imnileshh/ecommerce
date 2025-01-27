import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


function UserDetails() {
    const [name, setName] = useState('')
    const [mail, setMail] = useState('')
    const [date, setDate] = useState('')
    const data = useSelector((state) => state.auth)
    useEffect(() => {
        if (data.isAuthenticated) {
            setName(data.userData.name)
            setMail(data.userData.email)
            setDate(data.userData.registration.split("T")[0])
        }
    }, [data])
    return (
        <div className="w-[90%] mx-auto bg-gray-100 min-h-screen flex flex-col items-center">
            <header className="w-full border-b border-gray-500 bg-gray-100 p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="flex flex-col sm:flex-row items-center gap-2  mr-4">
                        <img
                            className='w-20 h-20 rounded-full'
                            src="https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg" alt="" />
                        <h1 className="text-gray-800 text-lg font-semibold ">{name}</h1>
                    </div>

                </div>
                <button className="bg-black text-white p-2 rounded">Edit Account</button>
            </header>
            <nav className="w-full bg-white border-b border-gray-500 flex items-center justify-center">
                <a href="#" className="p-4 text-gray-500  hover:text-gray-800 border-b-2 border-transparent hover:border-gray-800">
                    Account
                </a>
                <a href="#" className="p-4 text-gray-500 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-800">
                    My Wish List
                </a>
                <a href="#" className="p-4 text-gray-500 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-800">
                    My Orders
                </a>
            </nav>
            <div className="w-full max-w-md mt-8">
                <div className="bg-white shadow-md rounded-md p-6">
                    <h2 className="text-gray-800 font-medium mb-4">Account</h2>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                value={mail}
                                readOnly
                            />
                        </div>
                        <div>
                            <label htmlFor="address" className="block text-gray-700 font-medium mb-1">
                                Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                value="Address not set"
                                readOnly
                            />
                        </div>
                        <div>
                            <label htmlFor="mobile" className="block text-gray-700 font-medium mb-1">
                                Mobile
                            </label>
                            <input
                                type="tel"
                                id="mobile"
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                value="Not Registered"
                                readOnly
                            />
                        </div>
                        <div>
                            <label htmlFor="joined" className="block text-gray-700 font-medium mb-1">
                                Date Joined
                            </label>
                            <input
                                type="text"
                                id="joined"
                                className="border border-gray-300 rounded-md px-3 py-2 w-full"
                                value={date}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserDetails
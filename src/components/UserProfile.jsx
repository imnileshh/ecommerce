import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function UserProfile({ toggleMenu, userPic, userName }) {
    const [pic, setPic] = useState('')
    const data = useSelector((state) => state.auth)

    // useEffect(() => {
    //     if (data.isAuthenticated) {
    //         setPic('https://upload.wikimedia.org/wikipedia/en/5/5f/Original_Doge_meme.jpg')
    //     } else {
    //         setPic('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIOy5S3dTARqj4xzKxbXj5xz2sTIl_7O7IVw&s')
    //     }
    // }, [data])

    return (
        <div
            className='hidden md:flex  flex-col'
            onClick={toggleMenu}
        >
            {data.isAuthenticated ? (
                <>
                    <img
                        className='w-10 h-10 rounded-full'
                        src={userPic} alt={userName} />
                </>
            ) : (
                <>
                    <img
                        className='w-10 h-10 rounded-full'
                        src={userPic} alt={userName} />

                </>
            )}
        </div>
    )
}

export default UserProfile
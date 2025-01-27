import React, { useState } from 'react'
import { Header, Home } from './components'
import { Footer } from './components'
import { Outlet } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from './cartStore/authSlice';
import { useSelector, useDispatch } from 'react-redux';


function App() {
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
  });
  const [sortType, setSortType] = useState('');

  const [search, setSearch] = useState('')

  return (
    <div className='flex flex-col mih-h-screen'>
      <Header setFilters={setFilters} setSortType={setSortType} setSearch={setSearch} search={search} />
      <div className='mt-20'>
        <Outlet context={{ setFilters, filters, sortType, setSortType, search }} />
        <ToastContainer />
      </div>
      <Footer />
    </div>
  )
}

export default App

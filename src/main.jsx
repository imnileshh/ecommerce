import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, RouterProvider, Router, createRoutesFromElements, Route, Routes } from 'react-router-dom'
import Home from './components/Home.jsx'
import Shop from './components/Shop.jsx'
import Featured from './components/Featured.jsx'
import Recommended from './components/Recommended.jsx'
import Cart from './components/Cart.jsx'
import ProductDetails from './components/ProductDetails.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { persistor, store } from './cartStore/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import UserDetails from './components/UserDetails.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='' element={<Home />} />
      <Route path='home' element={<Home />} />
      <Route path='shop' element={<Shop />} />
      <Route path='featured' element={<Featured />} />
      <Route path='recommended' element={<Recommended />} />
      <Route path='cart' element={<Cart />} />
      <Route path='product/:id' element={<ProductDetails />} />
      <Route path='signup' element={<Signup />} />
      <Route path='login' element={<Login />} />
      <Route path='userdetails' element={<UserDetails />} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>

    </Provider>

  </StrictMode>,
)

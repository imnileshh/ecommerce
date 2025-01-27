import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard';
import { OrbitProgress } from 'react-loading-indicators';
import axios from 'axios'
import { useOutletContext } from 'react-router-dom';

function ProductContainer() {
    const { filters, sortType, search } = useOutletContext()
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        ; (async () => {
            try {
                setLoading(true)
                const response = await axios.get('https://fakestoreapi.com/products')
                setProducts(response.data)
                setFilteredProducts(response.data)
                setLoading(false)
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false)
            }
        })()
    }, [])

    useEffect(() => {
        let newProducts = products

        newProducts = newProducts.filter((product) => filters.category === 'all' || product.category === filters.category)

        newProducts = newProducts.filter((product) => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);

        if (search) {
            const searchQuery = search.toLowerCase().trim();
            newProducts = newProducts.filter((product) => {
                const category = product.category.toLowerCase().replace(/[^a-z0-9\s]/g, '');
                const regex = new RegExp(`\\b${searchQuery}\\b`, 'i'); // Match whole words
                return regex.test(category);
            }); 
        }
        if (sortType === 'none') {
            newProducts = newProducts;
        } else if (sortType === 'hightolow') {
            newProducts = newProducts.sort((a, b) => b.price - a.price);
        } else if (sortType === 'lowtohigh') {
            newProducts = newProducts.sort((a, b) => a.price - b.price);
        } else if (sortType === 'AtoZ') {
            newProducts = newProducts.sort((a, b) => {
                const sanitizedA = a.title.toLowerCase().replace(/[^a-z0-9]/g, '');
                const sanitizedB = b.title.toLowerCase().replace(/[^a-z0-9]/g, '');
                return sanitizedA.localeCompare(sanitizedB);
            });
        } else if (sortType === 'ZtoA') {
            newProducts = newProducts.sort((a, b) => {
                const sanitizedA = a.title.toLowerCase().replace(/[^a-z0-9]/g, '');
                const sanitizedB = b.title.toLowerCase().replace(/[^a-z0-9]/g, '');
                return sanitizedB.localeCompare(sanitizedA);
            });
        }
        setFilteredProducts(newProducts)
    }, [filters, sortType, search])



    return (
        <div className='flex flex-col w-[90%] mx-auto'>
            {loading ? (
                <div className='w-[90%] my-20  mx-auto flex flex-col items-center justify-center'>
                    <OrbitProgress variant="disc" dense color="#595a59" size="large" text="" textColor="" />
                    <h1 className='text-2xl font-bold text-gray-700'>Loading Products...</h1>
                </div>
            ) : (
                <>
                    {filteredProducts.length > 0 && (
                        <div className='flex flex-col items-center justify-center my-3'>
                            <h1 className='text-3xl font-semiold'>Our Products</h1>
                            <div className='w-48 h-1 border-b-2 border-b-gray-800 '></div>
                        </div>
                    )}

                    <div className='bg-gray-400 p-4 my-5'>
                        <div className='flex flex-col flex-wrap gap-4 my-6 sm:flex-row items-center justify-evenly'>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <div key={product.id}>
                                        <ProductCard
                                            imageUrl={product.image}
                                            price={product.price}
                                            name={product.title}
                                            id={product.id}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <p className=' text-2xl font-semibold text-gray-900'>
                                        Products Not Found
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}



        </div >
    )
}

export default ProductContainer
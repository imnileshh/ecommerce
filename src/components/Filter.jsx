import React, { useState } from 'react';
import { CiFilter } from 'react-icons/ci';
import Select from 'react-select';

function Filter({ setFilters, setSortType }) {
    const [showFilter, setShowFilter] = useState(false);
    const [rangeValue, setRangeValue] = useState(1000);
    const [tempCategory, setTempCategory] = useState('all')
    const [tempSort, setTempSort] = useState('')


    const categoryOptions = [
        { value: 'all', label: 'All' },
        { value: "men's clothing", label: 'Mens Clothing' },
        { value: "women's clothing", label: 'Womens Clothing' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'jewelery', label: 'Jewelry' },
    ];

    const sortOptions = [
        { value: '', label: 'None' },
        { value: 'hightolow', label: 'Price: High - Low' },
        { value: 'lowtohigh', label: 'Price: Low - High' },
        { value: 'AtoZ', label: 'Name: A - Z' },
        { value: 'ZtoA', label: 'Name: Z - A' },
    ];

    const toggleShowFilter = () => {
        setShowFilter(!showFilter);
    };

    const applyFilters = () => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            category: tempCategory,
            priceRange: [0, rangeValue],
        }));
        setSortType(tempSort)
        setShowFilter(false);
        // setFilterStatus(true)
    };

    const resetFilters = () => {
        setTempCategory('all')
        setTempSort('')
        setRangeValue(1000)
        setFilters({
            category: 'all',
            priceRange: [0, 1000],
        });
        setSortType('');
        setShowFilter(false);
        // setFilterStatus(true)
    };

    return (
        <div className=" flex flex-row h-10 ">
            <button
                onClick={toggleShowFilter}
                className="bg-gray-500 text-white font-semibold p-2 rounded-md"
            >
                Filter
                <CiFilter className="inline m-1" />
            </button>
            {showFilter && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                    <div className="bg-white w-96 relative p-10 border-2 z-10">
                        <div className="flex items-center">
                            <h3 className="w-[50%] text-md font-semibold text-gray-700">
                                Category:
                            </h3>
                            <h3 className="w-[50%] text-md font-semibold text-gray-700">
                                Sort by:
                            </h3>
                        </div>
                        <div className="flex">
                            <Select
                                options={categoryOptions}
                                className="w-[50%]"
                                value={categoryOptions.find((option) => option.value === tempCategory)}
                                onChange={(e) => setTempCategory(e.value)}
                            />
                            <Select
                                options={sortOptions}
                                className="w-[50%]"
                                value={sortOptions.find((option) => option.value === tempSort)}
                                onChange={(e) => setTempSort(e.value)}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="priceRange"
                                className="text-md my-2 font-semibold text-gray-700"
                            >
                                Price Range
                            </label>
                            <input
                                className="my-2 accent-gray-500"
                                type="range"
                                id="priceRange"
                                min="0"
                                max="1000"
                                value={rangeValue}
                                onChange={(e) => setRangeValue(e.target.value)}
                            />
                            <div className="flex items-center justify-end my-1">
                                <p className="w-[50%] text-left">0</p>
                                <p className="w-[50%] text-right">Up to: ${rangeValue}</p>
                            </div>
                        </div>
                        <div className="flex">
                            <button
                                onClick={applyFilters}
                                className="w-[50%] bg-black text-white font-semibold text-md p-2 my-2 hover:bg-gray-800 transition-colors"
                            >
                                Apply Filters
                            </button>
                            <button
                                onClick={resetFilters}
                                className="w-[50%] bg-white border-2 border-black text-black font-semibold text-md p-2 my-2 hover:bg-gray-200 transition-colors"
                            >
                                Reset Filters
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Filter;

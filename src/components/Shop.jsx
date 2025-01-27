import React, { useState } from 'react';
import ProductContainer from './ProductContainer';
import { useOutletContext } from 'react-router-dom';
import Filter from './Filter';

function Shop() {
    return (
        <div>
            <ProductContainer  />
        </div>
    );
}

export default Shop;

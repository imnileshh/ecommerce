import { createSlice } from "@reduxjs/toolkit";
import { FaJava } from "react-icons/fa";

const initialState = {
    items: JSON.parse(localStorage.getItem('cart')) || [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(item => item.id === action.payload.id)
            if (existingItem) {
                existingItem.quantity += action.payload.quantity;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload)
            localStorage.setItem('cart', JSON.stringify(state.items))
        },

        clearCart: (state, action) => {
            state.items = [];
            localStorage.setItem('cart', JSON.stringify(state.items))
        },

        increaseQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity += 1;
            }
            localStorage.setItem('cart', JSON.stringify(state.items))
        },
        decreaseQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.items.find(item => item.id === id);
            if (item) {
                item.quantity -= 1;
            }
            localStorage.setItem('cart', JSON.stringify(state.items))
        }
    }
})

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;

export default cartSlice.reducer;
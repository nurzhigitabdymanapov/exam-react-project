import { createSlice } from '@reduxjs/toolkit'
import { getProductsTunk } from './product.thunk'

const initialState = {
    products: [],
    isLoading: false,
    error: '',
    count: 0,
    totalPrice: 0,
}

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        increment: (state, action) => {
            state.products.map((item) => {
                if (item.id === action.payload) {
                    item.quantity++
                    item.total = item.total + item.price
                }
                return item
            })
        },
        decrement: (state, action) => {
            state.products.map((item) => {
                if (item.id === action.payload) {
                    item.quantity--
                    item.total = item.total - item.price
                }
                return item
            })
        },
        incrementByPrice: (state, action) => {
            state.totalPrice += action.payload
        },
        decrementByPrice: (state, action) => {
            state.totalPrice -= action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getProductsTunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.error = ''
            state.products = action.payload.map((item) => ({
                ...item,
                quantity: 0,
                total: 0,
            }))
        })
        builder.addCase(getProductsTunk.pending, (state) => {
            state.isLoading = true
            state.error = ''
        })
        builder.addCase(getProductsTunk.rejected, (state) => {
            state.isLoading = false
            state.error = 'Something went wrong!'
        })
    },
})

export const productActions = productSlice.actions

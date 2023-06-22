import { configureStore } from '@reduxjs/toolkit'
import { productSlice } from './product.Slice'

export const store = configureStore({
    reducer: {
        [productSlice.name]: productSlice.reducer,
    },
})

export const RootState = store.getState
export const AppDispatch = store.dispatch

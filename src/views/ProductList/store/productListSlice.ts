import { createSlice } from "@reduxjs/toolkit"

type Query = {
    sort: 'asc' | 'desc' | ''
    search: ''
}


export type ProductListState = {
    loading: boolean
    view: 'grid' | 'list'
    query: Query
}

export const SLICE_NAME = 'productList'


const initialState: ProductListState = {
    loading: false,
    view: 'grid',
    query: {
        sort: 'asc',
        search: '',
    }
} 

const productListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers:{
        toggleView: (state, action) => {
            state.view = action.payload
        },
    }
    })

export const {toggleView} = productListSlice.actions

export default productListSlice.reducer
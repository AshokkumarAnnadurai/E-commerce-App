import { TransformAPI } from "@/utils/helpers/helpers"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const SLICE_NAME =  "HomeState"

export type review = {
    name: string,
    title:string,
    content : string ,
    rating : number
}

export type products = {
    _id : string ,
    popular?: boolean,
    brand?:string,
    Language?:string,
    Genre?:string,
    For?:string,
    Type?:string,
    Processor?:string,
    HasSSD?:string,
    ram?:string,
    title:string,
    category:string,
    price:number,
    imgs:string[],
    specs:string[],
    inStock:number,
    eta:number,
    id:string,
    rating:number,
    reviews:review[],
    quantity:number
}

export type HomeListState = {
    loading : boolean 
    categories : string[]
    products : products[]
    selectedProduct: products
    showReviews: boolean
    cart:products[],
    Common_error:string
}
const initialState: HomeListState = {
    loading : false ,
    categories : [],
    products :[],
    selectedProduct:{},
    showReviews:false,
    cart:[],
    Common_error:''
}

export const getProducts = createAsyncThunk(
    SLICE_NAME + '/getProducts',
    async () =>{
        const response = await TransformAPI('GET' , '/products')
        return response
    }
)

export const getcategories = createAsyncThunk(
    SLICE_NAME + '/getcategories',
    async () =>{
        const response = await TransformAPI('GET' , '/categories')
        return response
    }
)

export const getproductById = createAsyncThunk(
    SLICE_NAME + '/getproductById',
    async (id:number)=> {
        const response = await TransformAPI('GET', `/products/${id}`)
        return response
    }
)

const homeListSlice = createSlice({
    name : `${SLICE_NAME}/state`,
    initialState,
    reducers:{
        toggleShowReviews : (state) => {
            
            state.showReviews = !state.showReviews
        },
        addToCart: (state, action) => {
            const product = action.payload;
            // Ensure that product is not already in the cart
            const existingProduct = state.cart.find(item => item._id === product._id);
            if (!existingProduct) {
                state.cart.push(product);
            }
        },
          clearCommon_error: (state) => {
            state.Common_error = ''
        },
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getProducts.pending , (state)=>{
            state.loading = true
        })
        .addCase(getProducts.fulfilled , (state , action) => {
            state.loading = false
            state.products = action.payload
        })
        .addCase(getProducts.rejected , (state , action)=>{
            state.Common_error = action.error.message || 'Something Went Wrong! Please try again later'
            state.loading = false
        })
        .addCase(getcategories.pending , (state)=>{
            state.loading = true
        })
        .addCase(getcategories.fulfilled , (state , action) => {
            state.loading = false
            state.categories = action.payload
        })
        .addCase(getcategories.rejected , (state , action)=>{
            state.Common_error = action.error.message || 'Something Went Wrong! Please try again later'
            state.loading = false
        })
        .addCase(getproductById.pending , (state)=>{
            state.loading = true
        })
        .addCase(getproductById.fulfilled , (state , action) => {
            state.loading = false
            state.selectedProduct = action.payload
        })
        .addCase(getproductById.rejected , (state , action)=>{
            state.Common_error = action.error.message || 'Something Went Wrong! Please try again later'
            state.loading = false
        })
    }
})

export const {toggleShowReviews , addToCart , clearCommon_error} = homeListSlice.actions

export default homeListSlice.reducer
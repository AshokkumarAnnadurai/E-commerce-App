import { Container } from '@/components/shared'
import { injectReducer } from '@/store'
import React from 'react'
import reducer from './store'
import ActionBar from './components/ActionBar'
import ProductListContent from './components/ProductListContent'

injectReducer('productList', reducer)

const ProductList = () => {
  return (
   <Container className='h-full'>
        <ActionBar />
        <ProductListContent/>
   </Container>
  )
}

export default ProductList
import { Container } from '@/components/shared'
import { injectReducer } from '@/store'
import React, { useEffect, useState } from 'react'
import reducer from './store'
import ActionBar from './components/ActionBar'
import ProductListContent from './components/ProductListContent'
import Header from '../Home/components/Header'
import { useParams } from 'react-router-dom'

injectReducer('productList', reducer)

const baseUrl = import.meta.env.VITE_BASE_URL

const ProductList = () => {

  const {id} = useParams();

  useEffect(()=>{
    const  fetchData = async ()=>{
      const response = await fetch(`${baseUrl}/products/${id}`).then((res)=>{
        console.log('res', res)
      })
    }
    fetchData()
  },[])
  return (
    <>
    <Header/>
    <div>Ashokkuamr</div>
    </>
  )
}

export default ProductList
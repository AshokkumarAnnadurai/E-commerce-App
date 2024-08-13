import classNames from 'classnames'
import React from 'react'
import { useAppSelector } from '../store'
import { Spinner } from '@/components/ui'
import GridItem from './GridItem'

const productList = [
    {
        id:1,
        img: 'public\\assets\\shirt1.jpg',
        name: 'ARZS E-COMMERCE Real Life Printed Round Neck T-Shirt for Men',
        price: '₹2,799.00',
        discountPrice: '₹999 M.R.P.'
    },
    {
        id:2,
        img: 'public\\assets\\shirt1.jpg',
        name: 'ARZS E-COMMERCE Real Life Printed Round Neck T-Shirt for Men',
        price: '₹2,799.00',
        discountPrice: '₹999 M.R.P.'
    },
    {
        id:3,
        img: 'public\\assets\\shirt1.jpg',
        name: 'ARZS E-COMMERCE Real Life Printed Round Neck T-Shirt for Men',
        price: '₹2,799.00',
        discountPrice: '₹999 M.R.P.'
    }
]

const ProductListContent = () => {

    const loading = useAppSelector((state) => state.productList.data.loading)
    const view = useAppSelector((state) => state.productList.data.view)
  return (
    <div  className={classNames(
        'mt-6 h-full flex flex-col',
        loading && 'justify-center'
    )}>
        {loading && (
                <div className="flex justify-center">
                    <Spinner size={40} />
                </div>
            )}
             {view === 'grid' && productList.length > 0 && !loading && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {productList.map((project) => (
                        <GridItem key={project.id} data={project} />
                    ))}
                </div>
            )}
    </div>
  )
}

export default ProductListContent
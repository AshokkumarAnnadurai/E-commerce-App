import React, { useEffect } from 'react'
import Header from './Header'
import reducer, { clearCommon_error, useAppSelector } from '../store'
import { Button, Card, Select } from '@/components/ui'
import Star from './Star'
import { calculateOriginalPrice, customToast } from '@/utils/helpers/helpers'
import { injectReducer, useAppDispatch } from '@/store'
import useCart from '@/utils/hooks/useCart'

injectReducer('HomeState', reducer)
const CartPage = () => {
    const { cart, quantities, handleQuantityChange, overallPrice } = useCart()

    const dispatch = useAppDispatch()

    const Common_error = useAppSelector((state)=>state.HomeState.data.Common_error)

    useEffect(() => {
        if (Common_error) {
            customToast('danger', Common_error)
            dispatch(clearCommon_error())
        }
    }, [Common_error])

    const quantityOptions = [...Array(10)].map((_, index) => ({
        value: index + 1,
        label: `${index + 1}`,
    }));
    return (
        <>
        <Header />
        <div className="text-center left-24 mt-24 md:mt-32 mb-10 md:mb-20 mx-4 md:mx-20">
            <h1 className='mb-4 text-start'>Shopping Cart</h1>
            {cart && cart.length > 0 ? (
                <div className='flex flex-col-reverse md:flex-row gap-3'>
                    <div className='w-full md:w-3/4 flex flex-col gap-3'>
                        {cart.map((data) => {
                            const fullStars = Math.floor(data.rating)
                            const originalPrice = calculateOriginalPrice(data.price, 20)
                            return (
                                <Card key={data._id}>
                                    <div className='flex flex-col md:flex-row gap-3'>
                                        <div className='flex justify-center'>
                                            <img src={data?.imgs[0]} alt='image' width="150px" />
                                        </div>
                                        <div className='flex flex-col items-start gap-2'>
                                            <p className='text-base md:text-xl text-black font-bold'>{data.title}</p>
                                            {data.reviews && data.reviews.length > 0 && (
                                                <div className="flex items-center gap-3 text-base md:text-xl">
                                                    <div>
                                                        {[...Array(5)].map((_, index) => {
                                                            return <Star key={index} filled={index < fullStars} />
                                                        })}
                                                    </div>
                                                    <span>
                                                        {data.reviews.length}{' '}
                                                        {data.reviews.length > 1
                                                            ? 'reviews'
                                                            : 'review'}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="flex flex-col gap-3">
                                                <h3 className="mr-2">
                                                    <span className="text-red-300 mr-4">-20%</span>₹{' '}
                                                    {data?.price * quantities[data._id]}
                                                </h3>{' '}
                                                {/* Display discounted price */}
                                                <p className='text-start'>
                                                    M.R.P ₹{' '}
                                                    <span className="line-through">
                                                        {originalPrice.toFixed(2)}
                                                    </span>{' '}
                                                    {/* Display original price */}
                                                </p>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                Qty : <Select
                                                    placeholder="Select Qty"
                                                    options={quantityOptions}
                                                    size='xs'
                                                    value={quantities[(data._id).toString()]}
                                                    onChange={(e) => handleQuantityChange(data._id, parseInt(e.value ? e.value : '1'))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                    <Card className='w-full md:w-1/4 text-start'>
                        <div className='flex flex-col gap-3'>
                            <h5>Price Details</h5>
                            <div className='flex justify-between items-center'>
                                <p>Price</p>
                                <span className='text-black'>₹ {overallPrice.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p>Discount</p>
                                <span className='text-green-400'>-20%</span>
                            </div>
                            <div className='flex justify-between items-center'>
                                <p>Delivery Charges</p>
                                <span className='text-green-400'>Free</span>
                            </div>
                            <Button className="buy-button" size='sm' onClick={() => customToast('info', 'Please SignIn to purchase products')}>Proceed to Buy</Button>
                        </div>
                    </Card>
                </div>
            ) : (
                <div className='text-center mt-20'>
                    <p>Your cart is empty. Start shopping to add items to your cart!</p>
                </div>
            )}
        </div>
    </>
    )
}

export default CartPage
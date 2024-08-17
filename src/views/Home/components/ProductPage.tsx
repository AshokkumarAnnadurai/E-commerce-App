import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import reducer, {
    getproductById,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { injectReducer } from '@/store'
import Header from './Header'
import { calculateOriginalPrice } from '@/utils/helpers/helpers'
import Star from './Star'
import { Avatar, Button } from '@/components/ui'
import { HiOutlineUser } from 'react-icons/hi'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'


injectReducer('HomeState', reducer)
const ProductPage = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const product = useAppSelector(
        (state) => state.HomeState.data.selectedProduct
    )
    const [showReviews, setShowReviews] = useState(false)
    console.log('🚀 ~ ProductPage ~ product:', product.imgs[0])

    // Getting the current window location
    const windowOrigin = window.location.origin
    const fullStars = Math.floor(product.rating)
    const hasHalfStar = product.rating % 1 >= 0.5
    const originalPrice = calculateOriginalPrice(product.price, 20)
    useEffect(() => {
        if (id) {
            dispatch(getproductById(parseInt(id)))
        }
    }, [])
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    }
    return (
        <div>
            <Header />
            <div className="h-full text-center left-24 my-40 mx-20">
                <div className="flex w-full">
                    <div className="w-1/4 p-4">
                        <img
                            src={`${windowOrigin}/${product.imgs[0]}`}
                            alt="image"
                        />
                    </div>
                    <div className="w-3/4 text-left flex flex-col gap-3 p-5">
                        <h1>{product.title}</h1>
                        {product.reviews && product.reviews.length > 0 && (
                            <div className="flex items-center gap-3 text-base md:text-xl">
                                <div>
                                    {[...Array(5)].map((_, index) => {
                                        if (index < fullStars) {
                                            return <Star key={index} filled />
                                        }
                                        if (
                                            index === fullStars &&
                                            hasHalfStar
                                        ) {
                                            return <Star key={index} half />
                                        }
                                        return <Star key={index} />
                                    })}
                                </div>
                                <span>
                                    {product.reviews.length}{' '}
                                    {product.reviews.length > 1
                                        ? 'reviews'
                                        : 'review'}
                                </span>
                            </div>
                        )}
                        <div className="flex flex-col gap-3">
                            <h3 className="mr-2">
                                <span className="text-red-300 mr-4">-20%</span>₹{' '}
                                {product?.price}
                            </h3>{' '}
                            {/* Display discounted price */}
                            <h3>
                                M.R.P ₹{' '}
                                <span className="line-through">
                                    {originalPrice.toFixed(2)}
                                </span>{' '}
                                {/* Display original price */}
                            </h3>
                        </div>
                        <span className="text-base md:text-2xl">
                            InStock : {product.inStock}
                        </span>
                        <div className="flex gap-2">
                            <Button className="w-64 bg-yellow-400 hover:bg-yellow-400">
                                Add to Cart
                            </Button>
                            <Button className="w-64 bg-amber-500 hover:bg-amber-500">
                                Buy Now
                            </Button>
                        </div>
                        {product.reviews && product.reviews.length > 0 && (
                            <div>
                                <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => setShowReviews(!showReviews)}
                                >
                                    <h4>Reviews</h4>
                                    {showReviews ? (
                                        <FaChevronUp />
                                    ) : (
                                        <FaChevronDown />
                                    )}
                                </div>
                                {showReviews && (
                                    <div>
                                        {product.reviews.map((rev) => {
                                            const fullStars = Math.floor(
                                                rev.rating
                                            )
                                            const hasHalfStar =
                                                rev.rating % 1 >= 0.5
                                            return (
                                                <div key={rev.id}>
                                                    <div className="flex gap-3 items-center">
                                                        <Avatar
                                                            size={32}
                                                            shape="circle"
                                                            icon={
                                                                <HiOutlineUser />
                                                            }
                                                        />
                                                        <h5>{rev.name}</h5>
                                                    </div>
                                                    <div>
                                                        {[...Array(5)].map(
                                                            (_, index) => {
                                                                if (
                                                                    index <
                                                                    fullStars
                                                                ) {
                                                                    return (
                                                                        <Star
                                                                            key={
                                                                                index
                                                                            }
                                                                            filled
                                                                        />
                                                                    )
                                                                }
                                                                if (
                                                                    index ===
                                                                        fullStars &&
                                                                    hasHalfStar
                                                                ) {
                                                                    return (
                                                                        <Star
                                                                            key={
                                                                                index
                                                                            }
                                                                            half
                                                                        />
                                                                    )
                                                                }
                                                                return (
                                                                    <Star
                                                                        key={
                                                                            index
                                                                        }
                                                                    />
                                                                )
                                                            }
                                                        )}
                                                        <span className='text-semibold text-base md:text-xl'>{rev.title}</span>
                                                    </div>
                                                    <p className='text-base md:text-xl'>{rev.content}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductPage

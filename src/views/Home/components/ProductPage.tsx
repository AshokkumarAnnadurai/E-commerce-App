import reducer, {
    addToCart,
    clearCommon_error,
    toggleShowReviews,
    useAppDispatch,
    useAppSelector,
} from '../store'
import { injectReducer } from '@/store'
import Header from './Header'
import { calculateOriginalPrice, customToast } from '@/utils/helpers/helpers'
import Star from './Star'
import { Avatar, Button } from '@/components/ui'
import { HiOutlineUser } from 'react-icons/hi'
import { FaCheck, FaChevronDown, FaChevronUp } from 'react-icons/fa6'
import useProductDetails from '@/utils/hooks/useProductDetails'
import { useEffect, useState } from 'react'


injectReducer('HomeState', reducer)
const ProductPage = () => {
    const dispatch = useAppDispatch()
    const { product } = useProductDetails()
    const showReviews = useAppSelector((state) => state.HomeState.data.showReviews)
    const Common_error = useAppSelector((state)=>state.HomeState.data.Common_error)
    const windowOrigin = window.location.origin
    const fullStars = Math.floor(product.rating)
    const originalPrice = calculateOriginalPrice(product.price, 20)

    // State to track if the product is added to the cart
    const [isAddedToCart, setIsAddedToCart] = useState(false)

    const handleAddToCart = () => {
        dispatch(addToCart(product))
        setIsAddedToCart(true)
    }

   

    useEffect(() => {
        if (Common_error) {
            customToast('danger', Common_error)
            dispatch(clearCommon_error())
        }
    }, [Common_error])

    return (
        <div>
            <Header />
            <div className="text-center left-24 mt-24 md:mt-40 mb-10 md:mb-20 mx-0 md:mx-20">
                <div className="flex flex-col md:flex-row w-full">
                    <div className="w-full md:w-1/4 p-4">
                        <img
                            src={`${windowOrigin}/${product.imgs}`}
                            alt="image"
                        />
                    </div>
                    <div className="w-full md:w-3/4 text-left flex flex-col gap-3 p-5">
                        <h1>{product.title}</h1>
                        {product.reviews && product.reviews.length > 0 && (
                            <div className="flex items-center gap-3 text-base md:text-xl">
                                <div>
                                    {[...Array(5)].map((_, index) => {
                                        return <Star key={index} filled={index < fullStars} />
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
                            <Button className="w-64 bg-yellow-400 hover:bg-yellow-400" onClick={handleAddToCart} disabled={isAddedToCart}>
                            {isAddedToCart ? (
                                    <>
                                        <FaCheck className="inline mr-2" /> Added to Cart
                                    </>
                                ) : (
                                    'Add to Cart'
                                )}
                            </Button>
                            <Button className="w-64 buy-button" onClick={()=>customToast('info' , 'Please SignIn to purchase products')}>
                                Buy Now
                            </Button>
                        </div>
                        {product.reviews && product.reviews.length > 0 && (
                            <div>
                                <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => dispatch(toggleShowReviews())}
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
                                                        {[...Array(5)].map((_, index) => {
                                                            return (
                                                                <Star
                                                                    key={index}
                                                                    filled={index < fullStars}
                                                                />
                                                            )
                                                        })}
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

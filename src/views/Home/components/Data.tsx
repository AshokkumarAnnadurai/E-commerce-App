import { Card } from '@/components/ui';
import { useCallback, useEffect, useState } from 'react';
import Star from './Star';
import { getProducts, getcategories, useAppDispatch, useAppSelector } from '../store';
import { CustomSpinner, calculateOriginalPrice } from '@/utils/helpers/helpers';
import { Link } from 'react-router-dom';

const Data = () => {

    const dispatch = useAppDispatch()
    const [productsByCategory, setProductsByCategory] = useState({});
    const products = useAppSelector((state) => state.HomeState.data.products)
    const categories = useAppSelector((state) => state.HomeState.data.categories)
    const loading = useAppSelector((state) => state.HomeState.data.loading)

    useEffect(() => {
        dispatch(getProducts())
        dispatch(getcategories())
    }, []);

    useEffect(() => {
        if (products.length > 0 && categories.length > 0) {
            groupProductsByCategory(products);
        }
    }, [products, categories]);

    // Function to group products by category
    const groupProductsByCategory = useCallback((products) => {
        const grouped = products.reduce((acc, product) => {
            (acc[product.category] = acc[product.category] || []).push(product);
            return acc;
        }, {});
        setProductsByCategory(grouped);
    }, [products])

    if (loading) {
        return <CustomSpinner />
    }

    return (
        <div className='px-4 md:px-16 py-3 md:py-8'>
            {categories.map((category) => {
                const products = productsByCategory[category.title] || [];
                return (
                    <div key={category.id} id={category.title.toLowerCase().replace(/\s+/g, '-')} className='mb-12'>
                        <h2 className='text-2xl font-bold mb-4'>{category.title}</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
                            {products.map((item) => {
                                const fullStars = Math.floor(item.rating);
                                const originalPrice = calculateOriginalPrice(item.price, 20); // Assuming 20% discount
                                return (
                                    <Card className='relative h-full' key={item._id}>
                                        {item.popular && (
                                            <div className='absolute -top-3 right-3 bg-yellow-400 text-white text-xs px-2 py-1 rounded-md'>
                                                Best Seller
                                            </div>
                                        )}
                                        <Link to={`/product/${item._id}`} className="block h-full">
                                            <div className='h-1/2'>
                                                <img src={item?.imgs[0] ? item.imgs[0] : item.imgs[1]} alt="image" />
                                            </div>
                                            <div className='h-1/2 mt-4'>
                                                <div>{item?.title}</div>
                                                {item.reviews && item.reviews.length > 0 && (
                                                    <div className='flex items-center'>
                                                        {[...Array(5)].map((_, index) => {
                                                            return (
                                                                <Star
                                                                    key={index}
                                                                    filled={index < fullStars}
                                                                />
                                                            )
                                                        })}
                                                        {item.reviews.length}
                                                    </div>
                                                )}
                                                <div>
                                                    <div className='mr-2 text-black text-bold text-base md:text-xl' >₹ {item?.price}</div> {/* Display discounted price */}
                                                    <div>
                                                        M.R.P ₹ <span className='line-through'>{originalPrice.toFixed(2)}</span> {/* Display original price */}
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Data;

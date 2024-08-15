import { Card } from '@/components/ui';
import { useEffect, useState } from 'react';
import Star from './Star';

const Data = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [productsByCategory, setProductsByCategory] = useState({});

    useEffect(() => {
        const fetchProductsData = async () => {
            const response = await fetch('https://e-commerce-api-3l8b.onrender.com/api/products').then((res) => {
                if (res.ok) {
                    return res.json();
                }
            });
            setData(response);
            groupProductsByCategory(response); // Group products once they are fetched
        };

        const fetchCategoriesData = async () => {
            const response = await fetch('https://e-commerce-api-3l8b.onrender.com/api/categories').then((res) => {
                if (res.ok) {
                    return res.json();
                }
            });
            setCategories(response);
        };

        fetchProductsData();
        fetchCategoriesData();
    }, []);

    // Function to calculate original price from discounted price and discount percentage
    const calculateOriginalPrice = (discountedPrice: number, discountPercentage: number) => {
        return discountedPrice / (1 - discountPercentage / 100);
    };

    // Function to group products by category
    const groupProductsByCategory = (products) => {
        const grouped = products.reduce((acc, product) => {
            (acc[product.category] = acc[product.category] || []).push(product);
            return acc;
        }, {});
        setProductsByCategory(grouped);
    };

    return (
        <div className='px-16 py-8'>
            {categories.map((category) => {
                const products = productsByCategory[category.title] || [];
                return (
                    <div key={category.id} className='mb-12'>
                        <h2 className='text-2xl font-bold mb-4'>{category.title}</h2>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3'>
                            {products.map((item) => {
                                const fullStars = Math.floor(item.rating);
                                const hasHalfStar = item.rating % 1 >= 0.5;
                                const originalPrice = calculateOriginalPrice(item.price, 20); // Assuming 20% discount

                                return (
                                    <Card className='h-full' key={item.id}>
                                        <div className='h-1/2'>
                                            <img src={item?.imgs[0] ? item.imgs[0] : item.imgs[1]} alt="image" />
                                        </div>
                                        <div className='h-1/2 mt-4'>
                                            <div>{item?.title}</div>
                                            {item.reviews && item.reviews.length > 0 && (
                                                <div className='flex items-center'>
                                                    {[...Array(5)].map((_, index) => {
                                                        if (index < fullStars) {
                                                            return <Star key={index} filled />;
                                                        }
                                                        if (index === fullStars && hasHalfStar) {
                                                            return <Star key={index} half />;
                                                        }
                                                        return <Star key={index} />;
                                                    })}
                                                    {item.reviews.length}
                                                </div>
                                            )}
                                            <div>
                                                <div className='mr-2'>₹ {item?.price}</div> {/* Display discounted price */}
                                                <div>
                                                    M.R.P ₹ <span className='line-through'>{originalPrice.toFixed(2)}</span> {/* Display original price */}
                                                </div>
                                            </div>
                                        </div>
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

import { useState } from 'react'
import { useAppSelector } from '@/views/Home/store'

const useCart = () => {
    const cart = useAppSelector((state) => state.HomeState.data.cart)
    const [quantities, setQuantities] = useState(
        cart.reduce((acc, item) => {
            acc[item._id] = 1
            return acc
        }, {})
    )

    const handleQuantityChange = (id:number | string, selectedQuantity:number) => {
        setQuantities((prevQuantities) => ({
            ...prevQuantities,
            [id]: selectedQuantity,
        }))
    }

    const overallPrice = cart.reduce((total, item) => {
        return total + item.price * (quantities[item._id] || 1)
    }, 0)

    return { cart, quantities, handleQuantityChange, overallPrice }
}

export default useCart

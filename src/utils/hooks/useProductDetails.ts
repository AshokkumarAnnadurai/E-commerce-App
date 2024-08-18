import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector , getproductById } from '@/views/Home/store'

const useProductDetails = () => {
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const product = useAppSelector((state) => state.HomeState.data.selectedProduct)

    useEffect(() => {
        if (id) {
            dispatch(getproductById(parseInt(id)))
        }
    }, [id, dispatch])

    return { product }
}

export default useProductDetails

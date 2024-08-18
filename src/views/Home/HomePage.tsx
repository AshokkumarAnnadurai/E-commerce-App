import { injectReducer, useAppDispatch } from '@/store'
import CarouselTransition from './components/Coursel'
import Data from './components/Data'
import Header from './components/Header'
import reducer, { clearCommon_error, useAppSelector } from './store'
import { useEffect } from 'react'
import { customToast } from '@/utils/helpers/helpers'

injectReducer('HomeState' , reducer)
const Home = () => {

    const dispatch = useAppDispatch()

    const Common_error = useAppSelector((state)=>state.HomeState.data.Common_error)

    useEffect(() => {
        if (Common_error) {
            customToast('danger', Common_error)
            dispatch(clearCommon_error())
        }
    }, [Common_error])
    return (
        <>
            <Header />
            <CarouselTransition />
            <Data />
        </>
    )
}

export default Home

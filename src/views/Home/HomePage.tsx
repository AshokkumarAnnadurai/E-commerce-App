import { injectReducer } from '@/store'
import CarouselTransition from './components/Coursel'
import Data from './components/Data'
import Header from './components/Header'
import reducer from './store'
import { useParams } from 'react-router-dom'

injectReducer('HomeState' , reducer)
const Home = () => {

    const {id} = useParams()
    console.log("🚀 ~ Home ~ id:", id)

    
    return (
        <>
            <Header />
            <CarouselTransition />
            <Data />
        </>
    )
}

export default Home

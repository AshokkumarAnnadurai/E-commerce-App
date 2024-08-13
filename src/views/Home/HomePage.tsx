import CarouselTransition from './components/Coursel'
import Data from './components/Data'
import Header from './components/Header'


const Home = () => {
    return (
        <>
            <Header />
            <CarouselTransition />
            <Data />
            {/* <HeroSection /> */}
            {/* <section id="why">
                <div className='home'>
                    <Section3 />
                </div>
            </section>
            <section  id="reinvent" className='bg-sky-100 overflow-hidden'>
                <div className='home'>
                    <Section5 />
                </div>
            </section>
            <section id="discover">
                <div className='home'>
                    <Section6 />
                </div>
            </section>
            <section id="subscription" className='bg-slate-100 overflow-hidden'>
                <div className='home'>
                    <Subscription />
                </div>
            </section>
            <section id="joinevent" className='bg-sky-100 overflow-hidden'>
                <div className='home'>
                    <Section9 />
                </div>
            </section>
            <section id="contactus" className='overflow-hidden'>
                <div className='container py-20'>
                    <Footer />
                </div>
            </section> */}
        </>
    )
}

export default Home

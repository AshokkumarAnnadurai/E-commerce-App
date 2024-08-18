import { useEffect, useState } from 'react'
import { Badge, Button } from '@/components/ui'
import { FaArrowRight } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useAppSelector } from '../store';
import { Link } from 'react-router-dom';

const baseUrl = import.meta.env.VITE_BASE_URL

const Header = () => {
    const [isMenuFocused, setIsMenuFocused] = useState(false)
    const [menus, setMenus] = useState([])
    const windowOrigin = window.location.origin
    const pathname = window.location.pathname
    const cart = useAppSelector((state) => state.HomeState.data.cart)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${baseUrl}/categories`).then((res) => {
                if (res.ok) {
                    return res.json()
                }
            })
            setMenus(response)
        }
        fetchData()
    }, [])



    return (
        <header className="2xl:p-5 md:p-1 fixed w-full top-0 z-30 opacity-90 small shadow bg-yellow-400">
            <div className="container overflow-hidden">
                <div className="flex justify-between items-center">
                    <a className="flex p-2 " href="/">
                        <img src={`${windowOrigin}/public\\assets\\logo.png`} alt='logo' height="50px" width="150px" color='text-black' />
                    </a>
                    {pathname === '/' && <nav className="hidden lg:block">
                        <ul className="navbar flex flex-col justify-center font-chivo gap-8 lg:flex-row">
                            {menus && Array.isArray(menus) && menus.length ? menus?.map((link) => (
                                <li
                                    className="group  relative dropdown flex items-center"
                                >
                                    <a
                                        href={`#${link.title.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="hover:text-green-900 text-lg text-black font-normal menu-link lg:text-heading-6 mr-[7px]"
                                    >
                                        {link?.title}
                                    </a>
                                </li>
                            )) : null}
                        </ul>
                    </nav>}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/cart" className="flex items-center">
                            <Badge content={cart ? cart.length : 0}>
                                <FaCartShopping size={28} />
                            </Badge>
                        </Link>

                        <button type="button">
                            {' '}
                            <a
                                href='/sign-in'
                                className="flex items-center inline-block z-10 relative transition-all duration-200 group px-[22px] py-[15px] lg:px-[32px] lg:py-[22px] rounded-[50px] bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-white hover:-translate-y-[2px] hidden lg:flex"
                            >
                                <span className="block text-inherit w-full h-full rounded-[50px] text-lg font-bold">
                                    Login
                                </span>
                                <i>
                                    {' '}
                                    <div className="ml-[7px] w-[12px] inline-block group-hover:hidden">
                                        <FaArrowRight />
                                    </div>
                                    <div className="ml-[7px] w-[12px] hidden group-hover:inline-block">
                                        <FaArrowCircleRight />
                                    </div>
                                </i>
                            </a>
                        </button>
                    </div>

                    <>
                        <button
                            className="block lg:hidden py-3 px-4 mx-2 rounded focus:outline-none hover:bg-gray-200 group"
                            onClick={() => setIsMenuFocused(true)}
                        >
                            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
                            <div className="w-5 h-1 bg-gray-600 mb-1"></div>
                            <div className="w-5 h-1 bg-gray-600"></div>
                        </button>
                        <div
                            className={`fixed top-0 -right-full h-screen w-8/12 bg-white border ${isMenuFocused ? 'right-0 opacity-100' : ''
                                }transition-all duration-300 lg:hidden`}
                        >
                            <div className="flex flex-col">
                                <div className="w-full text-right">
                                    <Button
                                        variant="plain"
                                        onClick={() => setIsMenuFocused(false)}
                                    >
                                        X
                                    </Button>
                                </div>

                                <div className="w-full text-center">
                                    {menus.map((link) => (
                                        <a
                                            href={`#${link.title.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="w-full block hover:bg-gray-200 py-4 px-6"
                                        >
                                            {link?.title}
                                        </a>
                                    ))}

                                    <a
                                        href="/sign-in"
                                        className="w-full block hover:bg-gray-200 py-4 px-6"
                                    >
                                        Login
                                    </a>
                                </div>
                            </div>
                        </div>
                    </>
                </div>
            </div>
        </header>
    )
}

export default Header

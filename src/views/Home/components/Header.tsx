import React, { useState } from 'react'
import { Button } from '@/components/ui'
import { useSinglePrismicDocument } from '@prismicio/react'
import { FaArrowRight } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

const changeURL = (anchor: string) => {
    const fullURL = `${window.location.origin}/${anchor}`;
    return fullURL;
};

const menuLinks = [
    {
        text: 'Mens'
    },
    {
        text: 'Women'
    },
    {
        text: 'Unisex'
    },
    {
        text: 'Children'
    }
]

const Header = () => {
    const [isMenuFocused, setIsMenuFocused] = useState(false)

    return (
        <header className="2xl:p-5 md:p-1 fixed w-full top-0 bg-white z-30 opacity-90 small shadow">
            <div className="container overflow-hidden">
                <div className="flex justify-between items-center">
                    <a className="flex p-2 " href="/">
                        E-Commerce
                    </a>
                    <nav className="hidden lg:block">
                        <ul className="navbar flex flex-col justify-center font-chivo gap-8 lg:flex-row">
                            {menuLinks && Array.isArray(menuLinks) && menuLinks.length ? menuLinks?.map((link) => (
                                <li
                                    className="group  relative dropdown flex items-center"
                                >
                                    <a
                                        className="hover:text-green-900 text-lg font-normal menu-link lg:text-heading-6 mr-[7px]"
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            )):null}
                        </ul>
                    </nav>
                    <div className="hidden md:block">
                        <button type="button">
                            {' '}
                            <a
                                className="flex items-center inline-block z-10 relative transition-all duration-200 group px-[22px] py-[15px] lg:px-[32px] lg:py-[22px] rounded-[50px] bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-white hover:-translate-y-[2px] hidden lg:flex"
                            >
                                <span className="block text-inherit w-full h-full rounded-[50px] text-lg font-bold">
                                    Login
                                </span>
                                <i>
                                    {' '}
                                    <div className="ml-[7px] w-[12px] inline-block group-hover:hidden">
                                        <FaArrowRight/>
                                    </div>
                                    <div className="ml-[7px] w-[12px] hidden group-hover:inline-block">
                                        <FaArrowCircleRight/>
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
                                    {menuLinks.map((link) => (
                                        <a
                                            className="w-full block hover:bg-gray-200 py-4 px-6"
                                        >
                                            {link.text}
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

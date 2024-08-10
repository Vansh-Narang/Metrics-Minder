import React, { useState } from 'react';
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex flex-col md:flex-row mx-auto w-full justify-between'>
            {/* Logo and Text */}
            <div className='flex items-center justify-between w-full md:w-1/2 pl-4 md:pl-16 p-4'>
                <div className='flex items-center gap-x-6'>
                    <img src={logo} alt='logo' height={25} width={25} />
                    <h1 className='text-xl mt-1.5'>Metric Minder</h1>
                </div>
                {/* Hamburger Menu Button */}
                <div className='md:hidden'>
                    <button
                        onClick={toggleMenu}
                        className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-500 hover:text-black hover:border-black"
                    >
                        <svg
                            className="h-4 w-4 fill-current"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M20 11H0v-2h20v2zm0-6H0V3h20v2zm0 12H0v-2h20v2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </div>
            {/* Hidden Menu Items */}
            <div
                className={`${isOpen ? 'block' : 'hidden'
                    } md:flex md:flex-row md:items-center md:justify-end md:w-1/2 bg-grayBG md:pr-16 md:p-4`}
            >
                <ul className='flex flex-col md:flex-row gap-7 p-1 items-center cursor-pointer mt-2 mb-2 md:mt-0 md:mb-0'>
                    <li>
                        <Link to="/privacy" className="text-gray-700 hover:text-black">Your Privacy</Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-gray-700 hover:text-black">About us</Link>
                    </li>
                    <li>
                        <button className='border-2 pl-4 pr-4 pt-2 pb-2 rounded-md bg-blackBG text-white border-blackBG hover:bg-transparent hover:text-blackBG'>
                            Contact Us
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;

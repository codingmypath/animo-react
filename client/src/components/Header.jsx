import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function Header() {
const { currentUser } = useSelector(state => state.user)
  return (
    <header className='font-mulish bg-lightestGreen shadow-md text-darkGreen'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <Link to='/'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    {/* <span className='text-sky-600'>Animo</span> */}
                    <img src="/animo1-remove.png" className='w-36' />
                </h1>
            </Link>
            <ul className='flex gap-4 font-semibold'>
                <Link to='/'>
                    <li className='hidden sm:inline text-darkGreen hover:text-middleGreen'>Home</li>
                </Link>
                <Link to='/resources'>
                    <li className='hidden sm:inline text-darkGreen hover:text-middleGreen'>Resources</li>
                </Link>
                <Link to='/profile'>
                {currentUser ? (
                    <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='avatar' />
                ) : (<li className='text-slate-700 hover:underline'>Sign In</li> 
                
                )}               
                </Link>
            </ul>
        </div>
    </header>
  )
}

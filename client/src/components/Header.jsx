import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaX } from 'react-icons/fa6';


export default function Header() {
    const [openNav, setopenNav] = useState(false);
    const { currentUser } = useSelector(state => state.user);

    const toggleNavbar = () => {
        setopenNav(!openNav);
    }

  return (
<div>
    <header className='font-mulish flex top-0 bg-lightestGreen shadow-md text-darkGreen'>
            <div className='hidden md:flex justify-between items-center max-w-6xl mx-auto p-3'>
                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        {/* <span className='text-sky-600'>Animo</span> */}
                        <img src="/animo1-remove.png" className='w-36' />
                    </h1>
                </Link>
                <ul className='flex gap-4 font-semibold'>
                    <Link to='/'>
                        <li className='sm:inline text-darkGreen hover:text-middleGreen'>Home</li>
                    </Link>
                    <Link to='/resources'>
                        <li className='sm:inline text-darkGreen hover:text-middleGreen'>Resources</li>
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
    <div className='md:hidden fixed basis-full justify-right p-4 z-50'>
                <div onClick={toggleNavbar}>
                    { openNav ? <FaX className='text-darkGreen hover:cursor-pointer w-6 h-6'/> :  <button>
                {currentUser ? (
                    <img className='rounded-full h-8 w-8 object-cover' src={currentUser.avatar} alt='avatar' />
                ) : (<li className='text-slate-700 hover:underline'>Sign In</li> 
                
                )}               
                </button> }
                </div>
    </div>

    {openNav && (
        <header className='font-mulish flex flex-col w-full fixed bg-lightestGreen shadow-md text-darkGreen z-10'>
        <div className='md:flex flex-col justify-between max-w-6xl mx-auto p-3'>
            <Link to='/' onClick={toggleNavbar}>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap pb-4'>
                    {/* <span className='text-sky-600'>Animo</span> */}
                    <img src="/animo1-remove.png" className='w-36' />
                </h1>
            </Link>
            <ul className='flex flex-col gap-4 font-semibold items-center'>
                <Link to='/' onClick={toggleNavbar}>
                    <li className='text-darkGreen hover:text-middleGreen'>Home</li>
                </Link>
                <Link to='/resources' onClick={toggleNavbar}>
                    <li className='text-darkGreen hover:text-middleGreen'>Resources</li>
                </Link>
                <Link to='/profile' onClick={toggleNavbar}>
                {currentUser ? (
                   <li className='text-darkGreen hover:text-middleGreen'>Profile</li>
                ) : (<li className='text-slate-700 hover:underline'>Sign In</li> 
                
                )}               
                </Link>
            </ul>

        </div>

        </header>
    )}
    
    </div>



    // <header className='font-mulish bg-lightestGreen shadow-md text-darkGreen'>
    //     <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
    //         <Link to='/'>
    //             <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
    //                 {/* <span className='text-sky-600'>Animo</span> */}
    //                 <img src="/animo1-remove.png" className='w-36' />
    //             </h1>
    //         </Link>
    //         <ul className='flex gap-4 font-semibold'>
    //             <Link to='/'>
    //                 <li className='hidden sm:inline text-darkGreen hover:text-middleGreen'>Home</li>
    //             </Link>
    //             <Link to='/resources'>
    //                 <li className='hidden sm:inline text-darkGreen hover:text-middleGreen'>Resources</li>
    //             </Link>
    //             <Link to='/profile'>
    //             {currentUser ? (
    //                 <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='avatar' />
    //             ) : (<li className='text-slate-700 hover:underline'>Sign In</li> 
                
    //             )}               
    //             </Link>
    //         </ul>
    //     </div>
    // </header>
  )
}

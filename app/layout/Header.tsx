import Link from 'next/link';
import * as React from 'react';

const Header = () => {
    return (
        <header className='flex justify-between bg-slate-800 p-8'>
            <div className="text-center">
                <Link href={'/'}><h1 className="text-3x1 font-bold text-white text-xl">YOON-HEE-CHEOL</h1></Link>
            </div>
            <div className='text-center text-slate-300 text-base '>
                <Link href={'/'}>Log</Link>
                <Link href={'/'} className='ml-6'>Log</Link>
                <Link href={'/'} className='ml-6'>Log</Link>
                <Link href={'/'} className='ml-6'>Log</Link>
            </div>
        </header>
        )
}

export default Header;
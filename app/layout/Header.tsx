import Link from 'next/link';
import * as React from 'react';

const Header = () => {
    return (
        <header>
            <div className="text-center bg-slate-800 p-8 mb-4">
                <Link href={'/'}><h1 className="text-3x1 font-bold text-white">Yoon Log</h1></Link>
                <p className="text-slate-400">Welcome to my dev log.</p>
            </div>
        </header>
        )
}

export default Header;
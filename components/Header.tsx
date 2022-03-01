import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <header className="flex justify-between p-5 max-w-7xl mx-auto">
            <div className="flex items-center space-x-5">
                <div className="flex items-center">
                    <img src="/thunder.png" alt="Light Pen" className="w-16 object-contain cursor-pointer" />
                    <Link href="/">
                        <h1 className="font-bold text-2xl">Light Pen</h1>
                    </Link>
                </div>
                <div className="hidden md:inline-flex items-center space-x-5">
                    <h3>About</h3>
                    <h3>Contact</h3>
                    <h3 className="text-black bg-yellow-400 rounded-full px-4 py-1">Follow</h3>
                </div>
            </div>
            <div className="flex items-center space-x-5 text-yellow-400">
                <h3>Sign In</h3>
                <h3 className="border border-yellow-400 rounded-full px-4 py-1 cursor-pointer">Get Started</h3>
            </div>
        </header>
    )
}

export default Header
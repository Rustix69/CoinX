import { Github, Instagram, Linkedin, Twitter } from 'lucide-react'
import React from 'react'

const Header = () => {
    return (
        <div className='flex justify-between items-center py-4 px-8'>

            {/* Logo */}
            <div>
                <img src="./logo.png" alt="CoinX" className='h-12' />
            </div>

            {/* Social Icons */}
            <div div className='flex space-x-4'>

                <a href="https://github.com/Rustix69" target="_blank" rel="noreferrer">
                    <Github className='h-6 w-6' />
                </a>
                <a href="https://instagram.com/Rustixguy69" target="_blank" rel="noreferrer">
                    <Instagram className='h-6 w-6' />
                </a>

                <a href="https://linkedin.com/in/anirban69" target="_blank" rel="noreferrer">
                    <Linkedin className='h-6 w-6' />
                </a>

                <a href="https://x.com/Rustix69" target="_blank" rel="noreferrer">
                    <Twitter className='h-6 w-6' />
                </a>
            </div>
        </div>
    )
}

export default Header
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoChevronUp } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { genreList } from "../../const/genre";
import { navLinks, profileLinks } from "../../const/navigation";

interface HeaderProps {
    withGenre?: boolean;
}

export const Header = ({ withGenre }: HeaderProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className='py-4 px-6 md:py-5 md:px-10 lg:px-20 flex justify-between items-center md:gap-12 sticky top-0 w-full z-60 bg-other-page-header'>
            <div className='flex gap-3 lg:gap-20 items-center'>
                <Link to='/' className='flex items-center gap-2 text-white'>
                    <img
                        src='src\assets\logo.png'
                        className='w-25.75 hidden md:inline'
                        alt='chill logo'
                    />
                    <img
                        src='public\chill.svg'
                        className='w-5 inline md:hidden'
                        alt='chill logo'
                    />
                </Link>

                <nav>
                    <ul className='flex gap-4 lg:gap-20 text-white list-none'>
                        {navLinks.map((link) => (
                            <li key={link.name} className='cursor-pointer hover:text-blue-500 transition-colors'>
                                <Link
                                    to={link.path}
                                    className='text-xs md:text-lg font-medium'>
                                    {link.name}
                                </Link>
                            </li>
                        ))}

                        {withGenre && (
                            <li>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger className="cursor-pointer hover:text-blue-500 transition-colors text-xs md:text-lg font-medium inline-flex sm:hidden items-center gap-1 group mt-1">
                                        Genre
                                        <IoChevronUp className="size-4 transition-transform group-data-[state=closed]:rotate-180 group-data-[state=open]:rotate-0" />
                                    </DropdownMenu.Trigger>

                                    <DropdownMenu.Portal>
                                        <DropdownMenu.Content
                                            align="center"
                                            sideOffset={15}
                                            className="bg-other-paper text-text-light-primary text-sm font-medium min-w-30 rounded-lg shadow-md z-50 max-h-62.5 overflow-y-auto p-1 flex flex-col"
                                        >
                                            {genreList.map((genre, index) => (
                                                <DropdownMenu.Item
                                                    key={index}
                                                    asChild
                                                    className="text-xs text-nowrap hover:bg-other-extra transition-all duration-300 py-2 px-3 mx-0.5 rounded-md cursor-pointer outline-none focus:bg-other-extra flex items-center"
                                                >
                                                    <Link to={`/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`}>
                                                        {genre}
                                                    </Link>
                                                </DropdownMenu.Item>
                                            ))}
                                        </DropdownMenu.Content>
                                    </DropdownMenu.Portal>
                                </DropdownMenu.Root>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>

            {/* Profile Section */}
            <div
                className='relative flex items-center gap-1 md:gap-2 cursor-pointer'
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
                <img
                    src='src\assets\profile.png'
                    className='w-6 md:w-10 rounded-full'
                    alt='avatar profile'
                />
                <MdOutlineKeyboardArrowDown className={`text-white text-2xl md:text-4xl transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />

                {isDropdownOpen && (
                    <div className='absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden z-50 bg-other-page-header border border-white/5'>
                        {profileLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`flex items-center gap-3 px-4 py-3 transition-colors text-sm 
                        ${link.isLogout ? 'text-red-500 hover:bg-red-500/10' : 'text-white hover:text-blue-700 hover:bg-white/5'}`}
                            >
                                <link.icon className="text-lg" />
                                <span>{link.name}</span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </header>
    );
};
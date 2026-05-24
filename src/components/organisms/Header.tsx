import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoChevronUp, IoSearch } from "react-icons/io5";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { genreList } from "../../const/genre";
import { navLinks, profileLinks } from "../../const/navigation";
import { Button } from "../atoms/Button";
import { useAuthStore } from "../../store/useAuthStore";
import { IoMdSettings } from "react-icons/io";

interface HeaderProps {
    withGenre?: boolean;
}

export const Header = ({ withGenre }: HeaderProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const { isLoggedIn, logout, user } = useAuthStore();

    const getAvatarSrc = () => {
        const avatar = user?.avatar;
        if (!avatar) return "/src/assets/profile.png";
        if (avatar.startsWith('http') || avatar.startsWith('data:image')) return avatar;
        const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        return `${baseUrl}${avatar.startsWith('/') ? '' : '/'}${avatar}`;
    };

    const handleSearch = (e: FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery("");
        }
    };

    return (
        <header className='py-1.5 px-5 md:py-4 md:px-10 lg:py-6.25 lg:px-20 flex justify-between items-center md:gap-12 sticky top-0 w-full z-60 bg-other-page-header'>
            <div className='flex gap-3 lg:gap-20 items-center'>
                <Link to='/' className='flex items-center gap-2 text-white'>
                    <img
                        src='/src/assets/logo.png'
                        className='w-25.75 hidden md:inline'
                        alt='chill logo'
                    />
                    <img
                        src='/chill.svg'
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
            {isLoggedIn ? (
                <div className="flex items-center gap-3 md:gap-6">
                    <form onSubmit={handleSearch} className="relative flex items-center">
                        <IoSearch className="absolute left-2 text-white/50 text-lg" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Cari film..."
                            className="bg-black/30 border border-white/20 rounded-full pl-8 pr-4 py-1.5 text-xs md:text-sm text-white placeholder-white/50 focus:outline-none focus:border-white/50 w-32 md:w-48 transition-all focus:w-40 md:focus:w-64"
                        />
                    </form>

                    <div
                        className='relative flex items-center gap-1 md:gap-2 cursor-pointer'
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <img
                            src={getAvatarSrc()}
                            className='w-6 h-6 md:w-10 md:h-10 aspect-square rounded-full border border-white/20 object-cover'
                            alt='avatar profile'
                        />

                        <MdOutlineKeyboardArrowDown className={`text-white text-2xl md:text-4xl transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />

                        {isDropdownOpen && (
                            <div className='absolute top-full right-0 mt-2 w-48 rounded-lg shadow-xl overflow-hidden z-50 bg-other-page-header border border-white/5'>
                                {profileLinks.map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.path}
                                        onClick={link.isLogout ? logout : undefined}
                                        className={`flex items-center gap-3 px-4 py-3 transition-colors text-sm 
                                        ${link.isLogout ? 'text-red-500 hover:bg-red-500/10' : 'text-white hover:bg-white/5'}`}
                                    >
                                        <link.icon className="text-lg" />
                                        <span>{link.name}</span>
                                    </Link>
                                ))}
                                {/* Tambahkan link Admin jika rolenya admin */}
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-blue-400 hover:bg-white/5 text-sm border-t border-white/5">
                                        <IoMdSettings className="text-lg" />
                                        <span>Panel Admin</span>
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="flex gap-1 md:gap-2">
                    <Button
                        to="/login"
                        variant="secondary"
                        className="px-2! py-1! text-[10px]! md:text-sm! md:px-4! md:py-1.5! rounded-full!"
                    >
                        Masuk
                    </Button>

                    <Button
                        to="/register"
                        variant="primary"
                        className="px-2! py-1! text-[10px]! md:text-sm! md:px-4! md:py-1.5! rounded-full!"
                    >
                        Daftar
                    </Button>
                </div>
            )}
        </header>
    );
};
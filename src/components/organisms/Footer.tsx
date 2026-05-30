import { useState } from "react";
import logoUrl from "../../assets/logo.png";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import { genreList } from "../../const/genre";
import { Link } from "react-router-dom";

export const Footer = () => {
    const helps = ["FAQ", "Kontak Kami", "Privasi", "Syarat & Ketentuan"];

    const [isGenreOpen, setIsGenreOpen] = useState(false);
    const [isHelpOpen, setIsHelpOpen] = useState(false);

    return (
        <footer className='flex flex-col lg:flex-row lg:justify-between p-5 md:p-10 lg:py-15 lg:px-20 border-t border-[#E7E3FC3B]'>
            <div className='flex flex-col gap-5 md:gap-6 mb-10'>
                <Link to='/' className='flex items-center gap-2 text-white'>
                    <img
                        src={logoUrl}
                        className='w-21 md:w-25.75'
                        alt='chill logo'
                    />
                </Link>
                <p className='text-text-light-secondary text-sm md:text-lg'>
                    @2023 Chill All Rights Reserved.
                </p>
            </div>

            {/* View Desktop: Genre */}
            <div className="hidden lg:block text-white">
                <h3 className='font-bold text-lg mb-3'>Genre</h3>
                <ul className="text-text-light-secondary grid grid-cols-4 grid-rows-4 grid-flow-col gap-x-7 gap-y-3">
                    {genreList.map((item, index) => (
                        <li key={index} className='hover:text-blue-500 transition-colors cursor-pointer text-nowrap'>
                            <Link to={`/genre/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* View Mobile: Genre */}
            <div className="block lg:hidden">
                <div
                    className='text-white mb-3 flex justify-between items-center cursor-pointer lg:cursor-default'
                    onClick={() => setIsGenreOpen(!isGenreOpen)}>
                    <h3 className='font-bold text-lg'>Genre</h3>
                    {isGenreOpen ? <MdKeyboardArrowDown className='lg:hidden' /> : <MdKeyboardArrowRight className='lg:hidden' />}
                </div>

                <ul className={`${isGenreOpen ? "grid grid-cols-2 gap-4" : "hidden"} lg:grid lg:grid-cols-4 gap-x-6 gap-y-3 text-text-light-secondary`}>
                    {genreList.map((item, index) => (
                        <li key={index} className='hover:text-blue-500 transition-colors cursor-pointer'>
                            <Link to={`/genre/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* View Mobile: Bantuan */}
            <div className='mt-4 lg:mt-0'>
                <div
                    className='text-white mb-3 flex justify-between items-center cursor-pointer lg:cursor-default'
                    onClick={() => setIsHelpOpen(!isHelpOpen)}>
                    <h3 className='font-bold text-lg'>Bantuan</h3>
                    {isHelpOpen ? <MdKeyboardArrowDown className='lg:hidden' /> : <MdKeyboardArrowRight className='lg:hidden' />}
                </div>

                <ul className={`${isHelpOpen ? "flex" : "hidden"} lg:flex flex-col gap-3 text-text-light-secondary`}>
                    {helps.map((item, index) => (
                        <li key={index} className='hover:text-blue-500 transition-colors cursor-pointer'>
                            <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    );
};
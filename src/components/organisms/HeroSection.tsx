import { useMemo, useState } from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { MdVolumeUp, MdVolumeOff } from "react-icons/md";
import { genreList } from '../../const/genre';
import { type Movie } from '../../const/movies';
import { IoChevronDown } from 'react-icons/io5';
import { IoMdInformationCircleOutline } from 'react-icons/io';
import { PopupDetail } from './PopupDetail';
import { Link, useLocation } from 'react-router-dom';
import { useMovieStore } from '../../store/useMovieStore';

const fallbackData: Movie = {
    id: "0",
    type: "movie",
    title: "Selamat Datang di CHILL",
    year: 2026,
    trailerUrl: "/assets/trailer/trailer.mp4",
    thumbnail: "/assets/images/default-hero.jpg",
    thumbnailLandscape: "/assets/images/default-hero.jpg",
    rating: 5,
    ageRating: "SU",
    duration: 0,
    genres: [],
    casts: [],
    creators: [],
    description: "Nikmati ribuan film dan series eksklusif hanya untukmu. Masuk atau daftar sekarang untuk mulai menonton konten favorit di mana saja."
};

interface HeroSectionProps {
    withGenre?: boolean;
    movie?: Movie;
}

export const HeroSection = ({ withGenre, movie }: HeroSectionProps) => {
    const [mutedVideo, setMutedVideo] = useState(true);
    const [detailSeriesDialog, setDetailSeriesDialog] = useState(false);

    const movies = useMovieStore((state) => state.movies);

    const location = useLocation();
    const pathname = location.pathname.toLowerCase();

    const heroData = useMemo(() => {
        if (movie) return movie;

        if (!movies || movies.length === 0) return fallbackData;

        if (pathname.includes('series')) {
            return movies.find(m => m.type === 'series') || movies[0];
        } 
        
        if (pathname.includes('movies')) {
            return movies.find(m => m.type === 'movie') || movies[0];
        }

        return movies[0];
    }, [pathname, movies, movie]);

    return (
        <>
            <section className='relative w-full h-75 md:h-100 lg:h-146.75 flex flex-col justify-end text-white overflow-hidden'>
                {/* Video Background */}
                <video
                    key={heroData.trailerUrl}
                    className='absolute top-0 left-0 w-full h-full object-cover z-0'
                    autoPlay
                    loop
                    muted={mutedVideo}
                    playsInline
                >
                    <source src={heroData.trailerUrl} type="video/mp4" />
                </video>

                <div className='absolute z-20 w-full bottom-5 md:bottom-10 lg:bottom-14 left-0 px-6 md:px-10 lg:px-20 flex flex-col gap-3 lg:gap-10'>
                    {/* Genre Selector */}
                    {withGenre && (
                        <div>
                            <DropdownMenu.Root>
                                <DropdownMenu.Trigger className="bg-other-paper rounded-lg py-2 px-5 hidden sm:flex items-center justify-center font-bold text-text-light-primary gap-2 group outline-none">
                                    Genre <IoChevronDown className="size-5 transition-transform group-data-[state=closed]:rotate-180 group-data-[state=open]:rotate-0" />
                                </DropdownMenu.Trigger>

                                <DropdownMenu.Portal>
                                    <DropdownMenu.Content
                                        align="start"
                                        sideOffset={10}
                                        className="bg-other-paper text-text-light-primary text-sm font-medium min-w-98 rounded-lg shadow-md z-50 max-h-100 overflow-y-auto grid grid-cols-2 p-2 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95"
                                    >
                                        {genreList.map((genre, index) => (
                                            <DropdownMenu.Item
                                                key={index}
                                                asChild
                                                className="hover:bg-other-extra transition-all duration-300 py-2 px-3 rounded cursor-pointer outline-none focus:bg-other-extra"
                                            >
                                                <Link to={`/genre/${genre.toLowerCase().replace(/\s+/g, '-')}`}>
                                                    {genre}
                                                </Link>
                                            </DropdownMenu.Item>
                                        ))}
                                    </DropdownMenu.Content>
                                </DropdownMenu.Portal>
                            </DropdownMenu.Root>
                        </div>
                    )}

                    {/* Content Info Dinamis */}
                    <div className='flex flex-col items-start gap-3 lg:gap-5 md:max-w-125 lg:max-w-167'>
                        <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold'>
                            {heroData.title}
                        </h1>
                        <p className='text-xs md:text-lg line-clamp-2 lg:line-clamp-none font-medium'>
                            {heroData.description}
                        </p>
                    </div>

                    {/* Actions & Mute Button */}
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-2 lg:gap-4'>
                            <button className='border text-white rounded-3xl text-xs md:text-lg cursor-pointer flex justify-center items-center transition-all duration-200 active:scale-95 bg-primary-300 border-transparent font-bold py-2 px-3 md:py-3.5 md:px-5 hover:bg-blue-700 outline-none'>
                                Mulai
                            </button>
                            <button
                                onClick={() => setDetailSeriesDialog(true)}
                                className='text-white rounded-3xl text-xs md:text-lg cursor-pointer flex justify-center items-center transition-all duration-200 active:scale-95 bg-other-paper border-border-subtle font-semibold py-2 px-3 md:py-3.5 md:px-5 hover:bg-gray-800 gap-2 outline-none'
                            >
                                <IoMdInformationCircleOutline className="shrink-0 grow-0 text-xl" />
                                <span>Selengkapnya</span>
                            </button>
                            <span className='bg-transparent border border-secondary size-9 md:size-13 flex items-center justify-center text-xs md:text-lg aspect-square rounded-full font-bold'>
                                {heroData.ageRating}
                            </span>
                        </div>

                        <button
                            onClick={() => setMutedVideo((prev) => !prev)}
                            className='bg-transparent border border-secondary size-9 md:size-13 flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95 aspect-square rounded-full outline-none'
                            aria-label={mutedVideo ? "Unmute video" : "Mute video"}
                        >
                            {mutedVideo ? <MdVolumeOff className='text-lg md:text-2xl shrink-0 grow-0' /> : <MdVolumeUp className='text-lg md:text-2xl shrink-0 grow-0' />}
                        </button>
                    </div>
                </div>

                {/* Overlay Gradient */}
                <div className="absolute inset-0 w-[calc(100%+20px)] h-[calc(100%+20px)] bg-linear-to-t from-other-page-header from-10% via-[#101213db] via-60% to-transparent to-100% z-10 pointer-events-none"></div>
            </section>

            <PopupDetail
                movieId={heroData.id}
                open={detailSeriesDialog}
                onOpenChange={setDetailSeriesDialog}
            />
        </>
    );
};
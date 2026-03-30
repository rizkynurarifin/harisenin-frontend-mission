import { IoMdPlay, IoMdCheckmark } from 'react-icons/io';
import { MdOutlineKeyboardArrowDown, MdStar } from 'react-icons/md';
import type { Movie } from '../../const/movies';
import { MovieBadge } from '../atoms/MovieBadge';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface MovieCardProps {
    movie: Movie;
    variant?: 'landscape' | 'portrait';
}

export const MovieCard = ({ movie, variant = 'landscape' }: MovieCardProps) => {
    const {
        type,
        title,
        thumbnail,
        thumbnailLandscape,
        rating,
        ageRating,
        totalEpisodes,
        duration,
        genres,
        isNewEpisode,
        isPremium,
        isTop10,
        progress: movieProgress
    } = movie;

    const navigate = useNavigate();

    const isLandscape = variant === 'landscape';
    const previewImage = thumbnailLandscape || thumbnail;

    const currentEpisode = movie.type === 'series'
        ? (movie.episodes.find(ep => ep.id === movie.lastWatchedEpisodeId) || movie.episodes[0])
        : null;

    const displayTitle = type === 'series' ? currentEpisode?.title : "";

    const displayProgress = type === 'series'
        ? (currentEpisode?.progress || 0)
        : (movieProgress || 0);

    const displayDuration = type === 'series'
        ? (currentEpisode?.duration || "0 min")
        : (duration || "0 min");

    const cardSizeClass = isLandscape
        ? 'w-full aspect-video'
        : 'w-full aspect-[2/3] object-cover';

    return (
        <article className={`relative text-white group z-10 hover:z-50 ${cardSizeClass}`}>
            <div className='w-full h-full relative'>
                <img
                    src={isLandscape ? (thumbnailLandscape || thumbnail) : thumbnail}
                    className='object-cover w-full h-full rounded md:rounded-lg'
                    alt={title}
                    loading='lazy'
                />

                {/* Judul & Rating di main card */}
                {isLandscape && (
                    <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 flex justify-between items-end bg-linear-to-t from-black/90 to-transparent rounded-b-lg">
                        <h6 className='text-sm lg:text-lg truncate mr-2 font-semibold'>{title}</h6>
                        <div className='flex items-center gap-1 shrink-0'>
                            <MdStar className="text-xs md:text-base" />
                            <span className='text-xs md:text-sm'>{rating}</span>
                        </div>
                    </div>
                )}

                {/* Badges */}
                <div className="absolute left-[4.78px] top-[4.78px] sm:left-2.5 sm:top-2.5 flex flex-col gap-[1.91px] sm:gap-1 z-10">
                    {isPremium && <MovieBadge type="premium" isLandscape={isLandscape} />}
                    {isNewEpisode && <MovieBadge type="new-episode" isLandscape={isLandscape} />}
                </div>

                {/* Top 10 Badge */}
                {isTop10 && <MovieBadge type="top-10" isLandscape={isLandscape} />}
            </div>

            {/* --- Hover Preview Card --- */}
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 hidden lg:block invisible group-hover:visible opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto'>
                <div className='bg-other-page-header rounded-2xl w-87.5 shadow-hover-card flex flex-col overflow-hidden'>
                    <img
                        src={previewImage}
                        className='w-full h-45 object-cover rounded-t-2xl'
                        alt={title}
                    />
                    <div className='flex flex-col justify-between flex-1 lg:gap-4 md:p-7 w-full'>
                        <div className='flex justify-between items-center'>
                            <div className='flex lg:gap-4'>
                                <button
                                    onClick={() => navigate(`/movie-player/${movie.id}`)}
                                    className='bg-white rounded-full p-2 cursor-pointer transition-all duration-200 active:scale-95'
                                >
                                    <IoMdPlay className='text-other-page-header lg:text-2xl' />
                                </button>
                                <button className='bg-other-page-header border p-2 rounded-full cursor-pointer transition-all duration-200 active:scale-95'>
                                    <IoMdCheckmark className='lg:text-2xl' />
                                </button>
                            </div>
                            <button className='bg-other-page-header border p-2 rounded-full cursor-pointer transition-all duration-200 active:scale-95'>
                                <MdOutlineKeyboardArrowDown className='lg:text-2xl' />
                            </button>
                        </div>

                        {/* Progress Section */}
                        {(displayProgress > 0) && isLandscape && (
                            <div className="flex flex-col gap-3 mt-2">
                                {type === 'series' && (
                                    <span className="font-bold lg:text-lg text-white text-left truncate">
                                        {displayTitle}
                                    </span>
                                )}

                                <div className="flex items-center gap-4">
                                    <div className="flex-1 bg-[#3D3D3D] h-1 rounded-full relative overflow-hidden">
                                        <div
                                            className="bg-blue-500 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${displayProgress}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-secondary text-sm whitespace-nowrap">
                                        {displayDuration}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Metadata untuk Portrait (Non-Landscape) */}
                        {!isLandscape && (
                            <div className='flex items-center justify-start lg:gap-4'>
                                <span className='bg-[#CDF1FF4D] text-secondary lg:text-lg font-bold lg:py-1 lg:px-3 px-2 rounded-3xl'>
                                    {ageRating}
                                </span>
                                <span className='font-bold lg:text-lg text-white'>
                                    {type === 'series' ? `${totalEpisodes} Episode` : duration}
                                </span>
                            </div>
                        )}

                        {/* Genres */}
                        <ul className='flex items-center justify-between w-full lg:text-lg text-secondary'>
                            {genres.map((genre, index) => (
                                <React.Fragment key={genre}>
                                    {index !== 0 && (
                                        <div className="flex items-center justify-center">
                                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                                                <circle cx="4.235" cy="4.211" r="4.211" fill="#C1C2C4" />
                                            </svg>
                                        </div>
                                    )}
                                    <li className="list-none whitespace-nowrap">{genre}</li>
                                </React.Fragment>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </article>
    );
};
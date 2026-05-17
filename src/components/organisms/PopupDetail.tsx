import * as Dialog from '@radix-ui/react-dialog';
import { useState, useRef, useMemo } from 'react';
import { BiCheck, BiPlus } from 'react-icons/bi';
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";
import { MovieBadge } from '../atoms/MovieBadge';
import { useAuthStore } from '../../store/useAuthStore';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/redux/store';

interface PopupDetailProps {
    movieId: string | number | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours > 0) {
        return remainingMinutes > 0 ? `${hours}j ${remainingMinutes}m` : `${hours}j`;
    }
    return `${remainingMinutes}m`;
};

export const PopupDetail = ({ movieId, open, onOpenChange }: PopupDetailProps) => {
    const { movies } = useSelector((state: RootState) => state.movieData);

    const [mutedVideo, setMutedVideo] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const user = useAuthStore((state) => state.user);
    const addToMyList = useAuthStore((state) => state.addToMyList);
    const removeFromMyList = useAuthStore((state) => state.removeFromMyList);

    const movie = useMemo(() => {
        return movies.find((m) => m.id === movieId);
    }, [movies, movieId]);

    const isInMyList = useMemo(() => {
        if (!user || !movie) return false;
        return user.myList?.some(id => id === movie.id) ?? false;
    }, [user, movie]);

    const handleToggleMyList = () => {
        if (!movie) return;
        if (!user) {
            alert("Silakan login terlebih dahulu untuk menambah ke Daftar Saya!");
            return;
        }

        if (isInMyList) {
            removeFromMyList(movie.id);
        } else {
            addToMyList(movie.id);
        }
    };

    const recommendations = useMemo(() => {
        if (!movie) return [];
        return movies
            .filter((m) => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
            .slice(0, 3);
    }, [movies, movie]);

    if (!movie) return null;

    const {
        title,
        year,
        trailerUrl,
        thumbnailLandscape,
        description,
        ageRating,
        genres,
        casts,
        creators,
        duration,
        totalEpisodes,
        episodes,
        isPremium,
        type
    } = movie;

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className='data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/60 duration-100 backdrop-blur-xs fixed inset-0 isolate z-70' />
                <Dialog.Content className='bg-other-page-header data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 flex flex-col max-w-[calc(100%-2rem)] rounded-sm md:rounded-2xl duration-100 sm:max-w-233.25 fixed top-1/2 left-1/2 z-70 w-full -translate-x-1/2 -translate-y-1/2 outline-none overflow-hidden'>

                    <Dialog.Title className='sr-only'>{title} - Detail</Dialog.Title>
                    <Dialog.Description className='sr-only'>{description}</Dialog.Description>

                    <Dialog.Close className='size-8 md:size-10 rounded-full flex items-center justify-center bg-other-page-header text-text-light-primary absolute top-3 right-3 md:top-5 md:right-5 z-70 cursor-pointer outline-none transition-colors border border-white/10 hover:bg-white/10'>
                        <RxCross2 className='size-5 md:size-6' />
                    </Dialog.Close>

                    <div className='max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-hide'>
                        <section className='relative w-full h-75 lg:h-100 flex flex-col justify-end text-white bg-other-page-header'>
                            <video
                                key={trailerUrl}
                                ref={videoRef}
                                className='absolute w-full h-full inset-0 object-cover z-0'
                                autoPlay
                                loop
                                muted={mutedVideo}
                                playsInline
                            >
                                <source src={trailerUrl} type="video/mp4" />
                            </video>

                            <div className='absolute z-20 w-full bottom-5 md:bottom-10 lg:bottom-14 left-0 px-5 md:px-10 lg:px-20 flex flex-col gap-2 lg:gap-6'>
                                <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold'>{title}</h1>

                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-2 lg:gap-4'>
                                        <button className='bg-primary-300 border-transparent text-white rounded-3xl text-sm md:text-lg font-bold py-1.5 px-6 md:py-2.5 md:px-10 cursor-pointer transition-all active:scale-95'>
                                            Mulai
                                        </button>
                                        <button
                                            onClick={handleToggleMyList}
                                            className="bg-transparent border border-secondary py-1 px-1 md:py-2.5 md:px-2.5 rounded-full shrink-0 grow-0 size-8 md:size-11 flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95 outline-none"
                                        >
                                            {isInMyList ?
                                                <BiCheck className="text-lg md:text-2xl shrink-0 grow-0 text-white" /> :
                                                <BiPlus className="text-lg md:text-2xl shrink-0 grow-0 text-white" />
                                            }
                                        </button>
                                        {isPremium && (
                                            <MovieBadge type="premium" isLandscape={true} />
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setMutedVideo((prev) => !prev)}
                                        className='bg-transparent border border-secondary py-1 px-1 md:py-2.5 md:px-2.5 rounded-full shrink-0 grow-0 size-8 md:size-11 flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95 outline-none'
                                    >
                                        {mutedVideo ? <MdVolumeOff className='text-lg md:text-2xl shrink-0 grow-0' /> : <MdVolumeUp className='text-lg md:text-2xl shrink-0 grow-0' />}
                                    </button>
                                </div>
                            </div>
                            <div className="absolute inset-0 w-full h-full bg-linear-to-t from-other-page-header from-5% via-[#0C0D0E]/60 via-45% to-transparent to-60% z-10 pointer-events-none"></div>
                        </section>

                        <div className='bg-other-page-header pt-1 z-10'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-text-light-secondary px-5 py-2.5 lg:px-20 lg:py-6'>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-1.25 lg:gap-4 lg:py-1 font-semibold text-xs md:text-sm lg:text-base'>
                                        <p>{year}</p>
                                        <p>
                                            {type === 'series'
                                                ? `${totalEpisodes} Episode`
                                                : formatDuration(duration)
                                            }
                                        </p>
                                        <div className='shrink-0 grow-0 size-6 lg:size-10 rounded-full border border-text-light-secondary flex items-center justify-center text-[10px] lg:text-sm font-bold'>
                                            {ageRating}
                                        </div>
                                    </div>
                                    <p className='text-text-light-primary leading-relaxed text-xs md:text-sm lg:text-base'>
                                        {description}
                                    </p>
                                </div>

                                <div className='sm:p-2.5 text-xs md:text-sm lg:text-base'>
                                    <table className="w-full border-separate border-spacing-y-2">
                                        <tbody className="align-top">
                                            <tr>
                                                <td className="w-[1%] whitespace-nowrap text-secondary">Cast</td>
                                                <td className='text-text-light-primary px-2'>:</td>
                                                <td className='text-text-light-primary'>
                                                    {casts.join(', ')}
                                                    {casts.length > 4 && ', dan lain-lain'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="w-[1%] whitespace-nowrap text-secondary">Genre</td>
                                                <td className='text-text-light-primary px-2'>:</td>
                                                <td className='text-text-light-primary'>{genres.join(', ')}</td>
                                            </tr>
                                            <tr>
                                                <td className="w-[1%] whitespace-nowrap text-secondary">Pembuat Film</td>
                                                <td className='text-text-light-primary px-2'>:</td>
                                                <td className='text-text-light-primary'>{creators.join(', ')}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className='px-5 py-2.5 lg:px-20 lg:py-6'>
                                {type === 'series' ? (
                                    // TAMPILAN JIKA SERIES (EPISODE)
                                    <>
                                        {episodes && episodes.length > 0 && (
                                            <>
                                                <h3 className='font-bold text-xs lg:text-2xl text-text-light-primary mb-4 lg:mb-7'>Episode</h3>
                                                <div className='grid grid-cols-1'>
                                                    {episodes.map((episode) => (
                                                        <article key={episode.id} className='grid grid-cols-[20px_100px_1fr] lg:grid-cols-[30px_170px_1fr] gap-2 lg:gap-6 items-center rounded-sm py-1.5 md:py-4 px-2 md:px-6 transition-colors duration-300 hover:bg-greyscale-800 cursor-pointer group'>
                                                            <p className='font-semibold text-text-light-primary text-mini md:text-base lg:text-lg'>{episode.episodeNumber}</p>
                                                            <div className='relative rounded-sm aspect-video overflow-hidden'>
                                                                <img
                                                                    src={episode.thumbnail || thumbnailLandscape}
                                                                    alt={episode.title}
                                                                    className='absolute w-full h-full inset-0 object-cover group-hover:scale-105 transition-transform duration-500'
                                                                />
                                                                {episode.progress !== undefined && episode.progress > 0 && (
                                                                    <div className='absolute bottom-0 left-0 h-1 bg-[#FF0000] z-10' style={{ width: `${episode.progress}%` }} />
                                                                )}
                                                            </div>
                                                            <div className='space-y-1 lg:space-y-2'>
                                                                <div className='flex items-center justify-between font-semibold text-mini md:text-lg text-text-light-primary'>
                                                                    <h4 className="line-clamp-1">{episode.title}</h4>
                                                                    <p className='text-mini md:text-sm shrink-0 ml-2'>{formatDuration(episode.duration || 0)}</p>
                                                                </div>
                                                                <p className='text-text-light-secondary line-clamp-1 lg:line-clamp-2 text-mini md:text-sm lg:text-base'>
                                                                    {episode.description || description}
                                                                </p>
                                                            </div>
                                                        </article>
                                                    ))}
                                                </div>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    // TAMPILAN JIKA MOVIE (REKOMENDASI SERUPA)
                                    <>
                                        <h3 className='font-bold text-xs lg:text-2xl text-text-light-primary mb-4 lg:mb-7'>Rekomendasi Serupa</h3>
                                        <div className='grid grid-cols-3 gap-2 md:gap-4 lg:gap-7'>
                                            {recommendations.map((rec) => (
                                                <div
                                                    key={rec.id}
                                                    className="relative group cursor-pointer overflow-hidden rounded-md aspect-2/3 bg-greyscale-900"
                                                >
                                                    <img
                                                        src={rec.thumbnail}
                                                        alt={rec.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    {rec.isTop10 && (
                                                        <div className="absolute top-0 right-0 p-1 lg:p-2">
                                                            <MovieBadge type="top-10" isLandscape={false} />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
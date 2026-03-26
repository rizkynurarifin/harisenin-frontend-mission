import * as Dialog from '@radix-ui/react-dialog';
import { useState, useRef } from 'react';
import { BiPlus } from 'react-icons/bi';
import { MdVolumeOff, MdVolumeUp } from 'react-icons/md';
import { RxCross2 } from "react-icons/rx";
import { MovieBadge } from '../atoms/MovieBadge';

interface PopupDetailProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    isPremium?: boolean;
}

export const PopupDetail = ({ open, onOpenChange, isPremium }: PopupDetailProps) => {
    const [mutedVideo, setMutedVideo] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <Dialog.Root open={open} onOpenChange={onOpenChange}>
            <Dialog.Portal>
                <Dialog.Overlay className='data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 bg-black/60 duration-100 backdrop-blur-xs fixed inset-0 isolate z-70' />
                <Dialog.Content className='bg-other-page-header data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 grid max-w-[calc(100%-2rem)] rounded-sm md:rounded-2xl duration-100 sm:max-w-[933px] fixed top-1/2 left-1/2 z-70 w-full -translate-x-1/2 -translate-y-1/2 outline-none overflow-hidden'>

                    <Dialog.Title className='sr-only'>Happiness - Detail Seri</Dialog.Title>
                    <Dialog.Description className='sr-only'>
                        Informasi detail mengenai serial Happiness, daftar episode, dan pemeran.
                    </Dialog.Description>

                    <Dialog.Close className='size-4 md:size-8 rounded-full flex items-center justify-center bg-other-page-header text-text-light-primary absolute top-2 right-2 md:top-5 md:right-5 z-70 cursor-pointer outline-none'>
                        <RxCross2 className='size-4 md:size-5' />
                    </Dialog.Close>

                    <div className='max-h-[90vh] overflow-y-auto'>
                        <section className='relative w-full h-[300px] lg:h-[400px] flex flex-col justify-end text-white bg-other-page-header'>
                            <video
                                ref={videoRef}
                                className='absolute w-full h-full object-cover z-0'
                                autoPlay
                                loop
                                muted={mutedVideo}
                                playsInline
                            >
                                <source src="/trailer.mp4" type="video/mp4" />
                            </video>

                            <div className='absolute z-20 w-full bottom-5 md:bottom-10 lg:bottom-14 left-0 px-5 md:px-10 lg:px-20 flex flex-col gap-2 lg:gap-6'>
                                <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold'>Ted Lasso</h1>

                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-2 lg:gap-4'>
                                        <button className='bg-primary-300 border-transparent text-white rounded-3xl text-sm md:text-lg font-bold py-1.5 px-6 md:py-2.5 md:px-10 cursor-pointer transition-all active:scale-95'>
                                            Mulai
                                        </button>
                                        <button
                                            aria-label="Tambah ke daftar saya"
                                            className='bg-transparent border border-secondary py-1 px-1 md:py-2.5 md:px-2.5 rounded-full shrink-0 grow-0 size-8 md:size-11 flex items-center justify-center cursor-pointer transition-all duration-200 active:scale-95 outline-none'
                                        >
                                            <BiPlus className='text-lg md:text-2xl shrink-0 grow-0 text-white' />
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
                            <div className="absolute inset-0 w-full h-full bg-linear-to-t from-other-page-header from-10% via-[#101213db] via-60% to-transparent to-100% z-10 pointer-events-none"></div>
                        </section>

                        <div className='bg-other-page-header pt-1 z-10'>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-text-light-secondary px-5 py-2.5 lg:px-20 lg:py-6'>
                                <div className='grid gap-1'>
                                    <div className='flex items-center gap-1.25 lg:gap-4 lg:py-1 font-semibold text-xs md:text-sm lg:text-base'>
                                        <p>2020</p>
                                        <p>10 episode</p>
                                        <div className='shrink-0 grow-0 size-5 text-[8px] text-sm lg:text-base md:size-10 rounded-full border border-text-light-secondary flex items-center justify-center'>
                                            16+
                                        </div>
                                    </div>
                                    <p className='text-text-light-primary leading-relaxed text-xs md:text-sm lg:text-base'>Pelatih sepak bola perguruan tinggi Amerika Ted Lasso pergi ke London untuk mengelola AFC Richmond, tim sepak bola Liga Utama Inggris yang kesulitan.</p>
                                </div>

                                <div className='sm:p-2.5 text-xs md:text-sm lg:text-base'>
                                    <table className="w-full">
                                        <tbody className="align-top">
                                            <tr>
                                                <td className="w-[1%] whitespace-nowrap">Cast</td>
                                                <td className='text-text-light-primary px-2'>:</td>
                                                <td className='text-text-light-primary'>Mason Sudeikis, Brett Goldstein, Brendan Hunt, Nick Mohammed, dan lain-lain</td>
                                            </tr>
                                            <tr>
                                                <td className="w-[1%] whitespace-nowrap">Genre</td>
                                                <td className='text-text-light-primary px-2'>:</td>
                                                <td className='text-text-light-primary'>Komedi, Drama, Olahraga</td>
                                            </tr>
                                            <tr>
                                                <td className='w-[1%] whitespace-nowrap'>Pembuat Film</td>
                                                <td className='text-text-light-primary px-2'>:</td>
                                                <td className='text-text-light-primary'>Brendan Hunt, Joe Killy, Bill Lawrence</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className='px-5 py-2.5 lg:px-20 lg:py-6'>
                                <h3 className='font-bold text-xs lg:text-2xl text-text-light-primary mb-2 lg:mb-7'>Episode</h3>
                                <div className='grid grid-cols-1'>
                                    {[1, 2, 3, 4, 5, 6].map((episode) => (
                                        <article key={episode} className='grid grid-cols-[8px_70px_1fr] lg:grid-cols-[8px_170px_1fr] gap-2 lg:gap-6 items-center rounded-sm py-1.5 md:py-4 px-2 md:px-6 transition-colors duration-300 hover:bg-greyscale-800 cursor-pointer group'>
                                            <p className='font-semibold text-text-light-primary text-mini md:text-base'>{episode}</p>
                                            <div className='relative rounded-sm aspect-video overflow-hidden'>
                                                <img
                                                    src={`https://picsum.photos/seed/episode${episode}/302/162`}
                                                    alt={`Episode ${episode}`}
                                                    className='absolute w-full h-full inset-0 object-cover group-hover:scale-105 transition-transform duration-500'
                                                />
                                                {/* Progress Bar Logika */}
                                                <div className='absolute bottom-0 left-0 h-[3px] bg-[#FF0000]' style={{ width: `${(episode % 3) * 30}%`, display: (episode % 3) > 0 ? 'block' : 'none' }} />
                                            </div>
                                            <div className='space-y-1 lg:space-y-2'>
                                                <div className='flex items-center justify-between font-semibold text-mini md:text-lg text-text-light-primary'>
                                                    <h4 className="line-clamp-1">Trent Crimm: Independent</h4>
                                                    <p className='text-mini md:text-sm shrink-0 ml-2'>30 min</p>
                                                </div>
                                                <p className='text-text-light-secondary line-clamp-1 lg:line-clamp-2 text-mini md:text-sm font-normal'>It’s Ted’s first day of coaching, and fans aren’t happy. He makes little headway but remains undeterred as the team play their first match.</p>
                                            </div>
                                        </article>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
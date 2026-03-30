import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ControlButton } from '../atoms/ControlButton';
import { EpisodeAccordion } from './EpisodeAccordion';
import type { EpisodeDetail } from '../../const/movies';
import { ControlDropdown } from '../atoms/ControlDropdown';

interface ExtraControlsProps {
    type: 'movie' | 'series';
    episodes?: EpisodeDetail[];
}

export const ExtraControls = ({ type, episodes = [] }: ExtraControlsProps) => {

    const currentEpisodeId = episodes[0]?.id;
    const currentIndex = episodes.findIndex(ep => ep.id === currentEpisodeId);
    const nextEpisode = type === 'series' ? episodes[currentIndex + 1] : null;

    return (
        <div className="flex items-center gap-4">
            {/* Dropdown Next Episode */}
            {nextEpisode && (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <ControlButton>
                            <svg className='size-7 md:size-10' viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 21L16.9167 14L7 7M9.33333 11.5033L12.8683 14L9.33333 16.4967M18.6667 7H21V21H18.6667" fill="white" />
                            </svg>
                        </ControlButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content side='top' align="end" sideOffset={19} alignOffset={-140} className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-other-extra text-text-light-primary min-w-92 rounded-lg shadow-md duration-100 z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto data-[state=closed]:overflow-hidden">
                            <div className='font-bold flex items-center py-2 px-3'>
                                <h2>Episode Selanjutnya</h2>
                            </div>
                            <div className='bg-other-paper grid grid-cols-2 gap-3 px-3 py-3'>
                                <img
                                    src={nextEpisode.thumbnail}
                                    alt="Preview"
                                    className='object-cover rounded-sm w-full h-full'
                                />
                                <div className='text-sm'>
                                    <h3 className='mb-2 font-bold'>
                                        Episode {nextEpisode.episodeNumber}: {nextEpisode.title}
                                    </h3>
                                    <p className='line-clamp-3'>
                                        {nextEpisode.description}
                                    </p>
                                </div>
                            </div>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            )}

            {/* Dropdown Episode */}
            {type === 'series' && episodes.length > 0 && (
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <ControlButton>
                            <svg className='size-5 md:size-8' viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.16406 5.83333H24.4974V8.16667H8.16406V5.83333ZM8.16406 15.1667V12.8333H24.4974V15.1667H8.16406ZM4.66406 5.25C5.12819 5.25 5.57331 5.43437 5.9015 5.76256C6.22969 6.09075 6.41406 6.53587 6.41406 7C6.41406 7.46413 6.22969 7.90925 5.9015 8.23744C5.57331 8.56563 5.12819 8.75 4.66406 8.75C4.19993 8.75 3.75481 8.56563 3.42663 8.23744C3.09844 7.90925 2.91406 7.46413 2.91406 7C2.91406 6.53587 3.09844 6.09075 3.42663 5.76256C3.75481 5.43437 4.19993 5.25 4.66406 5.25ZM4.66406 12.25C5.12819 12.25 5.57331 12.4344 5.9015 12.7626C6.22969 13.0908 6.41406 13.5359 6.41406 14C6.41406 14.4641 6.22969 14.9092 5.9015 15.2374C5.57331 15.5656 5.12819 15.75 4.66406 15.75C4.19993 15.75 3.75481 15.5656 3.42663 15.2374C3.09844 14.9092 2.91406 14.4641 2.91406 14C2.91406 13.5359 3.09844 13.0908 3.42663 12.7626C3.75481 12.4344 4.19993 12.25 4.66406 12.25ZM8.16406 22.1667V19.8333H24.4974V22.1667H8.16406ZM4.66406 19.25C5.12819 19.25 5.57331 19.4344 5.9015 19.7626C6.22969 20.0908 6.41406 20.5359 6.41406 21C6.41406 21.4641 6.22969 21.9092 5.9015 22.2374C5.57331 22.5656 5.12819 22.75 4.66406 22.75C4.19993 22.75 3.75481 22.5656 3.42663 22.2374C3.09844 21.9092 2.91406 21.4641 2.91406 21C2.91406 20.5359 3.09844 20.0908 3.42663 19.7626C3.75481 19.4344 4.19993 19.25 4.66406 19.25Z" fill="white" />
                            </svg>
                        </ControlButton>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content side='top' align="end" sideOffset={19} alignOffset={-140} className="data-open:animate-in data-closed:animate-out data-closed:fade-out-0 data-open:fade-in-0 data-closed:zoom-out-95 data-open:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-other-extra text-text-light-primary min-w-92 rounded-lg shadow-md duration-100 z-50 max-h-(--radix-dropdown-menu-content-available-height) w-(--radix-dropdown-menu-trigger-width) origin-(--radix-dropdown-menu-content-transform-origin) overflow-x-hidden overflow-y-auto data-[state=closed]:overflow-hidden">
                            <div className='font-bold flex items-center gap-1 py-2 px-3'>
                                <svg className='size-7' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 11H6.83L10.41 7.41L9 6L3 12L9 18L10.41 16.58L6.83 13H21V11Z" fill="white" />
                                </svg>
                                <h2>Episode Selanjutnya</h2>
                            </div>
                            <EpisodeAccordion episodes={episodes} />
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            )}

            {/* Dropdown Terjemahan*/}
            <ControlDropdown
                width="w-[392px]"
                alignOffset={-95}
                triggerIcon={
                    <svg className='size-4 md:size-7' viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.334 2.3335C23.9528 2.3335 24.5463 2.57933 24.9839 3.01691C25.4215 3.4545 25.6673 4.04799 25.6673 4.66683V18.6668C25.6673 19.2857 25.4215 19.8792 24.9839 20.3167C24.5463 20.7543 23.9528 21.0002 23.334 21.0002H7.00065L2.33398 25.6668V4.66683C2.33398 3.37183 3.38398 2.3335 4.66732 2.3335H23.334ZM4.66732 4.66683V20.0318L6.03232 18.6668H23.334V4.66683H4.66732ZM7.00065 8.16683H21.0007V10.5002H7.00065V8.16683ZM7.00065 12.8335H17.5007V15.1668H7.00065V12.8335Z" fill="white" />
                    </svg>
                }
            >
                <div className="grid grid-cols-2">
                    {/* Kolom Audio */}
                    <div className="flex flex-col">
                        <p className="font-bold text-md py-2 px-3">Audio</p>

                        {/* Item Aktif dengan Border Kotak */}
                        <div className="flex items-center gap-1 py-2 px-3 cursor-pointer hover:bg-white/5 rounded">
                            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-sm">Bahasa Inggris</p>
                        </div>
                    </div>

                    {/* Kolom Terjemahan */}
                    <div className="flex flex-col">
                        <p className="font-bold text-md py-2 px-3">Terjemahan</p>

                        {/* Item Aktif Centang Biasa */}
                        <div className="flex items-center gap-1 py-2 px-3 cursor-pointer hover:bg-white/5 rounded">
                            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="text-sm text-white">Bahasa Indonesia</p>
                        </div>

                        {/* Item Tidak Aktif */}
                        <div className="flex items-center gap-1 py-2 px-3 cursor-pointer hover:bg-white/5 rounded">
                            <div className="size-5" />
                            <p className="text-sm text-text-light-disabled">Bahasa Inggris</p>
                        </div>
                    </div>
                </div>
            </ControlDropdown>

            {/* Dropdown Kecepatan */}
            <ControlDropdown
                width="w-[196px]"
                alignOffset={-50}
                triggerIcon={
                    <svg className='size-5 md:size-8' viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M13.9987 18.6667C13.0704 18.6667 12.1802 18.2979 11.5238 17.6415C10.8674 16.9852 10.4987 16.0949 10.4987 15.1667C10.4987 13.86 11.2104 12.7167 12.2487 12.1217L23.577 5.565L17.1254 16.7417C16.542 17.885 15.3637 18.6667 13.9987 18.6667ZM13.9987 3.5C16.1104 3.5 18.082 4.08333 19.797 5.04L17.347 6.45167C16.332 6.055 15.1654 5.83333 13.9987 5.83333C11.5233 5.83333 9.14937 6.81666 7.39903 8.567C5.6487 10.3173 4.66536 12.6913 4.66536 15.1667C4.66536 17.745 5.7037 20.0783 7.39536 21.7583H7.40703C7.86203 22.2133 7.86203 22.9483 7.40703 23.4033C6.95203 23.8583 6.20536 23.8583 5.75036 23.415C3.6387 21.3033 2.33203 18.3867 2.33203 15.1667C2.33203 12.0725 3.56119 9.10501 5.74912 6.91709C7.93704 4.72916 10.9045 3.5 13.9987 3.5ZM25.6654 15.1667C25.6654 18.3867 24.3587 21.3033 22.247 23.415C21.792 23.8583 21.057 23.8583 20.602 23.4033C20.147 22.9483 20.147 22.2133 20.602 21.7583C22.2937 20.0667 23.332 17.745 23.332 15.1667C23.332 14 23.1104 12.8333 22.702 11.7833L24.1137 9.33333C25.082 11.0833 25.6654 13.0433 25.6654 15.1667Z" fill="white" />
                    </svg>
                }
            >
                <div className="flex flex-col">
                    <p className="font-bold text-md py-2 px-3">Kecepatan</p>
                    {['0.5x', '0.75x', '1x (Normal)', '1.25x', '1.5x'].map((speed) => (
                        <button key={speed} className="px-3 py-2 text-left text-sm cursor-pointer hover:bg-white/5 rounded">
                            {speed}
                        </button>
                    ))}
                </div>
            </ControlDropdown>

            {/* Dropdown Fullscreen */}
            <ControlButton>
                <svg className='size-6 md:size-9' viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.83203 5.8335H11.6654V8.16683H8.16536V11.6668H5.83203V5.8335ZM16.332 5.8335H22.1654V11.6668H19.832V8.16683H16.332V5.8335ZM19.832 16.3335H22.1654V22.1668H16.332V19.8335H19.832V16.3335ZM11.6654 19.8335V22.1668H5.83203V16.3335H8.16536V19.8335H11.6654Z" fill="white" />
                </svg>
            </ControlButton>
        </div>
    );
};
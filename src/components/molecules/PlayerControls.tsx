import { IoMdPause } from "react-icons/io";
import { ControlButton } from "../atoms/ControlButton";
import { VolumeSlider } from "../atoms/VolumeSlider";

interface PlayerControlProps {
    isPlaying: boolean;
    handlePlayPause: () => void;
    onSeekBackward?: () => void;
    onSeekForward?: () => void;
    volume: number;
    isMuted: boolean;
    onVolumeChange: (volume: number) => void;
    onMuteToggle: () => void;
}

export const PlayerControls = ({
    isPlaying,
    handlePlayPause,
    onSeekBackward,
    onSeekForward,
    volume,
    isMuted,
    onVolumeChange,
    onMuteToggle,
}: PlayerControlProps) => {
    return (
        <div className="flex items-center gap-4 text-text-light-primary">
            {/* Icon Play */}
            <ControlButton onClick={handlePlayPause}>
                {isPlaying ? (
                    <div className="size-7 md:size-10 flex items-center justify-center">
                        <IoMdPause className="size-5 md:size-7" />
                    </div>
                ) : (
                    <svg className="size-7 md:size-10" viewBox="0 0 28 28" fill="none">
                        <path
                            d="M9.33398 5.99707V22.3304L22.1673 14.1637L9.33398 5.99707Z"
                            fill="white"
                        />
                    </svg>
                )}
            </ControlButton>

            {/* Icon Rewind */}
            <ControlButton onClick={onSeekBackward}>
                <svg className="size-5 md:size-8" viewBox="0 0 28 28" fill="none">
                    <path
                        d="M14.5833 3.5C20.0083 3.5 24.5933 7.035 26.215 11.9233L23.45 12.8333C22.225 9.11167 18.7133 6.41667 14.5833 6.41667C12.2967 6.41667 10.2317 7.25667 8.61 8.61L11.6667 11.6667H3.5V3.5L6.53333 6.53333C8.69167 4.66667 11.4917 3.5 14.5833 3.5ZM11.6667 14V25.6667H9.33333V16.3333H7V14H11.6667ZM21 16.3333V23.3333C21 24.6283 19.9617 25.6667 18.6667 25.6667H16.3333C15.7145 25.6667 15.121 25.4208 14.6834 24.9832C14.2458 24.5457 14 23.9522 14 23.3333V16.3333C14 15.7145 14.2458 15.121 14.6834 14.6834C15.121 14.2458 15.7145 14 16.3333 14H18.6667C19.9617 14 21 15.05 21 16.3333ZM16.3333 16.3333V23.3333H18.6667V16.3333H16.3333Z"
                        fill="white"
                    />
                </svg>
            </ControlButton>

            {/* Icon Forward */}
            <ControlButton onClick={onSeekForward}>
                <svg className="size-5 md:size-8" viewBox="0 0 28 28" fill="none">
                    <path
                        d="M11.6649 14V25.6667H9.33154V16.3333H6.9982V14H11.6649ZM20.9982 16.3333V23.3333C20.9982 24.6283 19.9599 25.6667 18.6649 25.6667H16.3315C15.7127 25.6667 15.1192 25.4208 14.6816 24.9832C14.244 24.5457 13.9982 23.9522 13.9982 23.3333V16.3333C13.9982 15.7145 14.244 15.121 14.6816 14.6834C15.1192 14.2458 15.7127 14 16.3315 14H18.6649C19.9599 14 20.9982 15.05 20.9982 16.3333ZM16.3315 16.3333V23.3333H18.6649V16.3333H16.3315ZM13.4149 3.5C16.5065 3.5 19.3065 4.66667 21.4649 6.53333L24.4982 3.5V11.6667H16.3315L19.3882 8.61C17.7665 7.25667 15.7015 6.41667 13.4149 6.41667C9.28487 6.41667 5.7732 9.11167 4.5482 12.8333L1.7832 11.9233C3.40487 7.035 7.98987 3.5 13.4149 3.5Z"
                        fill="white"
                    />
                </svg>
            </ControlButton>

            {/* Volume Control */}
            <VolumeSlider
                volume={volume}
                isMuted={isMuted}
                onVolumeChange={onVolumeChange}
                onMuteToggle={onMuteToggle}
            />
        </div>
    );
};
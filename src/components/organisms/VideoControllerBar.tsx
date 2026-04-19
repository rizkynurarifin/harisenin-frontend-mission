import { PlayerControls } from "../molecules/PlayerControls";
import type { EpisodeDetail } from "../../const/movies";
import { ExtraControls } from "../molecules/ExtraControls";
import { SeekBar } from "../atoms/SeekBar";

const formatTime = (seconds: number): string => {
    if (!isFinite(seconds) || seconds < 0) return "0:00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
};

interface VideoControllerBarProps {
    title: string;
    type: "movie" | "series";
    episodes?: EpisodeDetail[];
    isDisabled?: boolean;
    isPlaying: boolean;
    handlePlayPause: () => void;
    onSeekBackward?: () => void;
    onSeekForward?: () => void;
    playbackRate: number;
    onPlaybackRateChange: (rate: number) => void;
    volume: number;
    isMuted: boolean;
    onVolumeChange: (volume: number) => void;
    onMuteToggle: () => void;
    played: number;
    buffered: number;
    duration: number;
    onSeekStart: () => void;
    onSeeking: (fraction: number) => void;
    onSeekEnd: (fraction: number) => void;
    className?: string;
    isFullscreen?: boolean;
    onToggleFullscreen?: () => void;
    onDropdownOpen?: () => void;
    onDropdownClose?: () => void;
    fullscreenContainer?: HTMLElement | null;
}

export const VideoControllerBar = ({
    title,
    type,
    episodes = [],
    isDisabled,
    isPlaying,
    handlePlayPause,
    onSeekBackward,
    onSeekForward,
    playbackRate,
    onPlaybackRateChange,
    volume,
    isMuted,
    onVolumeChange,
    onMuteToggle,
    played,
    buffered,
    duration,
    onSeekStart,
    onSeeking,
    onSeekEnd,
    className,
    isFullscreen,
    onToggleFullscreen,
    onDropdownOpen,
    onDropdownClose,
    fullscreenContainer,
}: VideoControllerBarProps) => {
    return (
        <div
            className={`
            fixed bottom-0 w-full bg-other-page-header/60 z-40
            flex flex-col
            transition-all duration-300
            ${isDisabled ? "opacity-50 pointer-events-none" : "opacity-100"}
            ${className ? className : ""}
        `}
        >
            <SeekBar
                played={played}
                buffered={buffered}
                duration={duration}
                onSeekStart={onSeekStart}
                onSeeking={onSeeking}
                onSeekEnd={onSeekEnd}
                className="px-2"
            />

            <div className="flex items-center justify-between px-7 gap-4 h-12.5 md:h-16.5">
                {/* PlayerControls (Play, Rewind, Forward, Volume) */}
                <PlayerControls
                    isPlaying={isPlaying}
                    handlePlayPause={handlePlayPause}
                    onSeekBackward={onSeekBackward}
                    onSeekForward={onSeekForward}
                    volume={volume}
                    isMuted={isMuted}
                    onVolumeChange={onVolumeChange}
                    onMuteToggle={onMuteToggle}
                />

                <div className="flex flex-col items-center gap-0.5">
                    <span className="text-xs text-white/70 font-mono tabular-nums">
                        {formatTime(played * duration)}/{formatTime(duration)}
                    </span>
                    <h1 className="font-medium md:font-semibold text-sm text-center text-text-light-primary">
                        {title}
                    </h1>
                </div>

                {/* ExtraControls (Episodes, Subtitles, Speed, Fullscreen) */}
                <ExtraControls
                    type={type}
                    episodes={episodes}
                    playbackRate={playbackRate}
                    onPlaybackRateChange={onPlaybackRateChange}
                    isFullscreen={isFullscreen}
                    onToggleFullscreen={onToggleFullscreen}
                    onDropdownOpen={onDropdownOpen}
                    onDropdownClose={onDropdownClose}
                    fullscreenContainer={fullscreenContainer}
                />
            </div>
        </div>
    );
};
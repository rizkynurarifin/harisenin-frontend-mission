import { useParams, useNavigate, Link } from 'react-router-dom';
import { VideoControllerBar } from '../components/organisms/VideoControllerBar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PremiumOverlay } from '../components/organisms/PremiumOverlay';
import { useAuthStore } from '../store/useAuthStore';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../store/redux/store';
import { fetchMovies } from '../store/redux/movieSlice';
import { useFullscreen } from '../hooks/useFullscreen';
import { useIdleTimer } from '../hooks/useIdleTimer';
import ReactPlayer from 'react-player';

export const MoviePlayer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // --- State Media ---
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [played, setPlayed] = useState(0);
    const [, setPlayedSeconds] = useState(0);
    const [duration, setDuration] = useState(0);
    const [buffered, setBuffered] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isSeeking, setIsSeeking] = useState(false);

    // --- Refs & Fullscreen ---
    const playerRef = useRef<HTMLVideoElement | null>(null);
    const { isFullscreen, toggleFullscreen, containerRef } = useFullscreen();
    const [fullscreenContainer, setFullscreenContainer] = useState<HTMLElement | null>(null);

    // --- Data Fetching (Your Code) ---
    const { movies, isLoading } = useSelector((state: RootState) => state.movieData);
    const isUserPremium = useAuthStore((state) => state.user?.isPremium ?? false);

    useEffect(() => {
        if (movies.length === 0) {
            dispatch(fetchMovies());
        }
    }, [dispatch, movies.length]);

    useEffect(() => {
        setFullscreenContainer(containerRef.current);
    }, [containerRef]);

    const movie = useMemo(() => {
        return movies.find((m) => m.id === id);
    }, [movies, id]);

    // --- Logic Helpers ---
    const isPremiumOnly = movie?.isPremium && !isUserPremium;
    const hasTrailer = !!movie?.trailerUrl;
    const episodesData = movie?.type === 'series' ? movie.episodes : [];

    const { isIdle, pauseTimer, resumeTimer } = useIdleTimer({
        timeout: 3000,
        isEnabled: isFullscreen && !isPremiumOnly,
    });
    const controlsHidden = isFullscreen && isIdle;

    // --- Media Handlers (Merged Logic) ---
    const handleTogglePlay = () => {
        if (!movie || (movie.isPremium && !isUserPremium)) return;
        setIsPlaying((prev) => !prev);
    };

    useEffect(() => {
        const video = playerRef.current;
        if (!video) return;

        const handleBuffered = () => {
            if (
                video.buffered.length > 0 &&
                isFinite(video.duration) &&
                video.duration > 0
            ) {
                setBuffered(
                    video.buffered.end(video.buffered.length - 1) / video.duration,
                );
            }
        };

        video.addEventListener("progress", handleBuffered);
        return () => video.removeEventListener("progress", handleBuffered);
    }, []);

    const handleSeekBackward = () => {
        if (!playerRef.current) return;
        const newTime = Math.max(0, playerRef.current.currentTime - 10);
        playerRef.current.currentTime = newTime;
        setPlayedSeconds(newTime);
        if (
            isFinite(playerRef.current.duration) &&
            playerRef.current.duration > 0
        ) {
            setPlayed(newTime / playerRef.current.duration);
        }
    };

    const handleSeekForward = () => {
        if (!playerRef.current) return;
        const newTime = playerRef.current.currentTime + 10;
        playerRef.current.currentTime = newTime;
        setPlayedSeconds(newTime);
        if (
            isFinite(playerRef.current.duration) &&
            playerRef.current.duration > 0
        ) {
            setPlayed(newTime / playerRef.current.duration);
        }
    };

    const handlePlaybackRateChange = (rate: number) => {
        setPlaybackRate(rate);
    };

    const handleRateChange = () => {
        const player = playerRef.current;
        if (!player) return;

        setPlaybackRate(player.playbackRate);
    };

    const handleTimeUpdate = (
        e: React.SyntheticEvent<HTMLVideoElement, Event>,
    ) => {
        if (isSeeking) return;

        setPlayedSeconds(e.currentTarget.currentTime);
        setPlayed(e.currentTarget.currentTime / e.currentTarget.duration);
    };

    const handleMuteToggle = useCallback(() => {
        if (isMuted && volume === 0) {
            setVolume(0.5);
            if (playerRef.current) {
                playerRef.current.volume = 0.5;
            }
        }
        setIsMuted((prev) => !prev);
    }, [isMuted, volume]);

    const handleVolumeChange = useCallback(
        (newVolume: number) => {
            setVolume(newVolume);
            if (playerRef.current) {
                playerRef.current.volume = newVolume;
            }
            if (newVolume > 0 && isMuted) {
                setIsMuted(false);
            }
            if (newVolume === 0) {
                setIsMuted(true);
            }
        },
        [isMuted],
    );

    const handleSeekStart = useCallback(() => {
        setIsSeeking(true);
    }, []);

    const handleSeeking = useCallback(
        (fraction: number) => {
            setPlayed(fraction);
            setPlayedSeconds(fraction * duration);
        },
        [duration],
    );

    const handleSeekEnd = useCallback((fraction: number) => {
        if (!playerRef.current) return;
        const newTime = fraction * playerRef.current.duration;
        playerRef.current.currentTime = newTime;
        setPlayed(fraction);
        setPlayedSeconds(newTime);
        setIsSeeking(false);
    }, []);

    if (isLoading && movies.length === 0) {
        return (
            <div className="bg-black h-screen flex items-center justify-center text-white">
                <p className="animate-pulse">Memuat konten...</p>
            </div>
        );
    }

    if (!movie) {
        return (
            <div className="bg-black h-screen flex flex-col items-center justify-center text-white">
                <p className="mb-4 font-medium text-lg">Maaf, konten tidak tersedia.</p>
                <Link
                    to="/"
                    className="bg-primary-300 px-6 py-2 rounded-full hover:bg-blue-700 transition-all active:scale-95"
                >
                    Kembali ke Beranda
                </Link>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className={`min-h-dvh w-full relative ${controlsHidden ? "cursor-none" : "cursor-default"}`}
        >
            {/* 1. Overlay Premium */}
            {isPremiumOnly && <PremiumOverlay />}

            {/* 2. Media Layer */}
            <div
                className={`absolute inset-0 z-0 transition-all duration-700 ${isPremiumOnly ? "blur-md brightness-50" : ""}`}
                onClick={() => {
                    if (!isPremiumOnly && hasTrailer) handleTogglePlay();
                }}
            >
                {hasTrailer ? (
                    <ReactPlayer
                        ref={playerRef}
                        src={movie.trailerUrl}
                        playing={isPlaying}
                        muted={isMuted}
                        controls={false}
                        playbackRate={playbackRate}
                        volume={volume}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                        onRateChange={handleRateChange}
                        onTimeUpdate={(e) => handleTimeUpdate(e)}
                        onLoadedMetadata={() => {
                            if (playerRef.current) {
                                playerRef.current.playbackRate = playbackRate;
                                playerRef.current.volume = volume;
                                if (isFinite(playerRef.current.duration)) {
                                    setDuration(playerRef.current.duration);
                                }
                            }
                        }}
                    />
                ) : (
                    <img
                        src={movie.thumbnailLandscape}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* 3. Tombol Back */}
            <button
                type="button"
                onClick={() => navigate(-1)}
                className={`absolute top-5 left-5 z-50 text-white flex items-center gap-2 hover:text-primary active:scale-95 back-action transition-all duration-300 ${controlsHidden ? "opacity-0 -translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"}`}
            >
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-semibold">Kembali</span>
            </button>

            {/* 4. Tombol Play/Pause */}
            {hasTrailer && !isPlaying && !isPremiumOnly && (
                <div
                    className={`absolute inset-0 flex items-center justify-center z-10 cursor-pointer play-action transition-all duration-300 ${controlsHidden ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleTogglePlay();
                    }}
                >
                    <svg className='size-20 opacity-90' viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" stroke="white" strokeWidth="2" fill="black/20" />
                        <path d="M40 35L70 50L40 65V35Z" fill="white" />
                    </svg>
                </div>
            )}

            {/* 5. Controller Bar */}
            <VideoControllerBar
                title={movie.title}
                type={movie.type}
                episodes={episodesData}
                isDisabled={isPremiumOnly}
                isPlaying={isPlaying}
                handlePlayPause={handleTogglePlay}
                onSeekBackward={handleSeekBackward}
                onSeekForward={handleSeekForward}
                playbackRate={playbackRate}
                onPlaybackRateChange={handlePlaybackRateChange}
                volume={volume}
                isMuted={isMuted}
                onVolumeChange={handleVolumeChange}
                onMuteToggle={handleMuteToggle}
                played={played}
                buffered={buffered}
                duration={duration}
                onSeekStart={handleSeekStart}
                onSeeking={handleSeeking}
                onSeekEnd={handleSeekEnd}
                isFullscreen={isFullscreen}
                onToggleFullscreen={toggleFullscreen}
                onDropdownOpen={pauseTimer}
                onDropdownClose={resumeTimer}
                fullscreenContainer={fullscreenContainer}
                className={`group-actions transition-all duration-300 ${controlsHidden ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"}`}
            />
        </div>
    );
};
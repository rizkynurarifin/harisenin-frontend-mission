import { useParams, useNavigate, Link } from 'react-router-dom';
import { ALL_CONTENT } from '../const/movies';
import { VideoControllerBar } from '../components/organisms/VideoControllerBar';
import { useRef, useState } from 'react';
import { PremiumOverlay } from '../components/organisms/PremiumOverlay';
import { useAuthStore } from '../store/useAuthStore';

export const MoviePlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(true);
    const isUserPremium = useAuthStore((state) => state.user?.isPremium ?? false);

    const movie = ALL_CONTENT[Number(id)];

    if (!movie) {
        return (
            <div className="bg-black h-screen flex flex-col items-center justify-center text-white">
                <p className="mb-4 font-medium">Film tidak ditemukan.</p>
                <Link
                    to="/"
                    className="bg-primary px-6 py-2 rounded-md hover:bg-primary/80 transition-colors"
                >
                    Kembali ke Home
                </Link>
            </div>
        );
    }
    
    const isPremiumOnly = movie.isPremium && !isUserPremium;
    const episodesData = movie.type === 'series' ? movie.episodes : [];
    const hasTrailer = !!movie.trailerUrl;

    const togglePlay = () => {
        if (isPremiumOnly) return;

        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="min-h-dvh w-full relative">
            {/* 1. Overlay Premium */}
            {isPremiumOnly && <PremiumOverlay />}

            {/* 2. Media Layer */}
            <div className={`absolute inset-0 z-0 transition-all duration-700 ${isPremiumOnly ? 'blur-md brightness-50' : ''}`}>
                {hasTrailer ? (
                    <video
                        ref={videoRef}
                        src={movie.trailerUrl}
                        className="w-full h-full object-cover"
                        autoPlay={!isPremiumOnly}
                        loop
                        playsInline
                        onClick={togglePlay}
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
                className="absolute top-5 left-5 z-50 text-white flex items-center gap-2 hover:text-primary transition-all active:scale-95"
            >
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                <span className="font-semibold">Kembali</span>
            </button>

            {/* 4. Tombol Play/Pause */}
            {hasTrailer && !isPlaying && !isPremiumOnly && (
                <div
                    className="absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
                    onClick={togglePlay}
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
            />
        </div>
    );
};
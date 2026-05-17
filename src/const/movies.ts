export interface EpisodeDetail {
    id: number;
    episodeNumber: number;
    title: string;
    duration: number;
    description: string;
    thumbnail: string;
    videoUrl?: string;
    progress?: number;
}

interface CommonMetadata {
    id: number;
    title: string;
    slug?: string;
    year: number;
    thumbnail: string;
    thumbnailLandscape: string;
    rating: number;
    ageRating: string;
    genres: string[];
    casts: string[];
    creators: string[];
    description: string;
    trailerUrl: string;
    progress?: number;
    isNewEpisode?: boolean;
    isPremium?: boolean;
    isTop10?: boolean;
}

export interface MovieType extends CommonMetadata {
    type: 'movie';
    duration: number;
    totalEpisodes?: never;
    episodes?: never;
}

export interface SeriesType extends CommonMetadata {
    type: 'series';
    totalEpisodes: number;
    episodes: EpisodeDetail[];
    lastWatchedEpisodeId?: number;
    duration?: never;
}

export type Movie = MovieType | SeriesType;
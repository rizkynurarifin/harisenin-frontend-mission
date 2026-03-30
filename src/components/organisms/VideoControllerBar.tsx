import { PlayerControls } from '../molecules/PlayerControls';
import type { EpisodeDetail } from '../../const/movies';
import { ExtraControls } from '../molecules/ExtraControls';

interface VideoControllerBarProps {
    title: string;
    type: 'movie' | 'series';
    episodes?: EpisodeDetail[];
}

export const VideoControllerBar = ({ title, type, episodes = [] }: VideoControllerBarProps) => {
    return (
        <div className="fixed bottom-0 w-full bg-other-page-header/60 h-12.5 md:h-16.5 flex items-center justify-between px-7 gap-4">
            <PlayerControls />

            <h1 className="font-medium md:font-semibold text-sm text-center text-text-light-primary">
                {title}
            </h1>

            <ExtraControls type={type} episodes={episodes} />
        </div >
    );
};
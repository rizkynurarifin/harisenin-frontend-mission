import { useState } from "react";
import * as Slider from "@radix-ui/react-slider";

interface SeekBarProps {
    played: number;
    buffered: number;
    duration: number;
    onSeekStart: () => void;
    onSeeking: (fraction: number) => void;
    onSeekEnd: (fraction: number) => void;
    className?: string;
}

const SLIDER_MAX = 1000;

export const SeekBar = ({
    played,
    buffered,
    duration,
    onSeekStart,
    onSeeking,
    onSeekEnd,
    className,
}: SeekBarProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const isValidDuration = isFinite(duration) && duration > 0;

    return (
        <div className={`group/seek relative w-full py-2 -my-2 ${className ?? ""}`}>
            <Slider.Root
                className="relative flex w-full items-center cursor-pointer"
                style={{ touchAction: "none" }}
                value={[Math.round(played * SLIDER_MAX)]}
                max={SLIDER_MAX}
                step={1}
                disabled={!isValidDuration}
                onPointerDown={() => {
                    if (!isValidDuration) return;
                    setIsDragging(true);
                    onSeekStart();
                }}
                onValueChange={([val]) => onSeeking(val / SLIDER_MAX)}
                onValueCommit={([val]) => {
                    setIsDragging(false);
                    onSeekEnd(val / SLIDER_MAX);
                }}
            >
                <Slider.Track
                    className={`relative w-full rounded-full bg-white/30 transition-all duration-200 overflow-hidden ${isDragging ? "h-1.25" : "h-0.75 group-hover/seek:h-1.25"
                        }`}
                >
                    {/* Buffered layer */}
                    <div
                        className="absolute inset-y-0 left-0 bg-white/50 transition-all duration-300"
                        style={{ width: `${buffered * 100}%` }}
                    />
                    <Slider.Range className="absolute h-full bg-primary-default" />
                </Slider.Track>
                <Slider.Thumb
                    className={`block rounded-full bg-primary-default ring-2 ring-white transition-all duration-150 focus:outline-none ${isDragging
                            ? "size-3.5 opacity-100"
                            : "size-0 opacity-0 group-hover/seek:size-3.5 group-hover/seek:opacity-100"
                        }`}
                    aria-label="Seek"
                />
            </Slider.Root>
        </div>
    );
};
import * as Slider from "@radix-ui/react-slider";
import { useState, useRef, useCallback, useEffect } from "react";
import { IoMdVolumeHigh, IoMdVolumeLow, IoMdVolumeOff } from "react-icons/io";

import { ControlButton } from "./ControlButton";

interface VolumeSliderProps {
    volume: number;
    isMuted: boolean;
    onVolumeChange: (volume: number) => void;
    onMuteToggle: () => void;
}

export const VolumeSlider = ({
    volume,
    isMuted,
    onVolumeChange,
    onMuteToggle,
}: VolumeSliderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const leaveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = useCallback(() => {
        if (leaveTimeoutRef.current) {
            clearTimeout(leaveTimeoutRef.current);
            leaveTimeoutRef.current = null;
        }
        setIsOpen(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        leaveTimeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150);
    }, []);

    useEffect(() => {
        if (!isOpen) return;

        const handlePointerDownOutside = (e: PointerEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDownOutside);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDownOutside);
        };
    }, [isOpen]);

    const displayVolume = isMuted ? 0 : volume;

    const VolumeIcon =
        isMuted || volume === 0
            ? IoMdVolumeOff
            : volume <= 0.5
                ? IoMdVolumeLow
                : IoMdVolumeHigh;

    return (
        <div
            ref={containerRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3
          bg-other-paper rounded-lg py-4 px-3 shadow-md
          transition-all duration-200 origin-bottom
          ${isOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
            >
                <Slider.Root
                    orientation="vertical"
                    className="relative flex justify-center w-4 h-24"
                    style={{ touchAction: "none" }}
                    value={[displayVolume * 100]}
                    max={100}
                    step={1}
                    onValueChange={([val]) => onVolumeChange(val / 100)}
                >
                    <Slider.Track className="relative w-1 h-full rounded-full bg-white/30">
                        <Slider.Range className="absolute w-full rounded-full bg-primary-default" />
                    </Slider.Track>
                    <Slider.Thumb className="block size-3 rounded-full bg-primary-default ring-2 ring-white focus:outline-none transition-transform hover:scale-125 cursor-grab active:cursor-grabbing" />
                </Slider.Root>
            </div>

            {/* Volume button */}
            <ControlButton onClick={onMuteToggle}>
                <div className="size-5 md:size-8 flex items-center justify-center">
                    <VolumeIcon className="size-5 md:size-7" />
                </div>
            </ControlButton>
        </div>
    );
};
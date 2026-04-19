import screenfull from "screenfull";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseFullscreenReturn {
    isFullscreen: boolean;
    toggleFullscreen: () => void;
    containerRef: React.RefObject<HTMLDivElement>;
}

export const useFullscreen = (): UseFullscreenReturn => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null!);

    useEffect(() => {
        if (!screenfull.isEnabled) return;

        const handleChange = () => {
            setIsFullscreen(screenfull.isFullscreen);
        };

        screenfull.on("change", handleChange);
        return () => {
            screenfull.off("change", handleChange);
        };
    }, []);

    const toggleFullscreen = useCallback(() => {
        if (!screenfull.isEnabled || !containerRef.current) return;
        screenfull.toggle(containerRef.current);
    }, []);

    return { isFullscreen, toggleFullscreen, containerRef };
};
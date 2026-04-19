import { useCallback, useEffect, useRef, useState } from "react";

interface UseIdleTimerOptions {
    timeout?: number;
    isEnabled: boolean;
}

interface UseIdleTimerReturn {
    isIdle: boolean;
    pauseTimer: () => void;
    resumeTimer: () => void;
}

export const useIdleTimer = ({
    timeout = 3000,
    isEnabled,
}: UseIdleTimerOptions): UseIdleTimerReturn => {
    const [isIdle, setIsIdle] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isPausedRef = useRef(false);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const startTimer = useCallback(() => {
        clearTimer();
        timerRef.current = setTimeout(() => {
            setIsIdle(true);
        }, timeout);
    }, [clearTimer, timeout]);

    const resetTimer = useCallback(() => {
        if (isPausedRef.current) return;
        setIsIdle(false);
        startTimer();
    }, [startTimer]);

    const pauseTimer = useCallback(() => {
        isPausedRef.current = true;
        clearTimer();
        setIsIdle(false);
    }, [clearTimer]);

    const resumeTimer = useCallback(() => {
        isPausedRef.current = false;
        startTimer();
    }, [startTimer]);

    useEffect(() => {
        if (!isEnabled) {
            clearTimer();
            isPausedRef.current = false;
            return;
        }

        startTimer();

        const events = ["mousemove", "mousedown", "keydown", "touchstart"] as const;
        events.forEach((event) => document.addEventListener(event, resetTimer));

        return () => {
            events.forEach((event) =>
                document.removeEventListener(event, resetTimer),
            );
            clearTimer();
        };
    }, [isEnabled, resetTimer, startTimer, clearTimer]);

    return { isIdle: isEnabled ? isIdle : false, pauseTimer, resumeTimer };
};
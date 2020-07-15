import { useRef, useEffect, useCallback } from "react"

export const useDebounce = (fn, delay, dep = []) => {
    const { current } = useRef({ fn, timer: null });

    useEffect(function () {
        current.fn = fn;
    }, [fn]);

    return useCallback(function (...args) {
        if (current.timer) clearTimeout(current.timer);
        current.timer = setTimeout(() => {
            current.fn.call(this, ...args);
        }, delay);
    }, dep);
}

export const useThrottle = (fn, delay, dep = []) => {
    const { current } = useRef({ fn, timer: null });

    useEffect(function () {
        current.fn = fn;
    }, [fn]);

    return useCallback(function (...args) {
        if (!current.timer) {
            current.timer = setTimeout(() => {
                delete current.timer
            }, delay);
            current.fn.call(this, ...args);
        }
    }, dep);
}
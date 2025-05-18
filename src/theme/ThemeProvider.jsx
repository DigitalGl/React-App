import { createContext, useLayoutEffect, useState } from 'react';
import { THEME_STORAGE } from '../constants';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const savedTheme = localStorage.getItem(THEME_STORAGE) || "light";
    const [theme, setTheme] = useState(savedTheme);

    useLayoutEffect(() => {
        const detectTheme = () => {
            const isDark = window.matchMedia("(prefers-color-sheme: dark)").matches;

            if (isDark) {
                setTheme("dark");
                window.body.classList.remove("darkLayout");
            } else {
                savedTheme === "dark" && window.body.classList.add("darkLayout");
                setTheme(savedTheme);
            }
        };
        detectTheme();

        const mediaQuery = window.matchMedia("(prefers-color-sheme: dark)");
        mediaQuery.addEventListener("change", detectTheme);

        return () => {
            mediaQuery.removeEventListener("change", detectTheme);
        };
    }, []);

return <ThemeContext.Provider value={{ theme, setTheme }}> {children} </ThemeContext.Provider>
};


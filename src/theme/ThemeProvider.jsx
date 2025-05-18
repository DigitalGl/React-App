import { createContext, useState } from 'react';
import { THEME_STORAGE } from '../constants';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const savedTheme = localStorage.getItem(THEME_STORAGE) || "light";
    const [theme, setTheme] = useState(savedTheme);

return <ThemeContext.Provider value={{ theme, setTheme }}> {children} </ThemeContext.Provider>
};


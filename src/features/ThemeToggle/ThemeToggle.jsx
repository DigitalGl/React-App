import cls from './ThemeToggle.module.css';
import { useTheme } from '../../hooks/useTheme';
import { THEME_STORAGE } from '../../constants';

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    const onChangeHandler = (e) => {
        const updatedTheme = e.target.checked === false ? "light" : "dark";
        setTheme(updatedTheme);
        localStorage.setItem(THEME_STORAGE, updatedTheme);
    };

    return (
        <label className={cls.switch}>
        <input type="checkbox" onChange={onChangeHandler} checked={theme === "dark"} />
        <span className={cls.slider}></span>
        <span className={cls.clouds_stars}></span>
        </label>
    );
};

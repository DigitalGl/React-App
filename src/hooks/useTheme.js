import { useContext } from "react";
import { ThemeContext } from "../theme/ThemeProvider";

export const useTheme = () => {
  return useContext(ThemeContext);
};

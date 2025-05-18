import { useNavigate } from "react-router-dom";
import ReactLogo from "../../assets/react.svg";
import { Button } from "../Button";
import { useAuth } from "../../hooks/useAuth";
import { AUTH_STORAGE } from "../../constants";
import cls from "./Header.module.css";
import { ThemeToggle } from "../../features/ThemeToggle";

export const Header = () => {
  const navigate = useNavigate();
  const { isAuth, setIsAuth} = useAuth();

  const LoginHandler = () => {
    localStorage.setItem(AUTH_STORAGE, !isAuth);
    setIsAuth(!isAuth);
  };

  return (
    <header className={cls.header}>
      <p onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>

      <div className={cls.HeaderButtons}>
        <ThemeToggle />

        {isAuth && <Button onClick={() => navigate("/addquestion")} isActive>
          Add
        </Button>}
        <Button onClick={LoginHandler} isActive={!isAuth}>{isAuth ? "Logout" : "Login"}</Button>
      </div>
    </header>
  );
};

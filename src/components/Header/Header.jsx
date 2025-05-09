import { useNavigate } from "react-router-dom";
import ReactLogo from "../../assets/react.svg";
import { Button } from "../Button";
import cls from "./Header.module.css";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <header className={cls.header}>
      <p onClick={() => navigate("/")}>
        <img src={ReactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>

      <div className={cls.HeaderButtons}>
        <Button onClick={() => navigate("/addquestion")} isActive>
          Add
        </Button>
        <Button>login</Button>
      </div>
    </header>
  );
};

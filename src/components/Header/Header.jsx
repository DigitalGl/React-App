/* eslint-disable prettier/prettier */
import ReactLogo from "../../assets/react.svg";
import { Button } from "../Button";
import cls from "./Header.module.css";

export const Header = () => {
  return (
    <header className={cls.header}>
      <p>
        <img src={ReactLogo} alt="react logo" />
        <span>ReactCards</span>
      </p>

      <div className={cls.HeaderButtons}>
        <Button isActive>Add</Button>
        <Button>login</Button>
      </div>
    </header>
  );
};

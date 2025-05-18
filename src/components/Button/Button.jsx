import cls from "./Button.module.css";

export const Button = ({ onClick, isActive, isDisabled, children }) => {
  return (
    <button className={`${cls.btn} ${isActive ? cls.active : ""}`} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  );
};

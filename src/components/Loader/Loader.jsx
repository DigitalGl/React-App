import cls from "./Loader.module.css";

export const Loader = () => {
  return (
    <div className={cls.backdrop}>
      <span className={cls.loader}></span>
    </div>
  );
};

export const SmallLoader = () => {
  return <span className={cls.smallLoader}></span>;
};

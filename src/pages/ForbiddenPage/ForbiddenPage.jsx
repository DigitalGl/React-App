import { useLocation, useNavigate } from "react-router-dom";
import cls from "./ForbiddenPage.module.css";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";

export const ForbiddenPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuth } = useAuth();

  const fromPage = location.state?.from || "/";

  useEffect(() => {
    isAuth && navigate(fromPage, { replace: true });
  }, [isAuth]);

  return <h2 className={cls.title}> Page is forbidden!</h2>;
};

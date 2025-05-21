import { BrowserRouter, Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage";
import { AddQuestionPageLazy } from "./pages/AddQuestionPage/AddQuestionPage.lazy";
import { EditQuestionPageLazy } from "./pages/EditQuestionPage/EditQuestionPage.lazy";
import { AuthProvider } from "./auth/AuthProvider";
import { useAuth } from "./hooks/useAuth";
import { ForbiddenPage } from "./pages/ForbiddenPage";
import { ThemeProvider } from "./theme/ThemeProvider";
import { QuestionsProvider } from "./context/QuestionsContext";

const ProtectedRoutes = () => {
  const { isAuth } = useAuth();
  const location = useLocation();

  return isAuth ? <Outlet /> : <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <QuestionsProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/forbidden" element={<ForbiddenPage />} />
                <Route path="/question/:id" element={<QuestionPage />} />

                <Route element={<ProtectedRoutes />}>
                  <Route path="/addquestion" element={<AddQuestionPageLazy />} />
                  <Route path="/editquestion/:id" element={<EditQuestionPageLazy />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </QuestionsProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
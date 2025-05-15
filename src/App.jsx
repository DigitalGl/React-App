import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestionPage } from "./pages/QuestionPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/forbidden" element={<div>forbidden !!!</div>} />
          <Route path="/addquestion" element={<div>add question 🍋</div>} />
          <Route path="/question/:id" element={<QuestionPage />} />

          <Route path="*" element={<div>{<NotFoundPage />}</div>} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { createContext, useState, useEffect } from "react";
import { questions as initialQuestions } from "../data/questions";

export const QuestionsContext = createContext();

export const QuestionsProvider = ({ children }) => {
  const [questions, setQuestions] = useState(() => {
    const savedQuestions = localStorage.getItem("reactQuestions");
    return savedQuestions ? JSON.parse(savedQuestions) : initialQuestions;
  });

  useEffect(() => {
    localStorage.setItem("reactQuestions", JSON.stringify(questions));
  }, [questions]);

  const addQuestion = (newQuestion) => {
    console.log("Adding new question:", newQuestion);
    setQuestions([...questions, { ...newQuestion, id: String(Date.now()) }]);
  };

  const updateQuestion = (id, updatedQuestion) => {
    console.log("Updating question with id:", id, updatedQuestion);
    setQuestions(questions.map((q) => (q.id === id ? { ...q, ...updatedQuestion } : q)));
  };

  const removeQuestion = (id) => {
    console.log("Removing question with id:", id);
    setQuestions(questions.filter((q) => q.id !== id));
  };

  console.log("Questions in context:", questions); // Отладка

  return (
    <QuestionsContext.Provider value={{ questions, addQuestion, updateQuestion, removeQuestion }}>
      {children}
    </QuestionsContext.Provider>
  );
};
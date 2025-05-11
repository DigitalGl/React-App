import { useState, useEffect } from "react";
import { API_URL } from "../../constans";
import { QuestionCardList } from "../../components/QuestionCardList";
// import cls from "./HomePage.module.css";


export const HomePage = () => {
    const [questions, setQuestions] = useState([]);

    const getQuestions = async () => {
        try {
            const response = await fetch(`${API_URL}/react`);
            const questions = await response.json();

            setQuestions(questions);

            console.log("questions", questions);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getQuestions();
    }, []);

    return (
    <>
        <QuestionCardList cards={questions} />
    </>
    );
};
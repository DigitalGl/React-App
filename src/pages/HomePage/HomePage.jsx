import { useState, useEffect } from "react";
import { API_URL } from "../../constans";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
// import cls from "./HomePage.module.css";


export const HomePage = () => {
    const [questions, setQuestions] = useState([]);
    const [serchValue, setSerchValue] = useState("");

    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`);
        const questions = await response.json();

        setQuestions(questions);
        return questions;
    });

    useEffect(() => {
        getQuestions("react");
    }, []);

    const onSearchChangeHandler = (e) => {
        setSerchValue(e.target.value);
    }

    return (
    <>
        <input type="text" value={serchValue} onChange={onSearchChangeHandler} />

        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        <QuestionCardList cards={questions} />
    </>
    );
};
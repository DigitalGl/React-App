import { useState, useEffect } from "react";
import { API_URL } from "../../constans";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import cls from "./HomePage.module.css";
import { SearchInput } from "../../components/SearchInput";


export const HomePage = () => {
    const [questions, setQuestions] = useState([]);
    const [searchValue, setSerchValue] = useState("");

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
        <div className={cls.controlsContainer}>
            <SearchInput value={searchValue} onChange={onSearchChangeHandler} />
        </div>

        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        <QuestionCardList cards={questions} />
    </>
    );
};
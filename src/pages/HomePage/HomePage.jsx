import { useState, useEffect, useMemo } from "react";
import { API_URL } from "../../constans";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from "../../components/Loader";
import { useFetch } from "../../hooks/useFetch";
import cls from "./HomePage.module.css";
import { SearchInput } from "../../components/SearchInput";


export const HomePage = () => {
    const [questions, setQuestions] = useState([]);
    const [searchValue, setSerchValue] = useState("");
    const [sortSelectValue, setSortSelectValue] = useState("");

    const [getQuestions, isLoading, error] = useFetch(async (url) => {
        const response = await fetch(`${API_URL}/${url}`);
        const questions = await response.json();

        setQuestions(questions);
        return questions;
    });

    const cards = useMemo(() => {
        return questions.filter((d) => d.question.toLowerCase().includes(searchValue.trim().toLowerCase()));
    }, [questions, searchValue]);

    useEffect(() => {
        getQuestions(`react?${sortSelectValue}`);
    }, [sortSelectValue]);

    const onSearchChangeHandler = (e) => {
        setSerchValue(e.target.value);
    };

    const onSortSelectChangeHandler = (e) => {
        setSortSelectValue(e.target.value);
    };


    return (
    <>
        <div className={cls.controlsContainer}>
            <SearchInput value={searchValue} onChange={onSearchChangeHandler} />

            <select value={sortSelectValue} onChange={onSortSelectChangeHandler} className={cls.select}>
                <option value="">sort by</option>
                <hr />
                <option value="_sort=level">Level ASC</option>
                <option value="_sort=-level">Level DESC</option>
                <option value="_sort=completed">completed ASC</option>
                <option value="_sort=-completed">completed DESC</option>
            </select>
        </div>

        {isLoading && <Loader />}
        {error && <p>{error}</p>}
        {cards.length === 0 && <p className={cls.noCardsInfo}>No cards...</p>}


        <QuestionCardList cards={cards} />
    </>
    );
};
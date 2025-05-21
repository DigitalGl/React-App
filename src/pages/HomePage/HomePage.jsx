import { useState, useMemo, useRef, useContext } from "react";
import { QuestionCardList } from "../../components/QuestionCardList";
import cls from "./HomePage.module.css";
import { SearchInput } from "../../components/SearchInput";
import { Button } from "../../components/Button";
import { QuestionsContext } from "../../context/QuestionsContext";

const DEFAULT_PER_PAGE = 10;

export const HomePage = () => {
  const { questions: allQuestions } = useContext(QuestionsContext);
  const [searchValue, setSearchValue] = useState("");
  const [sortSelectValue, setSortSelectValue] = useState("");
  const [countSelectValue, setCountSelectValue] = useState(DEFAULT_PER_PAGE.toString());
  const [currentPage, setCurrentPage] = useState(1);

  console.log("Questions in HomePage:", allQuestions);

  const controlsContainerRef = useRef();

  const filteredQuestions = useMemo(() => {
    if (searchValue.trim()) {
      return allQuestions.filter((q) =>
        q.question.toLowerCase().includes(searchValue.trim().toLowerCase())
      );
    }
    return allQuestions;
  }, [searchValue, allQuestions]);

  const sortedQuestions = useMemo(() => {
    const sorted = [...filteredQuestions];
    if (sortSelectValue === "_sort=level") {
      sorted.sort((a, b) => a.level - b.level);
    } else if (sortSelectValue === "_sort=-level") {
      sorted.sort((a, b) => b.level - a.level);
    } else if (sortSelectValue === "_sort=completed") {
      sorted.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? -1 : 1));
    } else if (sortSelectValue === "_sort=-completed") {
      sorted.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));
    }
    return sorted;
  }, [filteredQuestions, sortSelectValue]);

  const perPage = parseInt(countSelectValue) || DEFAULT_PER_PAGE;
  const totalPages = Math.ceil(sortedQuestions.length / perPage);
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return sortedQuestions.slice(start, end);
  }, [sortedQuestions, currentPage, perPage]);

  const pagination = useMemo(() => {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }, [totalPages]);

  const onSearchChangeHandler = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(1);
  };

  const onSortSelectChangeHandler = (e) => {
    setSortSelectValue(e.target.value);
    setCurrentPage(1);
  };

  const paginationHandler = (e) => {
    if (e.target.tagName === "BUTTON") {
      setCurrentPage(parseInt(e.target.textContent));
      controlsContainerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onCountSelectChangeHandler = (e) => {
    setCountSelectValue(e.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <div className={cls.controlsContainer} ref={controlsContainerRef}>
        <SearchInput value={searchValue} onChange={onSearchChangeHandler} />

        <select value={sortSelectValue} onChange={onSortSelectChangeHandler} className={cls.select}>
          <option value="">sort by</option>
          <hr />
          <option value="_sort=level">level ASC</option>
          <option value="_sort=-level">level DESC</option>
          <option value="_sort=completed">completed ASC</option>
          <option value="_sort=-completed">completed DESC</option>
        </select>

        <select value={countSelectValue} onChange={onCountSelectChangeHandler} className={cls.select}>
          <option disabled>count</option>
          <hr />
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="30">30</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>

      <QuestionCardList cards={paginatedQuestions} />

      {paginatedQuestions.length === 0 ? (
        <p className={cls.noCardsInfo}>No cards...</p>
      ) : (
        pagination.length > 1 && (
          <div className={cls.paginationContainer} onClick={paginationHandler}>
            {pagination.map((value) => (
              <Button key={value} isActive={value === currentPage}>
                {value}
              </Button>
            ))}
          </div>
        )
      )}
    </>
  );
};
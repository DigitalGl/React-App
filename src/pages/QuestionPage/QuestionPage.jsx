import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "../../components/Badge";
import cls from "./QuestionPage.module.css";
import { Button } from "../../components/Button";
import { useEffect, useId, useState, useContext } from "react";
import { Loader, SmallLoader } from "../../components/Loader";
import { useAuth } from "../../hooks/useAuth";
import { QuestionsContext } from "../../context/QuestionsContext";
import { toast } from "react-toastify";

export const QuestionPage = () => {
  const checkboxId = useId();
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuth } = useAuth();
  const { questions } = useContext(QuestionsContext);

  const [card, setCard] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCardUpdating, setIsCardUpdating] = useState(false);

  const levelVariant = () =>
    card?.level === 1 ? "primary" : card?.level === 2 ? "warning" : "alert";
  const completedVariant = () => (card?.completed ? "success" : "primary");

  useEffect(() => {
    const foundCard = questions.find((q) => q.id === id);
    if (foundCard) {
      setCard(foundCard);
      setIsChecked(foundCard.completed || false);
    } else {
      console.error(`Card with id ${id} not found`);
      navigate("/notfound");
    }
  }, [id, navigate, questions]);

  const onCheckboxChangeHandler = () => {
    setIsChecked(!isChecked);
    setIsCardUpdating(true);
    setTimeout(() => {
      setCard({ ...card, completed: !isChecked });
      setIsCardUpdating(false);
      toast.success("Completion status updated!");
    }, 500);
  };

  return (
    <>
      {!card && <Loader />}

      {card && (
        <div className={cls.container}>
          <div className={cls.cardLabels}>
            <Badge variant={levelVariant()}>Level: {card.level}</Badge>
            <Badge variant={completedVariant()}>
              {card.completed ? "Completed" : "Not Completed"}
            </Badge>
            {card?.editDate && <p className={cls.editDate}>Edited: {card.editDate}</p>}
          </div>

          <h5 className={cls.cardTitle}>{card.question}</h5>
          <p className={cls.cardDescription}>{card.description}</p>

          <div className={cls.cardAnswers}>
            <label>short answer: </label>
            <p className={cls.cardAnswer}>{card.answer}</p>
          </div>

          <ul className={cls.cardLinks}>
            Resources:
            {card.resources.map((link, index) => (
              <li key={index}>
                <a href={link.trim()} target="_blank" rel="noreferrer">
                  {link.trim()}
                </a>
              </li>
            ))}
          </ul>

          <label htmlFor={checkboxId} className={cls.cardCheckbox}>
            <input
              type="checkbox"
              id={checkboxId}
              className={cls.checkbox}
              checked={isChecked}
              onChange={onCheckboxChangeHandler}
              disabled={isCardUpdating}
            />
            <span>mark question as completed</span>
            {isCardUpdating && <SmallLoader />}
          </label>

          {isAuth && (
            <Button
              onClick={() => {
                console.log("Navigating to edit:", `/editquestion/${card.id}`); // Отладка
                navigate(`/editquestion/${card.id}`);
              }}
              isDisabled={isCardUpdating}
            >
              Edit Question
            </Button>
          )}
          <Button onClick={() => navigate("/")} isDisabled={isCardUpdating}>
            Back
          </Button>
        </div>
      )}
    </>
  );
};

export default QuestionPage;
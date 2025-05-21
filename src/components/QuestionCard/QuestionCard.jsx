import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import cls from "./QuestionCard.module.css";
import { Badge } from "../Badge";

export const QuestionCard = ({ card }) => {
  const navigate = useNavigate();

  const levelVariant = card.level === 1 ? "primary" : card.level === 2 ? "warning" : "alert";
  const completedVariant = card.completed ? "success" : "primary";

  const handleViewClick = () => {
    console.log("Navigating to:", `/question/${card.id}`);
    navigate(`/question/${card.id}`);
  };

  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <Badge variant={levelVariant}>Level: {card.level}</Badge>
        <Badge variant={completedVariant}>
          {card.completed ? "Completed" : "Not Completed"}
        </Badge>
      </div>

      <h5 className={cls.cardTitle}>{card.question}</h5>

      <div className={cls.cardAnswers}>
        <label>short answer: </label>
        <p className={cls.cardAnswer}>{card.answer}</p>
      </div>

      <Button onClick={handleViewClick}>View</Button>
    </div>
  );
};
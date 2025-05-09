import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import cls from './QuestionCard.module.css';

export const QuestionCard = ({ card }) => {
  const navigate = useNavigate();

  return (
    <div className={cls.card}>
      <div className={cls.cardLabels}>
        <div>Level: {card.level}</div>
        <div>{card.completed ? "Completed" : "Not completed"}</div>
      </div>

      <h5 className={cls.cardTitle}>{card.question}</h5>

      <div className={cls.cardAnswers}>
        <label>shot answer: </label>
        <p className={cls.cardAnswer}>{card.answer}</p>
      </div>
      <Button onClick={() => {navigate(`/question/${card.id}`)}}>View</Button>
    </div>
  );
};

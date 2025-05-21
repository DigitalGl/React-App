import { memo } from "react";
import { QuestionCard } from "../QuestionCard";
import cls from "./QuestionCardList.module.css";

export const QuestionCardList = memo(({ cards }) => {
  console.log("Cards in QuestionCardList:", cards); // Отладка
  return (
    <div className={cls.cardList}>
      {cards.map((card, index) => (
        <QuestionCard card={card} key={card.id || index} />
      ))}
    </div>
  );
});
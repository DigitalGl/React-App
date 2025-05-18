import { memo } from "react";
import { QuestionCard } from "../QuestionCard";
import cls from "./QuestionCardList.module.css";

export const QuestionCardList = memo(({ cards }) => {
  return (
    <div className={cls.cardList}>
      {cards.map((card, index) => {
        return <QuestionCard card={card} key={index} />;
      })}
    </div>
  );
});

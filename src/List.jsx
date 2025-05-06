/* eslint-disable prettier/prettier */
import {} from "react";

const items = [
  {
    task: "Выучить Реакт",
    icon: "🍏",
    isCompleted: true,
  },
  {
    task: "Закрепить JavaScript",
    icon: "🍏",
    isCompleted: true,
  },
  {
    task: "Не забивать на Англиский",
    icon: "🍏",
    isCompleted: false,
  },
];

export const List = () => {
  return (
    <div>
      {items.map((item, index) => {
        return (
          <section key={index} className={item.isCompleted ? "completed" : ""}>
            <span>{item.icon}</span>
            <span>{item.task}</span>
          </section>
        );
      })}
    </div>
  );
};

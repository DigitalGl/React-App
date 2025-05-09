import { QuestionCard } from "../../components/QuestionCard";
import cls from "./HomePage.module.css";

const cards = [
    {
        id: 1,
        question: "Что такое React",
        answer: "React - это библеотека для создания пользовательских интерфейсов",
        description: "React - это JavaScript-библеотека, разработанная Facebook, которая используется для построения UI с компонентным подходом. React позволяет вам создавать пользовательские интерфейсы из отдельных частей, называемых компонентами.",
        resourres: [
            "https://react.dev",
            "https://react.dev/reference/react"
        ],
        level: 1,
        completed: false,
        editDate: "03.02.2025, 19:45"
    },
    {
        id: 2,
        question: "Что такое JSX?",
        answer: "JSX - это синтаксическое расширение для JavaScript, используемое в React.",
        description: "JSX позволяет писать HTML-подобный код внутри JavaScript. Он компилируется в JavaScript-вызовы React.createElement, что делает код более читаемым и удобным для создания компонентов.",
        resourres: [
            "https://react.dev/learn/writing-markup-with-jsx",
            "https://react.dev/reference/react"
        ],
        level: 1,
        completed: false,
        editDate: "03.02.2025, 19:46"
    },
    {
        id: 3,
        question: "Что такое компонент в React?",
        answer: "Компонент - это независимый, переиспользуемый кусок UI.",
        description: "Компоненты в React - это строительные блоки пользовательского интерфейса. Они могут быть функциональными или классовыми и позволяют разбивать UI на независимые части.",
        resourres: [
            "https://react.dev/learn/your-first-component",
            "https://react.dev/reference/react/Component"
        ],
        level: 1,
        completed: false,
        editDate: "03.02.2025, 19:47"
    },
    {
        id: 4,
        question: "В чем разница между функциональными и классовыми компонентами?",
        answer: "Функциональные компоненты - это функции, а классовые - это классы, унаследованные от React.Component.",
        description: "Функциональные компоненты проще и поддерживают хуки, тогда как классовые компоненты используют методы жизненного цикла и this. После появления хуков функциональные компоненты стали предпочтительными.",
        resourres: [
            "https://react.dev/reference/react/Component",
            "https://react.dev/learn/your-first-component"
        ],
        level: 2,
        completed: false,
        editDate: "03.02.2025, 19:48"
    },
];

export const HomePage = () => {
    return (
    <> 
        {cards.map((card, index) => {
            return <QuestionCard card={card} key={index} />;
        })}
    </>
    );
};
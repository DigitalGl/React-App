import { useActionState, useContext, useEffect } from "react";
import cls from "./EditQuestionPage.module.css";
import { Loader } from "../../components/Loader";
import { QuestionForm } from "../../components/QuestionForm";
import { delayFn } from "../../helpers/delayFn";
import { dateFormat } from "../../helpers/dateFormat";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { QuestionsContext } from "../../context/QuestionsContext";

const editCardAction = async (_prevState, formData, updateQuestion) => {
  try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const questionId = newQuestion.questionId;
    const isClearForm = newQuestion.clearForm;

    const updatedQuestion = {
      id: questionId,
      question: newQuestion.question,
      answer: newQuestion.answer,
      description: newQuestion.description,
      resources: resources.length ? resources.split(",") : [],
      level: Number(newQuestion.level),
      completed: false,
      editDate: dateFormat(new Date()),
    };

    updateQuestion(questionId, updatedQuestion);
    toast.success("The question is edited successfully!");

    return isClearForm ? {} : updatedQuestion;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

export const EditQuestion = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { questions, updateQuestion, removeQuestion } = useContext(QuestionsContext);

  // Находим карточку по id
  const card = questions.find((q) => q.id === id);

  console.log("EditQuestion: id =", id, "card =", card); // Отладка

  const [formState, formAction, isPending] = useActionState(
    (prevState, formData) => editCardAction(prevState, formData, updateQuestion),
    {
      id,
      question: card?.question || "",
      answer: card?.answer || "",
      description: card?.description || "",
      resources: card?.resources?.join(",") || "", // Преобразуем массив в строку
      level: card?.level || 1,
      completed: card?.completed || false,
      editDate: card?.editDate || undefined,
      clearForm: false,
    }
  );

  // Перенаправление, если карточка не найдена
  useEffect(() => {
    if (!card && !isPending) {
      console.error(`Card with id ${id} not found in EditQuestion`);
      navigate("/notfound");
    }
  }, [card, id, navigate, isPending]);

  // Перенаправление после успешного редактирования
  useEffect(() => {
    if (!isPending && formState?.id && !formState.clearForm) {
      console.log("Redirecting to / after edit"); // Отладка
      navigate("/");
    }
  }, [isPending, formState, navigate]);

  const onRemoveQuestionHandler = () => {
    const isRemove = window.confirm("Are you sure?");
    if (isRemove) {
      removeQuestion(id);
      toast.success("The question has been successfully removed!");
      navigate("/");
    }
  };

  if (!card) {
    return <Loader />;
  }

  return (
    <>
      {isPending && <Loader />}

      <h1 className={cls.formTitle}>Edit question</h1>

      <div className={cls.formContainer}>
        <button
          className={cls.removeBtn}
          disabled={isPending}
          onClick={onRemoveQuestionHandler}
        >
          X
        </button>

        <QuestionForm
          formAction={formAction}
          state={formState}
          isPending={isPending}
          submitBtnText="Edit Question"
        />
      </div>
    </>
  );
};

export default EditQuestion;
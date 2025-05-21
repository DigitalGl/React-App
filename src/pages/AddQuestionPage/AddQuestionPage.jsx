import { useActionState, useContext, useEffect } from "react";
import { Loader } from "../../components/Loader";
import cls from "./AddQuestionPage.module.css";
import { delayFn } from "../../helpers/delayFn";
import { toast } from "react-toastify";
import { QuestionForm } from "../../components/QuestionForm";
import { QuestionsContext } from "../../context/QuestionsContext";
import { useNavigate } from "react-router-dom";

const createCardAction = async (_prevState, formData, addQuestion) => {
  try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm;

    const newCard = {
      id: String(Date.now()),
      question: newQuestion.question,
      answer: newQuestion.answer,
      description: newQuestion.description,
      resources: resources.length ? resources.split(",") : [],
      level: Number(newQuestion.level),
      completed: false,
      editDate: undefined,
    };

    addQuestion(newCard);
    toast.success("New question is successfully created!");

    return isClearForm ? {} : newCard;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

const AddQuestionPage = () => {
  const { addQuestion } = useContext(QuestionsContext);
  const navigate = useNavigate();
  const [formState, formAction, isPending] = useActionState(
    (prevState, formData) => createCardAction(prevState, formData, addQuestion),
    { clearForm: true }
  );

  useEffect(() => {
    if (!isPending && formState?.id) {
      navigate("/");
    }
  }, [isPending, formState, navigate]);

  return (
    <>
      {isPending && <Loader />}

      <h1 className={cls.formTitle}>Add new question</h1>

      <div className={cls.formContainer}>
        <QuestionForm
          formAction={formAction}
          state={formState}
          isPending={isPending}
          submitBtnText="Add Question"
        />
      </div>
    </>
  );
};

export default AddQuestionPage;
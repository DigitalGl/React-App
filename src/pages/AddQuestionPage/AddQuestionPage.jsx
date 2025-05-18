import { useActionState } from 'react';
import { Loader } from '../../components/Loader';
import cls from './AddQuestionPage.module.css';
import { delayFn } from '../../helpers/delayFn';
import { toast } from 'react-toastify';
import { API_URL } from '../../constants';
import { QuestionForm } from '../../components/QuestionForm';


const createCardAction = async (_prevState, formData) => {
   try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm;


    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: undefined,
      }),
    });

    if (response.status === 404) {
      throw new Error(response.statusText);
    }

    const question = response.json();
    toast.success("New question is successfully created!");

    return isClearForm ? {} : question;
   } catch (error) {
    toast.error(error.message);
    return {};
   }
};

  const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, 
  { clearForm: true});

  return (
    <>
    {isPending && <Loader />}

      <h1 className={cls.formTitle}>Add new question</h1>

      <div className={cls.formContainer}>
        <QuestionForm formAction={formAction} state={formState} isPending={isPending} 
        submitBtnText="Add Question" />
      </div>
    </>
  );
};

export default AddQuestionPage;